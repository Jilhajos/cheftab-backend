// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MenuModule } from './modules/menu/menu.module';
import { Menu } from './modules/menu/menu.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes env variables available app-wide
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
        entities: [Menu],
        synchronize: true,
      }),
    }),
    MenuModule,
  ],
})
export class AppModule {}
