import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { MessagePattern } from '@nestjs/microservices';
import { PRODUCTS_EVENT } from 'apps/gateway/src/enums/products-event.enum';
import { Product } from './schemas/product';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @MessagePattern(PRODUCTS_EVENT.products_get)
  @Get()
  async getProducts(): Promise<Array<Product>> {
    return this.productsService.findAll();
  }

  @Post()
  async createProduct(@Body() product): Promise<Product> {
    return this.productsService.createProduct(product);
  }
}
