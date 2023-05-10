import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, lastValueFrom, map, tap } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Product } from 'apps/products/src/schemas/product';
import { Order } from 'apps/orders/src/schemas/order';

@Controller()
export class GatewayController {
  constructor(
    @Inject('APP_1')
    private readonly microservice1: ClientProxy,

    @Inject('APP_2')
    private readonly microservice2: ClientProxy,

    @Inject('PRODUCTS')
    private readonly productsMicroservice: ClientProxy,

    private readonly httpService: HttpService,
  ) {}

  @Get('microservice1')
  async callMicroservice1(): Promise<string> {
    const result = await this.microservice1.emit('test_event', {
      message: 'Hello from Gateway !',
    });
    return `Response from microservice1: ${JSON.stringify(result)}`;
  }

  @Get('microservice2')
  callMicroservice2(): Observable<any> {
    return this.microservice2
      .send('test_event', {
        message: 'Hello from Gateway !',
      })
      .pipe(tap(console.log));
  }

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

  @Patch('products/:id')
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
