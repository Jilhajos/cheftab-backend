import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateStaffDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  role: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  emergency_contact: string;

  @IsOptional()
  status?: 'active' | 'inactive';

  @IsOptional()
  id_card?: boolean;

  @IsOptional()
  bank_details?: boolean;

  @IsOptional()
  imageUrl?: string;
}
