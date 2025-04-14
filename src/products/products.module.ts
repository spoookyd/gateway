import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';

import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [ProductsController],
  imports: [
    //! si trabajamos con configmodule para las variables de entorno, tendria que
    //! ser asincrono el register para que las variables entren
    NatsModule,
  ],
})
export class ProductsModule {}
