import { NestFactory } from '@nestjs/core';
import { ProductsModule } from './products.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProductsModule,
    {
      transport: Transport.REDIS,
      options: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT as unknown as number,
        // password: process.env.REDIS_PASSWORD,
        connectionName: 'products',
      },
    },
  );
  const webApp = await NestFactory.create(ProductsModule);

  await app.listen();
  await webApp.listen(3003);
}
bootstrap();
