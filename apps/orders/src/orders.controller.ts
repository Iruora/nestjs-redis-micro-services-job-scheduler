import { Controller, Get, Post, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './schemas/order';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async getOrders(): Promise<Order[]> {
    return this.ordersService.getOrders();
  }

  @Post()
  async createOrder(@Body() order: Order): Promise<Order> {
    return this.ordersService.createOrder(order);
  }

  @MessagePattern('REJECT_ORDER')
  rejectOrder(rejectionData: { orderId: string; reason: string }) {
    console.log(
      `Rejecting order ${rejectionData.orderId} for reason ${rejectionData.reason}...`,
    );

    return this.ordersService.rejectOrder(rejectionData);
  }

  @MessagePattern('ACCEPT_ORDER')
  acceptOrder(orderId: string) {
    console.log('Accepting order ', orderId);
    return this.ordersService.acceptOrder(orderId);
  }
}
