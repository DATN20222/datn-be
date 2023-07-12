import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import {
  MicroserviceOptions,
  RmqOptions,
  Transport,
} from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.connectMicroservice<RmqOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [
        {
          protocol: 'amqp',
<<<<<<< HEAD
          hostname: '34.142.132.0',
=======
          hostname: 'localhost',
>>>>>>> 9c06af5 (position)
          port: 5672,
          username: 'admin',
          password: 'admin',
          locale: 'en_US',
        },
      ],
      queue: 'hello',
      queueOptions: {
        durable: false,
      },
    },
  });
  app.connectMicroservice<RmqOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [
        {
          protocol: 'amqp',
<<<<<<< HEAD
          hostname: '34.142.132.0',
=======
          hostname: 'localhost',
>>>>>>> 9c06af5 (position)
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
  });
  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.RMQ,
  //   options: {
  //     urls: ['amqp://admin:admin@34.124.151.137:5672'],
  //     queue: 'q-2',
  //     queueOptions: {
  //       durable: false,
  //     },
  //   },
  // });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('B2K')
    .setDescription('APIs for B2K system')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter access token',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/', app, document);
  const port = app.get(ConfigService).get<number>('http.port');
  await app.startAllMicroservices();

  await app.listen(port!);
  console.log(`Server run in: http://localhost:${port}`);
}
bootstrap();
