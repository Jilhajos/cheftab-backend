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

// Table Module & Entity
import { TableModule } from './modules/tables/table.module';
import { Table } from './modules/tables/table.entity';

// Staff Module & Entity
import { StaffModule } from './modules/staff/staff.module';
import { Staff } from './modules/staff/staff.entity';

@Module({
  imports: [
    // Environment configuration
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // TypeORM configuration
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
        entities: [
          Menu,
          Order,
          OrderItem,
          Table,
          Staff, // ✅ Include Staff entity here
        ],
        synchronize: true, // ⚠️ Use false in production
      }),
    }),

    // Domain modules
    MenuModule,
    OrderModule,
    TableModule,
    StaffModule,
  ],
})
export class AppModule {}
