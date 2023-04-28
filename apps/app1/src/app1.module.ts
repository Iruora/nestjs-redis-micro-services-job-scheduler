import { Module } from '@nestjs/common';
import { App1Controller } from './app1.controller';
import { App1Service } from './app1.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'APP_1',
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        },
      },
    ]),
  ],
  controllers: [App1Controller],
  providers: [App1Service],
  exports: [ClientsModule],
})
export class App1Module {}
