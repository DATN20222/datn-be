import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitmqService } from './rabbitmq.service';
import { RabbitmqController } from './rabbitmq.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Camera, CameraSchema } from 'src/cameras/entities/camera.entity';
import { CamerasService } from 'src/cameras/cameras.service';
import { CamerasModule } from 'src/cameras/cameras.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    CamerasModule,
    UsersModule,
    MongooseModule.forFeatureAsync([
      {
        name: Camera.name,
        useFactory: () => {
          const schema = CameraSchema;
          schema.plugin(require('mongoose-unique-validator'));
          return schema;
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            {
              protocol: 'amqp',
              hostname: '35.240.159.210',
              port: 5672,
              username: 'admin',
              password: 'admin',
              locale: 'en_US',
              frameMax: 0,
              heartbeat: 0,
              vhost: '/',
            },
          ],
          queue: 'hello',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE2',
        transport: Transport.RMQ,
        options: {
          urls: [
            {
              protocol: 'amqp',
              hostname: '35.240.159.210',
              port: 5672,
              username: 'admin',
              password: 'admin',
              locale: 'en_US',
              frameMax: 0,
              heartbeat: 0,
              vhost: '/',
            },
          ],
          queue: 'q-2',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  providers: [RabbitmqService, CamerasService],
  controllers: [RabbitmqController],
  exports: [RabbitmqService],
})
export class RabbitmqModule { }
