import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDto } from './dto/register.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/auth/permission/role.enum';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Optional } from 'typescript-optional';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Events } from 'src/events/events';
import { HistoryDto } from './dto/history.dto';
import { VectorEntity } from './entities/vectors.entity';
import { HistoryEntity } from './entities/history.entity';
import { UpdateVectorUser } from './dto/update-vector.dto';
import { CamerasService } from 'src/cameras/cameras.service';
import { AddUserByAdminDto } from './dto/add-user-by-admin.dto';
import { Threshold } from 'src/config/threshold.enum';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(forwardRef(() => CamerasService))
    private readonly cameraService: CamerasService,
    private eventEmitter: EventEmitter2,
  ) {}

  async findOneByPhone(phone: string) {
    return await this.userModel.findOne({ phone: phone }).lean().exec();
  }

  async getOneById(id: string) {
    return await this.userModel.findById(id).exec();
  }

  async getOneOrderById(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (user != null && user.history != null && user.history.length != 0) {
      let events = user.history.sort(
        (a, b) => -a.timeStamp.getTime() + b.timeStamp.getTime(),
      );
      for (var item of events) {
        item.cameraId = (
          await this.cameraService.findOneWithOut(item.cameraId)
        ).name;
      }

      user.history = events;
    }

    return user;
  }

  async getOneByCode(code: number) {
    return await this.userModel.findOne({ code: code }).exec();
  }

  async createNewUser(dto: RegisterDto) {
    // check if phone exist
    await this.userModel
      .exists({
        $or: [{ phone: dto.phone }, { email: dto.email }],
      })
      .exec()
      .then((exist) => {
        if (exist != null)
          throw new BadRequestException(`Số điện thoại hoặc email đã tồn tại!`);
      });

    dto.password = await bcrypt.hash(dto.password, 10);
    await this.userModel.create(dto);
  }

  async createNewUserByAdmin(dto: AddUserByAdminDto) {
    await this.userModel
      .exists({
        $or: [{ phone: dto.phone }, { email: dto.email }, { code: dto.code }],
      })
      .exec()
      .then((exist) => {
        if (exist != null)
          throw new BadRequestException(
            `Số điện thoại hoặc email, mã vân tay đã tồn tại!`,
          );
      });
    dto.password = await bcrypt.hash(dto.password, 10);
    await this.userModel.create(dto);
  }

  async changePassword(id: string, dto: ChangePasswordDto) {
    const user = Optional.ofNullable(
      await this.userModel.findById(id).exec(),
    ).orElseThrow(() => new BadRequestException("User don't exist"));

    await bcrypt.compare(dto.oldPassword, user.password).then((isMatch) => {
      if (!isMatch) throw new BadRequestException('Old password incorrect');
    });

    user.password = await bcrypt.hash(dto.newPassword, 10);
    return await user.save();
  }

  async changePermission(id: string, role: Role, code: number) {
    return this.userModel
      .findByIdAndUpdate(
        id,
        {
          role: role,
          code: code,
        },
        { new: true },
      )
      .select('-__v -password')
      .exec();
  }

  async getAllUser() {
    return this.userModel.find().select('-password -otp -otpExpired').exec();
  }

  async delVectorsInDayUser() {
    await this.userModel.updateMany({}, { vectors: [] }).exec();
  }

  convertBase64ToVector(encodedString) {
    let binary_string = atob(encodedString);
    let buffer = new ArrayBuffer(binary_string.length);
    let bytes_buffer = new Uint8Array(buffer);

    for (let i = 0; i < binary_string.length; i++) {
      bytes_buffer[i] = binary_string.charCodeAt(i);
    }

    let values = new Float64Array(buffer);
    return Array.from(values);
  }

  cosineSimilarity(emb1, emb2) {
    const dotProduct = emb1.reduce(
      (sum, value, index) => sum + value * emb2[index],
      0,
    );
    const normEmb1 = Math.sqrt(
      emb1.reduce((sum, value) => sum + value ** 2, 0),
    );
    const normEmb2 = Math.sqrt(
      emb2.reduce((sum, value) => sum + value ** 2, 0),
    );

    return (1 - dotProduct / (normEmb1 * normEmb2)) / 2;
  }

  async initResetPassword(email: string) {
    const otp = Math.random().toString().substring(2, 8);
    const user = await this.userModel
      .findOneAndUpdate(
        { email: email },
        {
          otp,
          otpExpired: new Date(Date.now() + 3 * 60000),
        },
        { new: true },
      )
      .exec();
    if (user == null) throw new BadRequestException('Email không đúng!');

    this.eventEmitter.emit(Events.INIT_RESET_PASSWORD, {
      email,
      otp,
    });
  }

  async finishResetPassword(dto: ResetPasswordDto) {
    const user = await this.userModel
      .findOne({
        email: dto.email,
        otp: dto.otp,
      })
      .exec();
    if (user == null) throw new BadRequestException('Mã otp sai');
    if (user.otpExpired!.getTime() < Date.now())
      throw new BadRequestException('Otp đã hết hạn');
    user.password = await bcrypt.hash(dto.newPassword, 10);
    return await user.save();
  }

  async updateHistoryEvent(dto: HistoryDto, id: string) {
    console.log('Start update history');
    const user = await this.userModel.findById(id).exec();
    if (user == null)
      throw new BadRequestException('Không tìm thấy người dùng.');
    if (user.history && user.history.length > 1) {
      let item = user.history[user.history.length - 1];
      const preItem = user.history[user.history.length - 2];
      if (dto.cameraId == item.cameraId && dto.position == item.position)
        return await user.save();
      if (
        preItem.cameraId == item.cameraId &&
        dto.cameraId == item.cameraId &&
        -item.timeStamp.getTime() + dto.timeStamp.getTime() < 10000 &&
        this.haveDifferentPositionVector(dto.position, item.position)
      ) {
        console.log('Update last event');
        user.history[user.history.length - 1].timeStamp = dto.timeStamp;
        user.history[user.history.length - 1].position = dto.position;
      } else {
        console.log('Add event');
        user.history.push(dto);
      }
    } else {
      user.history.push(dto);
    }
    return await user.save();
  }

  haveDifferentPositionVector(oldPosition: string, newPosition: string) {
    var positionVector = this.convertBase64ToVector(oldPosition);
    var positionNewVector = this.convertBase64ToVector(newPosition);
    return (
      Math.abs(positionNewVector[0] - positionVector[0]) < 0.01 &&
      Math.abs(positionNewVector[1] - positionVector[1]) < 0.01 &&
      Math.abs(positionNewVector[2] - positionVector[2]) < 0.01 &&
      Math.abs(positionNewVector[3] - positionVector[3]) < 0.01
    );
  }

  async updateVectorDoor(dto: VectorEntity, id: string, timeStamp: Date) {
    const user = await this.userModel.findById(id).exec();
    // console.log(user);
    if (user != null) {
      const camera = await this.cameraService.findOneByIp(dto.cameraId);
      if (!camera)
        throw new BadRequestException(
          'Không tìm thấy camera có địa chỉ ip trên',
        );
      if (camera.type == 'DOOR') {
        await this.cameraService.updateCheckInCamera(
          dto.cameraId,
          user._id,
          timeStamp,
        );
        return await this.userModel
          .findByIdAndUpdate(id, {
            $set: {
              updateTime: timeStamp,
            },
            $push: {
              vectors: dto,
              history: {
                cameraId: dto.cameraId,
                timeStamp: timeStamp,
                userId: dto.userId,
                type: 'DOOR',
              },
            },
          })
          .exec();
      }

      // user.vectors.push(dto);
      // user.history.push({ cameraId: dto.cameraId, timeStamp: new Date(), userId: dto.userId } as HistoryEntity);
      // return await user.save();
    }
    // if (user.vectors && user.vectors.length != 0) {
    //   let canInsert = true;
    //   for (let item = 0; item < user.vectors.length; item++) {
    //     const score = this.cosineSimilarity(
    //       this.convertBase64ToVector(dto.vector),
    //       this.convertBase64ToVector(user.vectors[item].vector),
    //     );
    //     console.log(score);
    //     if (score < 0.2 || score > 0.25) {
    //       canInsert = false;
    //       break;
    //     }
    //   }
    //   if (canInsert) {
    //     user.vectors.push(dto);
    //     return await user.save();
    //   }
    // } else {
    //   user.vectors.push(dto);
    //   return await user.save();
    // }
  }

  async updateVectorUser(
    newVector: string,
    cameraId: string,
    userId: number,
    timeStamp: Date,
    position: string,
  ) {
    //FIXME: check timestamp
    // const userHaveLocal = await this.userModel.findOne({
    //   vectors: {
    //     $elemMatch: {
    //       'cameraId': cameraId,
    //       'userId':userId
    //     }
    //   }
    // }).select('-password -otp -otpExpired').exec();

    // if (userHaveLocal != null || userHaveLocal !=undefined ){
    //   console.log(userHaveLocal)
    //   return await this.updateHistoryEvent(
    //     { cameraId: cameraId, timeStamp: timeStamp, position: position } as HistoryEntity,
    //     userHaveLocal._id,
    //   );
    // }
    const users = await this.userModel
      .find()
      .select('-password -otp -otpExpired')
      .sort({ updateTime: -1 })
      .exec();

    //TODO: Update  updateTime
    const newVectorDecode = this.convertBase64ToVector(newVector);
    for (let index = 0; index < users.length; index++) {
      const element = users[index];

      if (element.vectors) {
        for (let item = 0; item < element.vectors.length; item++) {
          const vectorItem = element.vectors[item];
          if (cameraId == vectorItem.cameraId && userId == vectorItem.userId) {
            return await this.updateHistoryEvent(
              {
                cameraId: cameraId,
                timeStamp: timeStamp,
                position: position,
                userId: userId,
              } as HistoryEntity,
              element._id,
            );
          } else if (
            cameraId == vectorItem.cameraId &&
            userId < vectorItem.userId
          ) {
            continue;
          } else {
            if (this.checkMapUser(vectorItem.vector, newVectorDecode)) {
              await this.updateVectorDoor(
                {
                  cameraId: cameraId,
                  userId: userId,
                  vector: newVector,
                } as VectorEntity,
                element._id,
                timeStamp,
              );
              return await this.updateHistoryEvent(
                {
                  cameraId: cameraId,
                  timeStamp: timeStamp,
                  position: position,
                  userId: userId,
                } as HistoryEntity,
                element._id,
              );
            }
          }
        }
      }
    }
  }

  checkMapUser(oldVector: string, newVectorDecode: number[]) {
    console.log('Check Map User');
    const oldVectorDecode = this.convertBase64ToVector(oldVector);
    const score = this.cosineSimilarity(oldVectorDecode, newVectorDecode);
    console.log('Test: ' + score);
    return score < Threshold.THRESHOLD_MATCH;
  }

  async getListEvents(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (user != null) {
      let events = user.history.sort(
        (a, b) => -a.timeStamp.getTime() + b.timeStamp.getTime(),
      );
      return events;
    }
    return [];
  }

  async getLastEvent(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (user != null) {
      // if (user.history && user.)
    }
  }

  isEdgeFramePosition(position: string) {
    const positionVector = this.convertBase64ToVector(position);
    console.log(positionVector);
    return (
      positionVector[0] < Threshold.POSITION_EDGE ||
      positionVector[1] < Threshold.POSITION_EDGE ||
      positionVector[2] > 1 - Threshold.POSITION_EDGE ||
      positionVector[3] > 1 - Threshold.POSITION_EDGE
    );
  }

  testGetListUserSortByUpdateTime() {
    return this.userModel
      .find()
      .select('-password -otp -otpExpired')
      .sort({ updateTime: -1 })
      .exec();
  }

  async testUserHaveUserLocalBefore() {
    const users = await this.userModel
      .find()
      .select('-password -otp -otpExpired')
      .sort({ updateTime: -1 })
      .exec();
    // return users.find(element => )
    const today = new Date();
    const tomorrow = new Date(today.getDate() + 1);
    return await this.userModel
      .findOne({
        history: {
          $elemMatch: {
            cameraId: '172.168.1.11',
            userId: 118,
            timeStamp: {
              $gte: today,
              $lt: tomorrow,
            },
          },
        },
      })
      .exec();
  }

  async getListUserPriority(timeStamp: Date) {
    const users = (await this.getAllUser()) ?? [];
    var priorityUsers = [];
    var normalUsers = [];
    var secondPriorityUsers = [];
    for (var item = 0; item < users.length; item++) {
      if (
        users[item].updateTime.getTime() >
          timeStamp.getTime() - Threshold.TIME_LOG_IN_FOR_FIRST_PRIORITY ||
        (users[item].history &&
          users[item].history.length > 0 &&
          users[item].history[users[item].history.length - 1].position &&
          users[item].history[
            users[item].history.length - 1
          ].timeStamp.getTime() >
            timeStamp.getTime() - Threshold.TIME_OUT_MAX_FOR_FIRST_PRIORITY &&
          users[item].history[
            users[item].history.length - 1
          ].timeStamp.getTime() <
            timeStamp.getTime() - Threshold.TIME_OUT_FOR_FIRST_PRIORITY &&
          this.isEdgeFramePosition(
            users[item].history[users[item].history.length - 1].position,
          ))
      ) {
        priorityUsers.push(users[item]);
      } else if (
        users[item].history &&
        users[item].history.length > 0 &&
        users[item].history[users[item].history.length - 1].position &&
        users[item].history[
          users[item].history.length - 1
        ].timeStamp.getTime() >
          timeStamp.getTime() - Threshold.TIME_MAX_FOR_SECOND_PRIORITY &&
        users[item].history[
          users[item].history.length - 1
        ].timeStamp.getTime() <
          timeStamp.getTime() - Threshold.TIME_MIN_FOR_SECOND_PRIORITY
      ) {
        secondPriorityUsers.push(users[item]);
      } else {
        normalUsers.push(users[item]);
      }
    }
    return { priorityUsers, secondPriorityUsers, normalUsers };
  }

  async updateVector2(dto: VectorEntity, id: string) {
    return await this.userModel
      .findByIdAndUpdate(id, {
        $push: {
          vectors: {
            cameraId: dto.cameraId,
            userId: dto.userId,
            vector: dto.vector,
          },
        },
      })
      .exec();
  }

  async progressType2(
    newVector: string,
    cameraId: string,
    userId: number,
    timeStamp: Date,
    position: string,
  ) {
    console.log('ProgressType2');
    // so sanh local id
    console.log(userId);
    // const today = new Date();
    // const tomorrow = new Date(today.getDate() + 1);
    const userHaveLocal = await this.userModel
      .findOne({
        history: {
          $elemMatch: {
            cameraId: cameraId,
            userId: userId,
          },
        },
      })
      .exec();

    if (userHaveLocal != null || userHaveLocal != undefined) {
      return await this.updateHistoryEvent(
        {
          cameraId: cameraId,
          timeStamp: timeStamp,
          position: position,
          userId: userId,
        } as HistoryEntity,
        userHaveLocal._id,
      );
    }
    console.log('Start compare vector');
    //so sanh vector

    if (newVector == null || newVector.length == 0) return;
    const { priorityUsers, secondPriorityUsers, normalUsers } =
      await this.getListUserPriority(timeStamp);
    console.log('Priority');
    console.log(priorityUsers);
    // console.log(normalUsers);

    if (priorityUsers.length == 0) {
      console.log('Second');
      console.log(secondPriorityUsers);
      if (secondPriorityUsers.length > 0) {
        for (var item = 0; item < secondPriorityUsers.length; item++) {
          const user = secondPriorityUsers[item];

          if (user.vectors && user.vectors.length > 0) {
            for (var i = 0; i < user.vectors.length; i++) {
              console.log('test');
              // console.log(user.vectors[i].vector);
              const vectorItem = user.vectors[i].vector;
              const valueDistance = this.cosineSimilarity(
                this.convertBase64ToVector(vectorItem),
                this.convertBase64ToVector(newVector),
              );
              console.log(valueDistance);
              if (valueDistance < Threshold.THRESHOLD_MATCH) {
                await this.updateHistoryEvent(
                  {
                    cameraId: cameraId,
                    timeStamp: timeStamp,
                    position: position,
                    userId: userId,
                  } as HistoryEntity,
                  user._id,
                );
                if (
                  valueDistance > Threshold.MIN_THRESHOLD_SAVE_VECTOR &&
                  valueDistance < Threshold.MAX_THRESHOLD_SAVE_VECTOR
                ) {
                  // console.log(newVector);
                  await this.updateVector2(
                    {
                      cameraId: cameraId,
                      userId: userId,
                      vector: newVector,
                    } as VectorEntity,
                    user._id,
                  );
                }
                return;
              }
            }
          }
        }
      }
    }
    if (priorityUsers.length > 0) {
      var minPriorityUser = priorityUsers[0];
      var minPriorityValue = 1;
      console.log('test priority');
      for (var item = 0; item < priorityUsers.length; item++) {
        const user = priorityUsers[item];
        console.log(user);
        var minUser = 1;
        var isMatch = false;
        if (user.vectors && user.vectors.length > 0) {
          for (var index = 0; index < user.vectors.length; index++) {
            const vectorItem = user.vectors[index].vector;
            const valueDistance = this.cosineSimilarity(
              this.convertBase64ToVector(vectorItem),
              this.convertBase64ToVector(newVector),
            );
            console.log(valueDistance);
            if (valueDistance < Threshold.THRESHOLD_MATCH) {
              await this.updateHistoryEvent(
                {
                  cameraId: cameraId,
                  timeStamp: timeStamp,
                  position: position,
                  userId: userId,
                } as HistoryEntity,
                user._id,
              );
              isMatch = true;
            }
            if (valueDistance < minUser) minUser = valueDistance;
          }
          if (isMatch) {
            if (
              minUser > Threshold.MIN_THRESHOLD_SAVE_VECTOR &&
              minUser < Threshold.MAX_THRESHOLD_SAVE_VECTOR
            ) {
              console.log(newVector);
              await this.updateVector2(
                {
                  cameraId: cameraId,
                  userId: userId,
                  vector: newVector,
                } as VectorEntity,
                user._id,
              );
            }
            return;
          } else {
            if (minPriorityValue > minUser) {
              minPriorityValue = minUser;
              minPriorityUser = user;
            }
          }
        }
      }
      if (secondPriorityUsers.length > 0) {
        for (var item = 0; item < secondPriorityUsers.length; item++) {
          const user = secondPriorityUsers[item];
          if (user.vectors && user.vectors.length > 0) {
            for (var index = 0; index < user.vectors; index++) {
              const vectorItem = user.vectors[index].vector;
              const valueDistance = this.cosineSimilarity(
                this.convertBase64ToVector(vectorItem),
                this.convertBase64ToVector(newVector),
              );
              if (valueDistance < Threshold.THRESHOLD_MATCH) {
                await this.updateHistoryEvent(
                  {
                    cameraId: cameraId,
                    timeStamp: timeStamp,
                    position: position,
                    userId: userId,
                  } as HistoryEntity,
                  user._id,
                );
                if (
                  valueDistance > Threshold.MIN_THRESHOLD_SAVE_VECTOR &&
                  valueDistance < Threshold.MAX_THRESHOLD_SAVE_VECTOR
                ) {
                  console.log(newVector);
                  await this.updateVector2(
                    {
                      cameraId: cameraId,
                      userId: userId,
                      vector: newVector,
                    } as VectorEntity,
                    user._id,
                  );
                }
                return;
              }
            }
          }
        }
      }

      if (
        minPriorityValue > Threshold.MIN_THRESHOLD_SAVE_VECTOR &&
        minPriorityValue < Threshold.MAX_THRESHOLD_SAVE_VECTOR
      )
        await this.updateVector2(
          {
            cameraId: cameraId,
            userId: userId,
            vector: newVector,
          } as VectorEntity,
          minPriorityUser._id,
        );

      return await this.updateHistoryEvent(
        {
          cameraId: cameraId,
          timeStamp: timeStamp,
          position: position,
          userId: userId,
        } as HistoryEntity,
        minPriorityUser._id,
      );
    }
  }

  isFirstPriorityUser(user: User, timeStamp: Date) {
    if (
      user.updateTime.getTime() >
      timeStamp.getTime() - Threshold.TIME_LOG_IN_FOR_FIRST_PRIORITY
    ) {
      if (user.history == null || user.history.length <= 1) return true;
      // return  !((user.history[user.history.length - 1].type == null)||(user.history[user.history.length - 1].type == undefined) || (user.history[user.history.length - 1].type != "DOOR"));
      if (
        user.history[user.history.length - 1].type != null &&
        user.history[user.history.length - 1].type == 'DOOR'
      )
        return true;
    }
    return (
      user.history &&
      user.history.length > 1 &&
      user.history[user.history.length - 1].position &&
      user.history[user.history.length - 1].type == null &&
      user.history[user.history.length - 1].timeStamp.getTime() >
        timeStamp.getTime() - Threshold.TIME_OUT_MAX_FOR_FIRST_PRIORITY &&
      user.history[user.history.length - 1].timeStamp.getTime() <
        timeStamp.getTime() - Threshold.TIME_OUT_FOR_FIRST_PRIORITY &&
      this.isEdgeFramePosition(user.history[user.history.length - 1].position)
    );
  }

  isSecondPriorityUser(user: User, timeStamp: Date) {
    return (
      user.history &&
      user.history.length > 0 &&
      user.history[user.history.length - 1].timeStamp.getTime() >
        timeStamp.getTime() - Threshold.TIME_MAX_FOR_SECOND_PRIORITY &&
      user.history[user.history.length - 1].timeStamp.getTime() <
        timeStamp.getTime() - Threshold.TIME_MIN_FOR_SECOND_PRIORITY
    );
  }
  async getListProrityUserIn2107(timeStamp: Date) {
    const users = (await this.getAllUser()) ?? [];
    var priorityUsers = [];
    var normalUsers = [];
    var secondPriorityUsers = [];
    for (var item = 0; item < users.length; item++) {
      if (this.isFirstPriorityUser(users[item], timeStamp)) {
        priorityUsers.push(users[item]);
      } else if (this.isSecondPriorityUser(users[item], timeStamp)) {
        secondPriorityUsers.push(users[item]);
      } else {
        normalUsers.push(users[item]);
      }
    }
    return { priorityUsers, secondPriorityUsers, normalUsers };
  }

  async progressType2In2107(
    newVector: string,
    cameraId: string,
    userId: number,
    timeStamp: Date,
    position: string,
  ) {
    console.log('Start progress type 2');
    // so sanh local id
    console.log(timeStamp);
    console.log('UserId: ' + userId);

    // const tomorrow = new Date(today.getDate() + 1);
    const userHaveLocal = await this.userModel
      .findOne({
        history: {
          $elemMatch: {
            cameraId: cameraId,
            userId: userId,
          },
        },
      })
      .exec();

    if (userHaveLocal != null || userHaveLocal != undefined) {
      console.log('Have local user before');
      return await this.updateHistoryEvent(
        {
          cameraId: cameraId,
          timeStamp: timeStamp,
          position: position,
          userId: userId,
        } as HistoryEntity,
        userHaveLocal._id,
      );
    }
    console.log('Start compare vector');
    //so sanh vector

    if (newVector == null || newVector.length == 0) return;
    const { priorityUsers, secondPriorityUsers, normalUsers } =
      await this.getListProrityUserIn2107(timeStamp);
    console.log('Number Priority User');
    console.log(priorityUsers.length);
    // console.log(normalUsers);

    if (priorityUsers.length == 0) {
      console.log('Second Number');
      console.log(secondPriorityUsers.length);
      if (secondPriorityUsers.length > 0) {
        console.log('Scan in second priority user');
        for (var item = 0; item < secondPriorityUsers.length; item++) {
          const user = secondPriorityUsers[item];
          console.log('Scan in user have code ' + user.code.toString());
          if (user.vectors && user.vectors.length > 0) {
            for (var i = 0; i < user.vectors.length; i++) {
              console.log('Scan vector stt ' + i.toString());
              // console.log(user.vectors[i].vector);
              const vectorItem = user.vectors[i].vector;
              const valueDistance = this.cosineSimilarity(
                this.convertBase64ToVector(vectorItem),
                this.convertBase64ToVector(newVector),
              );
              console.log(valueDistance);
              if (valueDistance < Threshold.THRESHOLD_MATCH) {
                console.log('Match vector' + user.code.toString());
                await this.updateHistoryEvent(
                  {
                    cameraId: cameraId,
                    timeStamp: timeStamp,
                    position: position,
                    userId: userId,
                  } as HistoryEntity,
                  user._id,
                );
                if (
                  valueDistance > Threshold.MIN_THRESHOLD_SAVE_VECTOR &&
                  valueDistance < Threshold.MAX_THRESHOLD_SAVE_VECTOR
                ) {
                  console.log('Update vector to DB');
                  await this.updateVector2(
                    {
                      cameraId: cameraId,
                      userId: userId,
                      vector: newVector,
                    } as VectorEntity,
                    user._id,
                  );
                }
                return;
              }
            }
          }
        }
      }
    }

    console.log('Check in priority users');
    if (priorityUsers.length > 0) {
      var minPriorityUser = priorityUsers[0];
      var minPriorityValue = 1;
      console.log('Init priority check');
      for (var v = 0; v < priorityUsers.length; v++) {
        const user = priorityUsers[v];
        console.log('Scan in user have code ' + user.code.toString());
        var minUser = 1;
        var isMatch = false;
        if (user.vectors && user.vectors.length > 0) {
          for (var index = 0; index < user.vectors.length; index++) {
            console.log('Scan vector stt ' + index.toString());
            const vectorItem = user.vectors[index].vector;
            const valueDistance = this.cosineSimilarity(
              this.convertBase64ToVector(vectorItem),
              this.convertBase64ToVector(newVector),
            );
            console.log(valueDistance);
            if (valueDistance < Threshold.THRESHOLD_MATCH && !isMatch) {
              console.log('Macth user' + user.code.toString());
              await this.updateHistoryEvent(
                {
                  cameraId: cameraId,
                  timeStamp: timeStamp,
                  position: position,
                  userId: userId,
                } as HistoryEntity,
                user._id,
              );
              isMatch = true;
            }
            if (valueDistance < minUser) minUser = valueDistance;
          }
          if (isMatch) {
            if (
              minUser > Threshold.MIN_THRESHOLD_SAVE_VECTOR &&
              minUser < Threshold.MAX_THRESHOLD_SAVE_VECTOR
            ) {
              console.log('Save vector to DB in Priority');
              await this.updateVector2(
                {
                  cameraId: cameraId,
                  userId: userId,
                  vector: newVector,
                } as VectorEntity,
                user._id,
              );
            }
            return;
          } else {
            if (minPriorityValue > minUser) {
              minPriorityValue = minUser;
              minPriorityUser = user;
            }
          }
        }
      }
      if (secondPriorityUsers.length > 0) {
        for (var item = 0; item < secondPriorityUsers.length; item++) {
          const user = secondPriorityUsers[item];
          if (user.vectors && user.vectors.length > 0) {
            for (var index = 0; index < user.vectors; index++) {
              const vectorItem = user.vectors[index].vector;
              const valueDistance = this.cosineSimilarity(
                this.convertBase64ToVector(vectorItem),
                this.convertBase64ToVector(newVector),
              );
              if (valueDistance < Threshold.THRESHOLD_MATCH) {
                await this.updateHistoryEvent(
                  {
                    cameraId: cameraId,
                    timeStamp: timeStamp,
                    position: position,
                    userId: userId,
                  } as HistoryEntity,
                  user._id,
                );
                if (
                  valueDistance > Threshold.MIN_THRESHOLD_SAVE_VECTOR &&
                  valueDistance < Threshold.MAX_THRESHOLD_SAVE_VECTOR
                ) {
                  console.log('Update Vector');
                  await this.updateVector2(
                    {
                      cameraId: cameraId,
                      userId: userId,
                      vector: newVector,
                    } as VectorEntity,
                    user._id,
                  );
                }
                return;
              }
            }
          }
        }
      }

      if (
        (minPriorityValue > Threshold.MIN_THRESHOLD_SAVE_VECTOR &&
          minPriorityValue < Threshold.MAX_THRESHOLD_SAVE_VECTOR) ||
        minPriorityUser.history.length == 1 ||
        minPriorityUser.history[minPriorityUser.history.length - 1].type ==
          'DOOR'
      ) {
        // console.log(newVector);
        await this.updateVector2(
          {
            cameraId: cameraId,
            userId: userId,
            vector: newVector,
          } as VectorEntity,
          minPriorityUser._id,
        );
      }

      return await this.updateHistoryEvent(
        {
          cameraId: cameraId,
          timeStamp: timeStamp,
          position: position,
          userId: userId,
        } as HistoryEntity,
        minPriorityUser._id,
      );
    }
  }

  async deleteUser(id: string) {
    return await this.userModel.findByIdAndDelete(id).exec();
  }

  async getHistory(id: string, start: Date, end: Date) {
    const startTime = start.getTime();
    const endTime = end.getTime();
    const newEvents: HistoryEntity[] = [];
    const user = await this.userModel.findById(id).exec();
    if (user != null && user.history != null && user.history.length != 0) {
      // eslint-disable-next-line prefer-const
      let events = user.history.sort(
        (a, b) => -a.timeStamp.getTime() + b.timeStamp.getTime(),
      );
      if (events != null && events.length != 0) {
        events.map((value) => {
          const event = value as HistoryEntity;
          if (
            event.timeStamp != null &&
            event.timeStamp.getTime() > startTime &&
            event.timeStamp.getTime() < endTime
          ) {
            newEvents.push(value);
          }
        });
      }
      for (var value of newEvents) {
        value.cameraId = (
          await this.cameraService.findOneWithOut(value.cameraId)
        ).name;
      }
    }
    return newEvents;
  }

  async updateUserInfoByAdmin(id: string, updateUser: UpdateUserDto ){
    return await this.userModel.findByIdAndUpdate(id, updateUser).exec();
  }
}
