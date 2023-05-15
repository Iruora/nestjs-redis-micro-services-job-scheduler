import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Product } from 'apps/products/src/schemas/product';
import { Order } from 'apps/orders/src/schemas/order';

@Controller()
export class GatewayController {
  constructor(private readonly httpService: HttpService) {}

  @Get('products')
  async getProducts(): Promise<Array<Product>> {
    return lastValueFrom(
      this.httpService
        .get<Product[]>(process.env.PRODUCTS_MS_URL)
        .pipe(map((response) => response.data)),
    );
  }

  @Get('products/:id')
  async getProductDetails(@Param('id') id: string): Promise<Product> {
    return lastValueFrom(
      this.httpService
        .get<Product>(`${process.env.PRODUCTS_MS_URL}/${id}`)
        .pipe(map((response) => response.data)),
    );
  }

  @Post('products')
  async saveProduct(@Body() product: Product): Promise<Product> {
    return lastValueFrom(
      this.httpService
        .post<Product>(process.env.PRODUCTS_MS_URL, product)
        .pipe(map((response) => response.data)),
    );
  }

  @Put('products/:id')
  async updateProductQuantity(
    @Body() product: Pick<Product, 'quantity'>,
    @Param('id') id: string,
  ): Promise<Product> {
    return lastValueFrom(
      this.httpService
        .patch(`${process.env.PRODUCTS_MS_URL}/${id}`, product)
        .pipe(map((response) => response.data)),
    );
  }

  @Get('orders')
  async getOrders(): Promise<Array<Order>> {
    return lastValueFrom(
      this.httpService
        .get<Order[]>(process.env.ORDERS_MS_URL)
        .pipe(map((response) => response.data)),
    );
  }

  @Post('orders')
  async saveOrder(@Body() order: Order): Promise<Order> {
    return lastValueFrom(
      this.httpService
        .post<Order>(process.env.ORDERS_MS_URL, order)
        .pipe(map((response) => response.data)),
    );
  }
}
