import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { App1Module } from 'apps/app1/src/app1.module';
import { App2Module } from 'apps/app2/src/app2.module';
import { ProductsModule } from 'apps/products/src/products.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    App1Module,
    App2Module,
    ProductsModule,
    ClientsModule.register([
      {
        name: 'GW',
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT as unknown as number,
          // password: process.env.REDIS_PASSWORD,
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
      // password: process.env.REDIS_PASSWORD,
      connectionName: 'GW',
    });
  }
}
