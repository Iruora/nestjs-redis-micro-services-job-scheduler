import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app1 = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrdersModule,
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

  const app = await NestFactory.create(OrdersModule);
  await app.listen(3004);
}
bootstrap();
