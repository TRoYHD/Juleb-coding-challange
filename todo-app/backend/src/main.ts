import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SpaFallbackFilter } from './filters/spa-fallback.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.enableCors();
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  
  // Set global prefix for all API routes
  app.setGlobalPrefix('api');
  
  // Apply global filter for SPA fallback
  app.useGlobalFilters(new SpaFallbackFilter());
  
  await app.listen(3000);
  console.log('Application started successfully on port 3000');
}
bootstrap();