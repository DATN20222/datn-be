import { Module, forwardRef } from '@nestjs/common';
import { CamerasService } from './cameras.service';
import { CamerasController } from './cameras.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Camera, CameraSchema } from './entities/camera.entity';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
// import {
//   Information,
//   InformationSchema,
// } from 'src/information/entities/information.entity';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    MongooseModule.forFeature([
      {
        name: Camera.name,
        schema: CameraSchema,
      },
    ]),
    
  ],
  controllers: [CamerasController],
  providers: [CamerasService],
  exports: [CamerasService]
})
export class CamerasModule {}
