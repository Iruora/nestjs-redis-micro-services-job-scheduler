// Generated by https://quicktype.io

export interface Order {
    _id: string;
  status: string;
  rejectionReason: string;
  beneficiaryName: string;
  description: string;
  quantity: number;
  orderDate: Date;
  deliveryDate: Date;
  address: string;
  productId: string;
}