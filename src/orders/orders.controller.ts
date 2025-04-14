import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  Patch,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.client.send('createOrder', createOrderDto).pipe(
      catchError((err: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        throw new RpcException(err);
      }),
    );
  }

  @Get()
  findAll(@Query() orderPaginationDto: OrderPaginationDto) {
    return this.client.send('findAllOrders', orderPaginationDto).pipe(
      catchError((err: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        throw new RpcException(err);
      }),
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.client.send('findOneOrder', { id }).pipe(
      catchError((err: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        throw new RpcException(err);
      }),
    );
  }

  @Patch(':id')
  changeOrderStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto,
  ) {
    return this.client.send('changeOrderStatus', {
      id,
      ...statusDto,
    });
  }
}
