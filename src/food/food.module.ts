// src/food/food.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';
import { FoodItem } from './entities/food.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FoodItem])],
  controllers: [FoodController],
  providers: [FoodService],
})
export class FoodModule {}
