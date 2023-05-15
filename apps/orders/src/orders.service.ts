import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderStatus } from './schemas/order';
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
    const createdOrder = await this.orderModel.create(order);

    this.redisClient.emit('REDUCE_QTY', {
      productId: order.productId,
      quantity: order.quantity,
      orderId: createdOrder._id,
    });

    return order;
  }

  async rejectOrder({
    orderId,
    reason,
  }: {
    orderId: string;
    reason: string;
  }): Promise<void> {
    console.log('rejectOrder ', orderId);

    await this.orderModel.updateOne(
      { _id: orderId },
      { status: OrderStatus.REJECTED, rejectionReason: reason },
    );
  }

  async acceptOrder(orderId: string): Promise<void> {
    await this.orderModel.updateOne(
      { _id: orderId },
      { status: OrderStatus.PENDING },
    );
  }
}
