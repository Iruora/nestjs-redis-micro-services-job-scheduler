import { Injectable } from '@nestjs/common';
import { Product } from './schemas/product';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async createProduct(product: Product): Promise<Product> {
    return this.productModel.create(product);
  }
}
