import { Quantifiable } from './common';

export interface IProduct extends Quantifiable {
  _id: string;
  name: string;
  description: string;
  quantity: number;
}

export interface IProducts {
  products: IProduct[];
}
