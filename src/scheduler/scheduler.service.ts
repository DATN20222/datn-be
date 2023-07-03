import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class SchedulerService {

  constructor(
    private userService: UsersService
  ){};

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async deleteVectorPerson() {
    console.log(new Date());
    await this.userService.delVectorsInDayUser();
  }
}
