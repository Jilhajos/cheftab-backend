import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './create-menu.dto';
import { UpdateMenuDto } from './update-menu.dto';
 
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
 
// Import Express types for Multer file typing
import { Express } from 'express';
 
@Controller('menu')
export class MenuController {
  constructor(private readonly service: MenuService) {}
 
  @Post()
  create(@Body() dto: CreateMenuDto) {
    return this.service.create(dto);
  }
 
  @Get()
  findAll() {
    return this.service.findAll();
  }
 
  @Get(':itemId')
  findOne(@Param('itemId') itemId: string) {
    return this.service.findByItemId(itemId);
  }
 
  @Patch(':itemId')
  update(@Param('itemId') itemId: string, @Body() dto: UpdateMenuDto) {
    return this.service.updateByItemId(itemId, dto);
  }
 
  @Delete(':itemId')
  remove(@Param('itemId') itemId: string) {
    return this.service.removeByItemId(itemId);
  }
 
  @Post(':itemId/image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/menu-images',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // optional: limit file size to 5MB
      fileFilter: (req, file, cb) => {
        // optional: accept only image files
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadImage(
    @Param('itemId') itemId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new Error('File not uploaded');
    }
    const imageUrl = `/uploads/menu-images/${file.filename}`;
    return this.service.updateImageUrl(itemId, imageUrl);
  }
 
  @Get(':itemId/image')
async getImage(@Param('itemId') itemId: string) {
  const menuItem = await this.service.findByItemId(itemId);
  return { imageUrl: menuItem.imageUrl || null };
}
 
}