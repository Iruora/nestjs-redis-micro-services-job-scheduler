import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class App1Controller {
  constructor(@Inject('APP_1') private readonly redisClient: ClientProxy) {}

  @Get()
  async sendMessage(): Promise<string> {
    this.redisClient.emit('test_event', { message: 'Hello from App1 !' });

    return 'message sent from app1';
  }
}
