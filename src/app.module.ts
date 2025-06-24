import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Menu Module & Entity
import { MenuModule } from './modules/menu/menu.module';
import { Menu } from './modules/menu/menu.entity';

// Order Module & Entities
import { OrderModule } from './modules/order/order.module';
import { Order } from './modules/order/order.entity';
import { OrderItem } from './modules/order/order-item.entity';

// Table Module & Entity ✅
import { TableModule } from './modules/tables/table.module';
import { Table } from './modules/tables/table.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: parseInt(config.get('DB_PORT') || '5432', 10),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [Menu, Order, OrderItem, Table], // ✅ added Table entity
        synchronize: true,
      }),
    }),
    MenuModule,
    OrderModule,
    TableModule, // ✅ imported TableModule
  ],
})
export class AppModule {}
