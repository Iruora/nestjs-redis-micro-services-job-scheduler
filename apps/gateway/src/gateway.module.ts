import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { App1Module } from 'apps/app1/src/app1.module';
import { App2Module } from 'apps/app2/src/app2.module';
import { App1Controller } from 'apps/app1/src/app1.controller';

@Module({
  imports: [App1Module, App2Module],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
