import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventHandler } from './events.listeners';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE2',
        transport: Transport.RMQ,
        options: {
          urls: [
            {
              protocol: 'amqp',
              hostname: '34.142.132.0',
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
  providers: [EventHandler],
})
export class EventsModule { }
