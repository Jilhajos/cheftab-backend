import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderItem } from './order-item.entity';
import { CreateOrderDto } from './create-order.dto';
import { Table } from '../tables/table.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private itemRepo: Repository<OrderItem>,
    @InjectRepository(Table) private tableRepo: Repository<Table>
  ) {}

  async createOrder(dto: CreateOrderDto): Promise<Order> {
    const table = await this.tableRepo.findOne({
      where: { tableNumber: dto.tableNumber }
    });
    if (!table) throw new Error('Table not found');

    // Set status to occupied
    table.status = 'occupied';
    await this.tableRepo.save(table);

    const items = dto.items.map(i =>
      this.itemRepo.create({
        itemName: i.itemName,
        price: i.price,
        quantity: i.quantity,
        note: i.note || '',
        totalPrice: i.totalPrice
      })
    );

    const order = this.orderRepo.create({
      table,
      tableNumber: dto.tableNumber,
      items,
      subtotal: dto.subtotal,
      tax: dto.tax,
      total: dto.total
    });

    return this.orderRepo.save(order);
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepo.find();
  }
}
