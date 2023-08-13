import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { ScheduleModule } from '@nestjs/schedule';
import { UsersModule } from 'src/users/users.module';
import { CamerasModule } from 'src/cameras/cameras.module';

@Module({
  providers: [SchedulerService],
  imports: [ScheduleModule.forRoot(), UsersModule, CamerasModule],
})
export class SchedulerModule {}
