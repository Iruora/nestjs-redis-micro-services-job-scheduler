import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schemas/order';
import { Model } from 'mongoose';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @Inject('ORDERS_SERVICE') private readonly redisClient: ClientProxy,
  ) {}

  async getOrders(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  async createOrder(order: Order): Promise<Order> {
    this.redisClient.emit('REDUCE_QTY', {
      productId: order.productId,
      quantity: order.quantity,
    });

    return this.orderModel.create(order);
  }
}
