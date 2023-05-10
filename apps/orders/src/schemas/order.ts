import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OrderDocument = HydratedDocument<Order>;

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
}

export const OrderSchema = SchemaFactory.createForClass(Order);
