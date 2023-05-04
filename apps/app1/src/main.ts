import { NestFactory } from '@nestjs/core';
import { App1Module } from './app1.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app1 = await NestFactory.createMicroservice<MicroserviceOptions>(
    App1Module,
    {
      transport: Transport.REDIS,
      options: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT as unknown as number,
        connectionName: 'app1',
      },
    },
  );
  await app1.listen();
  console.log('App1 microservice is listening');
}
bootstrap();
