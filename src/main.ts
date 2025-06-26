import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common'; // <-- add this

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:8080',
    credentials: true,
  });

  // ✅ Add global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // removes unknown fields
      forbidNonWhitelisted: true, // throws error for unexpected fields
      transform: true, // transforms types (e.g., string to boolean)
    }),
  );

  // Serve static files
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  await app.listen(3000);
}
bootstrap();
