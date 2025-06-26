import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  ManyToOne
} from 'typeorm';
import { OrderItem } from './order-item.entity';
import { Table } from '../tables/table.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
tableNumber: string;

  @ManyToOne(() => Table, table => table.orders, { eager: true })
  table: Table;

  @OneToMany(() => OrderItem, item => item.order, {
    cascade: true,
    eager: true
  })
  items: OrderItem[];

  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;

  @Column('decimal', { precision: 10, scale: 2 })
  tax: number;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @CreateDateColumn()
  createdAt: Date;
}
