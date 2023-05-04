import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schemas/product';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCTS',
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT as unknown as number,
          // password: process.env.REDIS_PASSWORD,
          connectionName: 'products',
        },
      },
    ]),
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.PRODUCTS_DB_URL),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ClientsModule],
})
export class ProductsModule {}
