/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { NATS_SERVICE } from 'src/config';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  createProduct(@Body() createProduct: CreateProductDto) {
    return this.client.send({ cmd: 'create_product' }, createProduct).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.client.send({ cmd: 'find_all_products' }, paginationDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get(':id')
  findOneProduct(@Param('id') id: string) {
    return this.client.send({ cmd: 'find_one_product' }, { id }).pipe(
      catchError((err: any) => {
        throw new RpcException(err);
      }),
    );

    // try {
    //   const product = await firstValueFrom<{ id: string; name: string }>(
    //     this.productsClient.send({ cmd: 'find_one_product' }, { id }),
    //   );
    //   return product;
    // } catch (error: any) {
    //   throw new RpcException(error);
    // }
  }

  @Patch(':id')
  updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDTO: UpdateProductDto,
  ) {
    return this.client
      .send({ cmd: 'update_product' }, { ...updateProductDTO, id })
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.client.send({ cmd: 'delete_product' }, { id }).pipe(
      catchError((err: any) => {
        throw new RpcException(err);
      }),
    );
  }
}
