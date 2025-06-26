import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  Query,
  ParseIntPipe,
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

  @Get()
  findAll(@Query('section') section?: string) {
    return this.tableService.getTablesBySection(section);
  }

  @Get(':id')
  getTableById(@Param('id', ParseIntPipe) id: number) {
    return this.tableService.findById(id);
  }

  @Patch(':id/status')
  updateStatus(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTableStatusDto) {
    return this.tableService.updateTableStatus(id, dto);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.tableService.deleteTable(id);
  }

  @Get('count')
  getTotalTablesCount() {
    return this.tableService.getTotalTablesCount();
  }
}
