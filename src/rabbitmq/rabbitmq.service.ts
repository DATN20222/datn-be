import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CamerasService } from 'src/cameras/cameras.service';
import { Events } from 'src/events/events';
import { InformationDto } from 'src/information/dto/information.dto';

@Injectable()
export class RabbitmqService {
  constructor(
    private readonly camerasService: CamerasService,
    private eventEmitter: EventEmitter2,
  ) {}

  async save(ip: string, data: InformationDto, image: string) {
  
    return await this.camerasService.updateEvent(ip, data, image);
  }

  controlMusic() {
    const payload = { type: 3 };
    // console.log(JSON.stringify(payload));
    this.eventEmitter.emit(Events.CONTROL_MUSIC, payload);
  }
}
