import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm';
import { Order } from '../order/order.entity';

@Entity()
export class Table {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
tableNumber: string;


  @Column()
  seats: number;

  @Column()
  section: 'main' | 'outdoor' | 'private';

  @Column({ default: 'available' })
  status: 'available' | 'occupied' | 'reserved' | 'maintenance';

  @OneToMany(() => Order, order => order.table)
  orders: Order[];
}
