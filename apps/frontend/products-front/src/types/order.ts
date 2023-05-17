import { Quantifiable } from './common';

export interface IOrder extends Quantifiable {
  _id: string;
  status: string;
  rejectionReason: string;
  beneficiaryName: string;
  description: string;
  orderDate: Date;
  deliveryDate: Date;
  address: string;
  productId: string;
}
