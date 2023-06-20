import { Module, ValidationPipe } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CamerasModule } from './cameras/cameras.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './config/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MailerModule } from '@nestjs-modules/mailer';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { JwtGuard } from './auth/jwt.guard';
import { RolesGuard } from './auth/permission/role.guard';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AMQPModule } from '@enriqcg/nestjs-amqp';
// import { SocketGateway } from './socket/socket.gateway';
// import { SocketModule } from './socket/socket.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { InformationModule } from './information/information.module';
// import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { DistrictModule } from './district/district.module';
import { CityModule } from './city/city.module';
import { StallModule } from './stall/stall.module';
import { ProductModule } from './product/product.module';
import { EnvironmentModule } from './environment/environment.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    UsersModule,
    CamerasModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    AMQPModule.forRoot({
      name: 'rabbitmq',
      hostname: 'localhost',
      port: 5672,
      username: 'admin',
      password: 'admin',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get('db.url'),
      }),
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        ignoreTLS: false,
        requireTLS: true,
        auth: {
          user: 'bAgri0622@gmail.com',
          pass: 'tndfeketbbgpyyte',
        },
      },
      defaults: {
        from: 'bAgri',
      },
    }),
    EventEmitterModule.forRoot(),
    // SocketModule,
    RabbitmqModule,
    InformationModule,
    AuthModule,
    EventsModule,
    DistrictModule,
    CityModule,
    StallModule,
    ProductModule,
    EnvironmentModule,
    StorageModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_GUARD, useClass: JwtGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_PIPE, useClass: ValidationPipe },
  ],
})
export class AppModule {}
