import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from './staff.entity';
import { CreateStaffDto } from './create-staff.dto';
import { UpdateStaffDto } from './update-staff.dto';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff)
    private readonly repo: Repository<Staff>,
  ) {}

  create(dto: CreateStaffDto) {
    const staff = this.repo.create(dto);
    return this.repo.save(staff);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  update(id: string, dto: UpdateStaffDto) {
    return this.repo.update(id, dto);
  }

  async remove(id: string) {
  try {
    const result = await this.repo.delete(id);
    console.log('🧹 Delete Result:', result);

    if (result.affected === 0) {
      throw new Error('Staff not found');
    }

    return { message: 'Staff deleted successfully' };
  } catch (err) {
    console.error(' Failed to delete staff:', err);
    throw err;
  }
}

}
