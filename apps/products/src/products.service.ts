import { Injectable, InternalServerErrorException } from '@nestjs/common';
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

  async updateProductQuantity(
    id: string,
    newQuantity: number,
  ): Promise<Product> {
    const updateResult = await this.productModel.updateOne(
      { _id: id },
      { quantity: newQuantity },
    );

    if (!updateResult.acknowledged || updateResult.modifiedCount < 1) {
      throw new InternalServerErrorException('Product not updated');
    }

    return this.getProductDetails(id);
  }

  async getProductDetails(id: string): Promise<Product> {
    return this.productModel.findById(id);
  }
}
