import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Table } from './table.entity';
import { CreateTableDto } from './create-table.dto';
import { UpdateTableStatusDto } from './update-table-status.dto';

@Injectable()
export class TableService {
  constructor(
    @InjectRepository(Table)
    private tableRepo: Repository<Table>,
  ) {}

  async createTable(dto: CreateTableDto) {
    const existing = await this.tableRepo.findOne({
      where: { tableNumber: dto.tableNumber },
    });
    if (existing) throw new Error('Table number already exists');

    const table = this.tableRepo.create(dto);
    return this.tableRepo.save(table);
  }

  async getTablesBySection(section?: string) {
    if (section) {
      return this.tableRepo.find({
        where: {
          section: section as 'main' | 'outdoor' | 'private',
        },
        order: {
          tableNumber: 'ASC',
        },
      });
    }

    return this.tableRepo.find({
      order: {
        tableNumber: 'ASC',
      },
    });
  }

  async findById(id: number): Promise<Table> {
    const table = await this.tableRepo.findOne({ where: { id } });
    if (!table) {
      throw new NotFoundException('Table not found');
    }
    return table;
  }

  async updateTableStatus(id: number, dto: UpdateTableStatusDto) {
    const table = await this.tableRepo.findOne({ where: { id } });
    if (!table) throw new NotFoundException('Table not found');

    table.status = dto.status;
    return this.tableRepo.save(table);
  }

  async deleteTable(id: number) {
    const table = await this.tableRepo.findOne({ where: { id } });
    if (!table) throw new NotFoundException('Table not found');

    return this.tableRepo.remove(table);
  }

  async getTotalTablesCount(): Promise<number> {
    return this.tableRepo.count();
  }
}
