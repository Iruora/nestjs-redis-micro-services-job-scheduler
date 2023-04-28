import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class App2Controller {
  @MessagePattern('test_event')
  async handleMessage(data: any): Promise<void> {
    console.log(`Received message: ${data.message}`);
  }
}
