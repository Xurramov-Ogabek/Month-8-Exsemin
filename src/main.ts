import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🍪 Cookie parser middleware
  app.use(cookieParser());

  // ✅ DTO validation va avtomatik transformatsiya
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO da yo‘q maydonlarni avtomatik olib tashlaydi
      forbidNonWhitelisted: true, // DTO da yo‘q maydonlar xatolik qaytaradi
      transform: true, // string -> number kabi avtomatik convert qiladi
    }),
  );

  await app.listen(3000);
  console.log('✅ Server ishga tushdi: http://localhost:3000');
}
bootstrap();
