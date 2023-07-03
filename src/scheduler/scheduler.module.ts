import { Module } from '@nestjs/common';
import { SchedulerService } from './scheduler.service';
import { ScheduleModule } from '@nestjs/schedule';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [SchedulerService],
  imports: [ScheduleModule.forRoot(), UsersModule],
})
export class SchedulerModule {}
