import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  app.enableCors();
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  
  // Set explicit global prefix with exclusions
  app.setGlobalPrefix('api', {
    exclude: ['/', '/*'], // This ensures the root path is not prefixed
  });
  
  await app.listen(3000);
  console.log('Application started successfully on port 3000');
}
bootstrap();