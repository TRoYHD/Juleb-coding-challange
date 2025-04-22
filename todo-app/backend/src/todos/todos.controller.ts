// backend/src/todo/todo.controller.ts
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';
  import { TodoService } from './todos.service';
  import { CreateTodoDto } from './dto/create-todo.dto';
  import { UpdateTodoDto } from './dto/update-todo.dto';
  import { Todo } from './entities/todo.entity';
  @Controller('api/todos')
  export class TodoController {
    constructor(private readonly todoService: TodoService) {}
  
    @Post()
    create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
      return this.todoService.create(createTodoDto);
    }
  
    @Get()
    findAll(): Promise<Todo[]> {
      return this.todoService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
      return this.todoService.findOne(id);
    }
  
    @Patch(':id')
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateTodoDto: UpdateTodoDto,
    ): Promise<Todo> {
      return this.todoService.update(id, updateTodoDto);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
      return this.todoService.remove(id);
    }
  }