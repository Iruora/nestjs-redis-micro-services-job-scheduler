import { Module } from '@nestjs/common';
import { App1Controller } from './app1.controller';
import { App1Service } from './app1.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'APP_1',
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT as unknown as number,
          connectionName: 'app1',
        },
      },
    ]),
    ConfigModule.forRoot(),
  ],
  controllers: [App1Controller],
  providers: [App1Service],
  exports: [ClientsModule],
})
export class App1Module {
  constructor() {
    console.log('APP1', {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      connectionName: 'app1',
    });
  }
}
