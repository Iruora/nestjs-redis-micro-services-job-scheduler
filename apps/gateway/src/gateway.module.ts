import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { ProductsModule } from 'apps/products/src/products.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ProductsModule,
    ClientsModule.register([
      {
        name: 'GW',
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT as unknown as number,
          connectionName: 'GW',
        },
      },
    ]),
    ConfigModule.forRoot(),
    HttpModule,
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {
  constructor() {
    console.log('GW', {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT as unknown as number,
      connectionName: 'GW',
    });
  }
}
