import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CamerasService } from 'src/cameras/cameras.service';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class SchedulerService {

  constructor(
    private userService: UsersService,
    private camerasService: CamerasService
  ){};

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async deleteVectorPerson() {
    console.log(new Date());
    await this.userService.delVectorsInDayUser();
  }

  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async deleteCheckIn(){
    console.log(new Date());
    await this.camerasService.deleteCheckInCamera();
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async deleteInforEnv(){
    console.log(new Date());
    await this.camerasService.deleteEventCamera();
  }
}
