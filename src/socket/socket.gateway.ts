// import { Logger } from '@nestjs/common';
// import { Server } from '@nestjs/microservices';
// import {
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer,
// } from '@nestjs/websockets';
// import { Public } from 'src/auth/jwt.guard';

// // @WebSocketGateway( { cors: true })
// @Public()
// export class SocketGateway {
//   @WebSocketServer()
//   private server: Server;

//   private logger = new Logger('SocketGateway');

//   private clientIds = new Map<string, string>();
//   @SubscribeMessage('message')
//   handleMessage(client: any, payload: any): string {
//     return 'Hello world!';
//   }
// }
