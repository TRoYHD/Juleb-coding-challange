import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { FrontendModule } from '../../frontend/src/frontend/frontend.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.NODE_ENV === 'production' 
        ? '/app/data/todo.sqlite' 
        : 'todo.sqlite',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api*'],
      serveStaticOptions: {
        index: false,
      },
    }),
    TodosModule,
    FrontendModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}