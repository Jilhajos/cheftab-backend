// src/modules/tables/dto/create-table.dto.ts
import { IsString, IsNumber, IsIn, IsOptional } from 'class-validator';

export class CreateTableDto {
  @IsString()
  tableNumber: string;

  @IsNumber()
  seats: number;

  @IsIn(['main', 'outdoor', 'private'])
  section: 'main' | 'outdoor' | 'private';

  @IsOptional()
  @IsIn(['available', 'occupied', 'reserved', 'maintenance'])
  status?: 'available' | 'occupied' | 'reserved' | 'maintenance';
}
