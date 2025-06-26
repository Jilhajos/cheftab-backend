import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateMenuDto {
 @IsString()
  itemId: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  category: string;

  @IsString()
  imageUrl: string;

  @IsString() 
  vegOrNonVeg: string; 

  @IsBoolean()
  isSpicy: boolean;

  @IsBoolean()
  isPopular: boolean;
}
