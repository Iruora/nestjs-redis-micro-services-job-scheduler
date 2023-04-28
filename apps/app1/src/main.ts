import { NestFactory } from '@nestjs/core';
import { App1Module } from './app1.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app1 = await NestFactory.createMicroservice<MicroserviceOptions>(
    App1Module,
    {
      transport: Transport.REDIS,
      options: {
        host: 'localhost',
        port: 6379,
      },
    },
  );
  await app1.listen();
  console.log('App1 microservice is listening');
}
bootstrap();
