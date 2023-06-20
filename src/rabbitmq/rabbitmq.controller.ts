import {
  Controller,
  Inject,
  OnApplicationBootstrap,
  Post,
} from '@nestjs/common';
import {
  ClientProxy,
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/jwt.guard';
import { RabbitmqService } from './rabbitmq.service';
import { RabbitMQPubSubClient } from './rabbitmqClient';

@ApiTags('Sensors Controller')
@Controller('sensors')
export class RabbitmqController implements OnApplicationBootstrap {
  constructor(
    private readonly rabbitmqService: RabbitmqService,
    @Inject('RABBITMQ_SERVICE') private client: ClientProxy,
    @Inject('RABBITMQ_SERVICE2') private client1: ClientProxy,
  ) {}
  async onApplicationBootstrap() {
    await this.client.connect();
    await this.client1.connect();
  }

  @MessagePattern()
  async getNotifications(@Payload() data: any, @Ctx() context: RmqContext) {
    const jsonData = JSON.parse(JSON.stringify(data));

    await this.rabbitmqService.save(
      jsonData['ip'],
      jsonData,
      jsonData['image'],
    );
  }

  @Post()
  @Public()
  getControllerMusic() {
    console.log('Get control');
    this.rabbitmqService.controlMusic();
    // const message = ':cat:';
    // const record = new RmqRecordBuilder(message)
    //   .setOptions({
    //     headers: {
    //       ['x-version']: '1.0.0',
    //     },
    //     priority: 3,
    //   })
    //   .build();
    // const client2 = new RabbitMQPubSubClient();
    // client2
    //   .emit({ cmd: 'q-2' }, JSON.stringify({ data: 'test data' }))
    //   .subscribe(
    //     (response) => console.log(response),
    //     (error) => console.error(error.message),
    //   );
    // this.client1
    //   .send({ cmd: 'q-2' }, JSON.stringify({ data: 'test data' }))
    //   .subscribe(
    //     (response) => console.log(response),
    //     (error) => console.error(error.message),
    //   );
    // return 0;
  }
}
