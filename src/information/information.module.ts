import { Module } from '@nestjs/common';
import { InformationService } from './information.service';
import { InformationController } from './information.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Camera, CameraSchema } from 'src/cameras/entities/camera.entity';
import { Information, InformationSchema } from './entities/information.entity';
import { CamerasController } from 'src/cameras/cameras.controller';
import { CamerasService } from 'src/cameras/cameras.service';
import { UsersService } from 'src/users/users.service';
import { User, UserSchema } from 'src/users/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Camera.name, schema: CameraSchema },
      {
        name: Information.name,
        schema: InformationSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [InformationController, CamerasController],
  providers: [InformationService, CamerasService, UsersService],
  exports: [InformationService],
})
export class InformationModule {}
