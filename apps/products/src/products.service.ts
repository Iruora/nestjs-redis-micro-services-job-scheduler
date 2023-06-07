import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Product } from './schemas/product';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @Inject('PRODUCTS') private readonly redisClient: ClientProxy,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async createProduct(product: Product): Promise<Product> {
    return this.productModel.create(product);
  }

  async updateProduct(
    id: string,
    { quantity: newQuantity, name, description }: Partial<Product>,
  ): Promise<Product> {
    if (newQuantity < 0) {
      throw new BadRequestException('Quantity must be positive');
    }

    const updateResult = await this.productModel.updateOne(
      { _id: id },
      { quantity: newQuantity, name, description },
    );

    if (!updateResult.acknowledged || updateResult.modifiedCount < 1) {
      throw new InternalServerErrorException('Product not updated');
    }

    return this.getProductDetails(id);
  }

  async getProductDetails(id: string): Promise<Product> {
    return this.productModel.findById(id);
  }

  async reduceProductQuantity(
    productId: string,
    quantity: number,
    orderId: string,
  ): Promise<void> {
    const currentProduct = await this.getProductDetails(productId);
    const newQuantity = currentProduct.quantity - quantity;

    if (newQuantity < 0) {
      this.redisClient.emit('REJECT_ORDER', {
        orderId,
        reason: 'Not enough products',
      });

      return;
    }

    this.redisClient.emit('ACCEPT_ORDER', orderId);

    await this.updateProduct(productId, {
      ...currentProduct,
      quantity: newQuantity,
    });
  }
}
