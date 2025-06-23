// src/food/entities/food.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum FoodCategory {
  STARTER      = 'STARTER',
  MAIN_COURSE  = 'MAIN_COURSE',
  DESSERT      = 'DESSERT',
  BEVERAGE     = 'BEVERAGE',
}

export enum FoodLabel {
  SPICY   = 'SPICY',
  POPULAR = 'POPULAR',
  NEW     = 'NEW',
  SWEET   = 'SWEET',
}

@Entity()
export class FoodItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'enum', enum: FoodCategory })
  category: FoodCategory;

  @Column({ default: false })
  isVeg: boolean;


  @Column({ type: 'enum', enum: FoodLabel, array: true, nullable: true })
  labels?: FoodLabel[];

  /** Store an S3 or local URL; actual upload handled by your frontend or a separate Upload module */
  @Column()
  imageUrl: string;
}
