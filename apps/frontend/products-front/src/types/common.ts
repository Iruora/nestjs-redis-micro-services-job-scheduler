import { IProduct } from './product';

export interface Quantifiable {
  quantity: number;
}

export interface IOrderProducts {
  products: Array<IProduct & { orderQuantity: number }>;
}
