import {
  Controller, Get, Post, Patch, Delete, Body, Param
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './create-menu.dto';
import { UpdateMenuDto } from './update-menu.dto';
import { Query } from '@nestjs/common'

@Controller('menu')
export class MenuController {
  constructor(private readonly service: MenuService) {}

  @Post()
  create(@Body() dto: CreateMenuDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query('category') category?: string) {
    if (category) {
      return this.service.findByCategory(category);
    }
    return this.service.findAll();
  }


  @Get(':itemId') // ✅ Use itemId
  findOne(@Param('itemId') itemId: string) {
    return this.service.findByItemId(itemId);
  }

  @Patch(':itemId') // ✅ Use itemId
  update(@Param('itemId') itemId: string, @Body() dto: UpdateMenuDto) {
    return this.service.updateByItemId(itemId, dto);
  }

  @Delete(':itemId') // ✅ Use itemId
  remove(@Param('itemId') itemId: string) {
    return this.service.removeByItemId(itemId);
  }
}
