import { Module } from '@nestjs/common';
import { App2Controller } from './app2.controller';
import { App2Service } from './app2.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'APP_2',
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT as unknown as number,
          connectionName: 'app2',
        },
      },
    ]),
  ],
  controllers: [App2Controller],
  providers: [App2Service],
  exports: [ClientsModule],
})
export class App2Module {
  constructor() {
    console.log('APP2', {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT as unknown as number,
      connectionName: 'app2',
    });
  }
}
