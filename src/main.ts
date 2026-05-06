import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // strips extra fields
      forbidNonWhitelisted: true, // throws error if extra fields sent
      transform: true,            // transforms body into DTO class instance
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
