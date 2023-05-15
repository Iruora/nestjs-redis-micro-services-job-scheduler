import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;
export enum OrderStatus {
  IDLE = 'IDLE',
  REJECTED = 'REJECTED',
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  DELIVERY_IN_PROGRESS = 'DELIVERY_IN_PROGRESS',
  DELIVERED = 'DELIVERED',
}

@Schema()
export class Order {
  @Prop({ required: true })
  beneficiaryName: string;

  @Prop({ required: true })
  description: string;

  @Prop({ default: 1 })
  quantity: number;

  @Prop({ default: Date.now() })
  orderDate: Date;

  @Prop({ default: Date.now() })
  deliveryDate: Date;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  productId: string;

  @Prop({ required: true, default: OrderStatus.IDLE })
  status: OrderStatus;

  @Prop({ required: true, default: OrderStatus.IDLE })
  rejectionReason: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
