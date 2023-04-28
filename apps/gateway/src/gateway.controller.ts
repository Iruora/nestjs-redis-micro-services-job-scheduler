import { Controller, Get, Inject } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class GatewayController {
  constructor(
    @Inject('APP_1')
    private readonly microservice1: ClientProxy,

    @Inject('APP_2')
    private readonly microservice2: ClientProxy,
  ) {}

  @Get('microservice1')
  async callMicroservice1(): Promise<string> {
    const result = await this.microservice1.emit('test_event', {
      message: 'Hello from Gateway !',
    });
    return `Response from microservice1: ${JSON.stringify(result)}`;
  }

  @Get('microservice2')
  async callMicroservice2(): Promise<string> {
    const result = await this.microservice2.emit('test_event', {
      message: 'Hello from Gateway !',
    });
    return `Response from microservice2: ${JSON.stringify(result)}`;
  }
}
