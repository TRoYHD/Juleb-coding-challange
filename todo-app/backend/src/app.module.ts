// backend/src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    // Configure TypeORM to use SQLite
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'todo.sqlite',
      autoLoadEntities: true,
      synchronize: true, // Not recommended for production
    }),
    
    // Serve the static frontend files
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api*'],
    }),
    
    // Include the Todo module
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}