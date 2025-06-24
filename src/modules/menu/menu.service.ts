import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Menu } from './menu.entity';
import { CreateMenuDto } from './create-menu.dto';
import { UpdateMenuDto } from './update-menu.dto';
import { randomBytes } from 'crypto';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Menu)
    private readonly repo: Repository<Menu>,
  ) {}

  async create(dto: CreateMenuDto): Promise<Menu> {
    const menuItem = this.repo.create(dto);

    // ✅ Generate itemId (8-char random string)
    menuItem.itemId = 'ITEM-' + randomBytes(4).toString('hex').toUpperCase();

    return await this.repo.save(menuItem);
  }

  findAll(): Promise<Menu[]> {
    return this.repo.find();
  }

  async findByItemId(itemId: string): Promise<Menu> {
    const item = await this.repo.findOne({ where: { itemId } });
    if (!item) throw new NotFoundException('Menu item not found');
    return item;
  }

  async updateByItemId(itemId: string, dto: UpdateMenuDto): Promise<Menu> {
    const item = await this.findByItemId(itemId);
    await this.repo.update(item.id, dto); // use internal UUID for update
    return this.findByItemId(itemId);
  }

  async removeByItemId(itemId: string): Promise<void> {
    const item = await this.findByItemId(itemId);
    await this.repo.delete(item.id); // use internal UUID for deletion
  }

  async updateImageUrl(itemId: string, imageUrl: string): Promise<Menu> {
  const item = await this.findByItemId(itemId);
  item.imageUrl = imageUrl;
  return this.repo.save(item);
}

}
