// src/food/dto/create-food.dto.ts
import {
  IsString, IsNumber, IsEnum, IsBoolean,
  IsArray, IsOptional,
} from 'class-validator';
import { FoodCategory, FoodLabel } from '../entities/food.entity';

export class CreateFoodDto {
  @IsString()  name: string;
  @IsNumber()  price: number;
  @IsEnum(FoodCategory) category: FoodCategory;
  @IsBoolean() isVeg: boolean;

  @IsOptional()
  @IsArray()
  @IsEnum(FoodLabel, { each: true })
  labels?: FoodLabel[];

  @IsString() imageUrl: string;
}
