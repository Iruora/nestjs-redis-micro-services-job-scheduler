import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;
export enum OrderStatus {
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  IDLE = 'IDLE',
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
