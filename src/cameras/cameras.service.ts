import { BadRequestException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import { Type } from 'class-transformer';
import { Model, Types } from 'mongoose';
import { InformationDto } from 'src/information/dto/information.dto';
import { Information } from 'src/information/entities/information.entity';
import { CameraDto } from './dto/camera.dto';
import { LatLngDto } from './dto/latlng.dto';
// import { UpdateCameraDto } from './dto/update-camera.dto';
import { Camera } from './entities/camera.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Environment } from 'src/environment/entities/environment.entity';
// import { Env } from 'onnxruntime-web';
import { CheckInEntity } from './entities/checkin.entity';

@Injectable()
export class CamerasService {

  constructor(
    @InjectModel(Camera.name)
    private readonly cameraModel: Model<Camera>,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) { }
  async create(createCameraDto: CameraDto) {
    // const camera = new this.cameraModel(createCameraDto);
    if (
      createCameraDto.name == null ||
      createCameraDto.name.length == 0 ||
      createCameraDto.ip == null ||
      createCameraDto.ip == undefined ||
      createCameraDto.ip.length == 0
    ) {
      throw new BadRequestException(
        'Các trường ip camera cần được nhập đầy đủ',
      );
    }
    if (!this.isIpAddress(createCameraDto.ip))
      throw new BadRequestException('Ip không đúng định dạng');

    return await this.cameraModel.create(createCameraDto);
  }

  async findAll() {
    return await this.cameraModel.find().select('-event -checkIn').exec();
  }

  async findOne(id: string) {
    return await this.cameraModel.findById(id).exec();
  }

  async findOneByIp(ip: string) {
    return await this.cameraModel.findOne({ ip: ip }).exec();
  }

  async getEventIp(ip: string, start: Date, end: Date) {
    const camera = await this.findOneByIp(ip);
    const newEvents: Environment[] = [];
    if (camera != null && camera != undefined) {
      const startTime = start.getTime();
      const endTime = end.getTime();
      // eslint-disable-next-line prefer-const
      let events = camera.event as Environment[];

      if (events != null && events.length != 0) {
        events.map((value) => {
          const event = value as Environment;
          if (
            event.timeStamp != null &&
            event.timeStamp.getTime() > startTime &&
            event.timeStamp.getTime() < endTime
          ) {
            newEvents.push(value);
          }
        });
      }
      camera.event = newEvents;
    }
    return camera;
  }

  async update(id: string, updateCameraDto: CameraDto) {
    return await this.cameraModel.findByIdAndUpdate(id, updateCameraDto).exec();
  }

  async updateEvent(
    ip: string,
    updateCameraDto: InformationDto,
    image: string,
  ) {
    updateCameraDto.timeStamp = new Date();
    let camera = await this.findOneByIp(ip);
    if (updateCameraDto.type == 1) {
      const eventId = new Types.ObjectId();
      if (camera != null && camera != undefined) {
        // camera.event.push({ ...updateCameraDto, _id: eventId } as Information);
        if (image != null && image.length != 0) {
          const { type, ...rest } = updateCameraDto;
          camera.image = image;
          camera.temperature = rest.temperature;
          camera.humidity = rest.humidity;
          camera.ppm = rest.ppm;
          camera.count = rest.count;
          camera.event.push({ ...rest } as Environment);
        }
      }
      return await camera.save();
    } else if (updateCameraDto.type == 3) {
      let user = await this.userService.getOneByCode(updateCameraDto.code);
      if (user != null && user != undefined) {
        // user.vector.push(updateCameraDto.vector);
        if (camera != null && camera != undefined) {
          camera.checkIn.push({
            userId: user._id,
            timeStamp: updateCameraDto.timeStamp,
          } as CheckInEntity);
          await camera.save();
        }
        return await this.userService.updateVector(
          {
            cameraId: ip,
            userId: updateCameraDto.userId,
            vector: updateCameraDto.vector,
          },
          user._id,
        );
        // return await user.save();
      }
    } else if (updateCameraDto.type == 2) {
      if (camera != null && camera != undefined) {
        // camera.event.push({ ...updateCameraDto, _id: eventId } as Environment);
        // if (image != null && image.length != 0) camera.image = image;
        return await this.userService.updateVectorUser(
          updateCameraDto.vector,
          ip,
          updateCameraDto.userId,
          updateCameraDto.timeStamp,
          updateCameraDto.position
        );
      }
    }
  }

  // convertBase64ToVector(encodedString) {
  //   let binary_string = atob(encodedString);
  //   let buffer = new ArrayBuffer(binary_string.length);
  //   let bytes_buffer = new Uint8Array(buffer);

  //   for (let i = 0; i < binary_string.length; i++) {
  //     bytes_buffer[i] = binary_string.charCodeAt(i);
  //   }

  //   let values = new Float64Array(buffer);
  //   return Array.from(values);
  // }

  // cosineSimilarity(emb1, emb2) {
  //   const dotProduct = emb1.reduce(
  //     (sum, value, index) => sum + value * emb2[index],
  //     0,
  //   );
  //   const normEmb1 = Math.sqrt(
  //     emb1.reduce((sum, value) => sum + value ** 2, 0),
  //   );
  //   const normEmb2 = Math.sqrt(
  //     emb2.reduce((sum, value) => sum + value ** 2, 0),
  //   );

  //   return (1 - dotProduct / (normEmb1 * normEmb2)) / 2;
  // }

  async remove(id: string) {
    return await this.cameraModel.findByIdAndDelete(id).exec();
  }

  async getInfor(ip: string) {
    const camera = await this.findOneByIp(ip);
    const length = camera.event.length;
    return length != 0 ? camera.event.at(length - 1) : null;
  }

  async getEvents() {
    let cameras: Camera[] = [];
    // eslint-disable-next-line prefer-const
    let events = [];
    cameras = await this.cameraModel.find().exec();
    if (cameras.length != 0 && cameras != null && cameras != undefined) {
      cameras.map((value) => {
        events.push({
          id: value._id,
          ip: value.ip,
          event:
            value.event.length != 0
              ? value.event.at(value.event.length - 1)
              : null,
        });
      });
    }
    return events;
  }

  // async getEventsByLatLng(latlngDto: LatLngDto) {
  //   let cameras: Camera[] = [];
  //   // eslint-disable-next-line prefer-const
  //   let events = [];
  //   cameras = await this.cameraModel.find().exec();
  //   if (cameras.length != 0 && cameras != null && cameras != undefined) {
  //     cameras.map((value) => {
  //       if (
  //         value.lat > latlngDto.minLat &&
  //         value.lat < latlngDto.maxLat &&
  //         value.lng < latlngDto.maxLng &&
  //         value.lng > latlngDto.minLng
  //       )
  //         events.push({
  //           id: value._id,
  //           ip: value.ip,
  //           lat: value.lat,
  //           lng: value.lng,
  //           event:
  //             value.event.length != 0
  //               ? value.event.at(value.event.length - 1)
  //               : null,
  //         });
  //     });
  //   }
  //   return events;
  // }

  async getEventsByTime(start: Date, end: Date) {
    let cameras = await this.cameraModel.find().exec();
    let newEvents = [];
    const startTime = start.getTime();
    const endTime = end.getTime();
    if (cameras.length != 0 && cameras != null && cameras != undefined) {
      cameras.map((value) => {
        if (value != null && value != undefined) {
          let events = value.event as Environment[];
          if (events != null && events.length != 0) {
            const event = events.at(events.length - 1) as Environment;

            if (
              event.timeStamp != null &&
              event.timeStamp.getTime() > startTime &&
              event.timeStamp.getTime() < endTime
            ) {
              newEvents.push({
                id: value._id,
                ip: value.ip,
                event:
                  value.event.length != 0
                    ? value.event.at(value.event.length - 1)
                    : null,
              });
            }
          }
        }
      });
    }
    return newEvents;
  }

  isIpAddress(ip: string) {
    const regexExp =
      /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;

    if (regexExp.test(ip)) {
      return true;
    } else {
      return false;
    }
  }
  base64ToArrayBuffer(base64) {
    var binaryString = atob(base64);
    var fLen = binaryString.length / Float32Array.BYTES_PER_ELEMENT;
    var dView = new DataView(new ArrayBuffer(Float32Array.BYTES_PER_ELEMENT));
    var fAry = new Float32Array(fLen);

    // var bytes = new Float32Array(binaryString.length);
    // for (var i = 0; i < binaryString.length; i++) {
    //     bytes[i] = binaryString.charCodeAt(i);
    // }
    var p = 0;																// Position

    for (var j = 0; j < fLen; j++) {
      p = j * 4;
      dView.setUint8(0, binaryString.charCodeAt(p));
      dView.setUint8(1, binaryString.charCodeAt(p + 1));
      dView.setUint8(2, binaryString.charCodeAt(p + 2));
      dView.setUint8(3, binaryString.charCodeAt(p + 3));
      fAry[j] = dView.getFloat32(0, true);
    }
    return fAry;
  }

  async updateCheckInCamera(cameraId: string, id: string) {
    const camera = await this.cameraModel.updateOne({
      ip: cameraId
    }, {
      $push: {
        checkIn: {
          userId: id,
          timeStamp: new Date()
        }
      }
    });
    if (!camera)
      throw new BadRequestException('Không tìm thấy ip có địa chỉ trên.');
  }
}
