import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.enableCors();
  
  app.useStaticAssets(join(__dirname, '..', 'public'));
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  
  app.setGlobalPrefix('api');
  
  app.use((req, res, next) => {
    if (!req.url.startsWith('/api')) {
      return res.sendFile(join(__dirname, '..', 'public', 'index.html'));
    }
    next();
  });
  
  await app.listen(3000);
}
bootstrap();