import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Table } from '../tables/table.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Table])],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
