import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, lastValueFrom, map, tap } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Product } from 'apps/products/src/schemas/product';

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
        .get<Product[]>('http://localhost:3003')
        .pipe(map((response) => response.data)),
    );
  }

  @Post('products')
  async saveProduct(@Body() product: Product): Promise<Product> {
    return lastValueFrom(
      this.httpService
        .post<Product>('http://localhost:3003', product)
        .pipe(map((response) => response.data)),
    );
  }
}
