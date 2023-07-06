import { BadRequestException, Inject, Injectable, forwardRef } from '@nestjs/common';
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
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(forwardRef(() => CamerasService))
    private readonly cameraService: CamerasService,
    private eventEmitter: EventEmitter2,
  ) { }

  async findOneByPhone(phone: string) {
    return Optional.ofNullable(
      await this.userModel.findOne({ phone: phone }).lean().exec(),
    );
  }

  async getOneById(id: string) {
    return await this.userModel.findById(id).exec();
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
          throw new BadRequestException(
            `Số điện thoại hoặc email không tồn tại!`,
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

  async changePermission(id: string, role: Role) {
    return this.userModel
      .findByIdAndUpdate(
        id,
        {
          role: role,
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
    const user = await this.userModel.findById(id).exec();
    if (user == null)
      throw new BadRequestException('Không tìm thấy người dùng.');
    user.history.push(dto);
    return await user.save();
  }

  async updateVector(dto: VectorEntity, id: string) {
    const user = await this.userModel.findById(id).exec();
    if (user == null)
      throw new BadRequestException('Không tìm thấy người dùng.');
    user.vectors.push(dto);
    // return this.userModel.findByIdAndUpdate(id,
    //   {
    //     $push: {
    //       vectors: dto
    //     }
    //   }).exec();
    return await user.save();
  }


  async updateVectorUser(
    newVector: string,
    cameraId: string,
    userId: number,
    timeStamp: Date,
  ) {
    const users = await this.userModel
      .find()
      .select('-password -otp -otpExpired')
      .exec();

    const newVectorDecode = this.convertBase64ToVector(newVector);
    for (let index = 0; index < users.length; index++) {
      const element = users[index];

      if (element.vectors) {
        for (let item = 0; item < element.vectors.length; item++) {
          const vectorItem = element.vectors[item];
          if (cameraId == vectorItem.cameraId && userId == vectorItem.userId) {
            return await this.updateHistoryEvent(
              { cameraId: cameraId, timeStamp: timeStamp } as HistoryEntity,
              element._id,
            );
          } else if (
            cameraId == vectorItem.cameraId &&
            userId < vectorItem.userId
          ) {
            continue;
          } else {
            if (this.checkMapUser(vectorItem.vector, newVectorDecode)) {
              await this.updateVector(
                {
                  cameraId: cameraId,
                  userId: userId,
                  vector: newVector,
                } as VectorEntity,
                element._id,
              );
              return await this.updateHistoryEvent(
                { cameraId: cameraId, timeStamp: timeStamp } as HistoryEntity,
                element._id,
              );
            }
          }
        }
      }

    }
  }

  async checkMapUser(oldVector: string, newVectorDecode: number[]) {
    const oldVectorDecode = this.convertBase64ToVector(oldVector);
    const score = this.cosineSimilarity(oldVectorDecode, newVectorDecode);

    return (score < 0.35);

  }

  async updateVectorByUser(body: UpdateVectorUser) {
    const user = await this.getOneByCode(body.userId);
    const camera = await this.cameraService.findOneByIp(body.cameraId);
    if (!camera) throw new BadRequestException("Không tìm thấy camera có địa chỉ ip trên");
    if (user) {
      if (user.vectors && user.vectors.length != 0) {
        if (cosineSimilarity(user.vectors[0].vector, body.vector) > 0.25) {
          await this.cameraService.updateCheckInCamera(body.cameraId, user._id);
          return await user.updateOne({
            $push: {
              vectors: {
                cameraId: body.cameraId,
                userId: body.userId,
                vector: body.vector,
              },
              history: { cameraId: body.cameraId, timeStamp: new Date() },
            },
          });
        }

      }
      await this.cameraService.updateCheckInCamera(body.cameraId, user._id);
      return await user.updateOne({
        $push: {
          vectors: {
            cameraId: body.cameraId,
            userId: body.userId,
            vector: body.vector,
          },
          history: { cameraId: body.cameraId, timeStamp: new Date() },
        },
      });
    }
    throw new BadRequestException('Không tìm thấy người dùng.');
  }
}
