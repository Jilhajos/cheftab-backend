import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Query
} from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from './create-table.dto';
import { UpdateTableStatusDto } from './update-table-status.dto';

@Controller('tables')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Post()
  create(@Body() dto: CreateTableDto) {
    return this.tableService.createTable(dto);
  }

  // ✅ Updated to support optional filtering by section
  @Get()
  findAll(@Query('section') section?: string) {
    return this.tableService.getTablesBySection(section);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateTableStatusDto) {
    return this.tableService.updateTableStatus(+id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tableService.deleteTable(+id);
  }

  @Get('count')
getTotalTablesCount() {
  return this.tableService.getTotalTablesCount();
}

}
