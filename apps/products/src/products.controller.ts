import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './schemas/product';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @MessagePattern(PRODUCTS_EVENT.products_get)
  @Get()
  async getProducts(): Promise<Array<Product>> {
    return this.productsService.findAll();
  }

  @Get(':id')
  async getProductDetails(@Param('id') id: string): Promise<Product> {
    return this.productsService.getProductDetails(id);
  }

  @Post()
  async createProduct(@Body() product): Promise<Product> {
    return this.productsService.createProduct(product);
  }

  @Patch(':id')
  async updateProductQuantity(
    @Param('id') id: string,
    @Body() product: Pick<Product, 'quantity'>,
  ): Promise<Product> {
    return this.productsService.updateProductQuantity(id, product.quantity);
  }

  @MessagePattern('REDUCE_QTY')
  async reduceOrderQuantity(data: {
    productId: string;
    quantity: number;
    orderId: string;
  }): Promise<void> {
    const { productId, quantity, orderId } = data;
    console.log(`Received message: ${data.productId} ${data.quantity}`);
    this.productsService.reduceProductQuantity(productId, quantity, orderId);
  }
}
