import { NestFactory } from '@nestjs/core';
import { App2Module } from './app2.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app2 = await NestFactory.createMicroservice<MicroserviceOptions>(
    App2Module,
    {
      transport: Transport.REDIS,
      options: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT as unknown as number,
        connectionName: 'app2',
      },
    },
  );
  await app2.listen();
  console.log('App2 microservice is listening');
}
bootstrap();
