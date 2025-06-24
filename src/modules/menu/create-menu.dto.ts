import { IsString, IsNumber, IsBoolean, IsEnum } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsString()
  category: string;

  @IsEnum(['veg', 'non-veg'])
  vegOrNonVeg: 'veg' | 'non-veg';

  @IsBoolean()
  isSpicy: boolean;

  @IsBoolean()
  isPopular: boolean;
}
