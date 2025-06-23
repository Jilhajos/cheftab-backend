// src/food/food.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FoodItem } from './entities/food.entity';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(FoodItem)
    private readonly repo: Repository<FoodItem>,
  ) {}

  async create(dto: CreateFoodDto): Promise<FoodItem> {
    return await this.repo.save(dto);
  }

  findAll(): Promise<FoodItem[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<FoodItem> {
    const item = await this.repo.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Food item not found');
    return item;
  }

  async update(id: string, dto: UpdateFoodDto): Promise<FoodItem> {
    await this.repo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
