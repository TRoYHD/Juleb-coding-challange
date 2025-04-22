import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from '../entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async findAll(): Promise<Todo[]> {
    console.log('[TodosService] Finding all todos');
    try {
      const todos = await this.todoRepository.find({
        order: {
          createdAt: 'DESC',
        },
      });
      console.log(`[TodosService] Found ${todos.length} todos`);
      return todos;
    } catch (error) {
      console.error('[TodosService] Error finding all todos:', error);
      throw error;
    }
  }

  async findOne(id: number): Promise<Todo> {
    console.log(`[TodosService] Finding todo with ID ${id}`);
    try {
      const todo = await this.todoRepository.findOne({ where: { id } });
      
      if (!todo) {
        console.log(`[TodosService] Todo with ID ${id} not found`);
        throw new NotFoundException(`Todo with ID ${id} not found`);
      }
      
      console.log(`[TodosService] Found todo:`, todo);
      return todo;
    } catch (error) {
      console.error(`[TodosService] Error finding todo ${id}:`, error);
      throw error;
    }
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    console.log(`[TodosService] Creating new todo:`, createTodoDto);
    try {
      const todo = this.todoRepository.create(createTodoDto);
      const result = await this.todoRepository.save(todo);
      console.log(`[TodosService] Successfully created todo:`, result);
      return result;
    } catch (error) {
      console.error('[TodosService] Error creating todo:', error);
      throw error;
    }
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    console.log(`[TodosService] Attempting to update todo with ID ${id}`, updateTodoDto);
    
    const todo = await this.findOne(id);
    console.log(`[TodosService] Found todo to update:`, todo);
    
    // Only update properties that are actually provided (not undefined)
    // This is the key fix to prevent title/description from being overwritten with undefined
    for (const key in updateTodoDto) {
      if (updateTodoDto[key] !== undefined) {
        todo[key] = updateTodoDto[key];
      }
    }
    
    console.log(`[TodosService] Todo after applying updates:`, todo);
    
    try {
      const result = await this.todoRepository.save(todo);
      console.log(`[TodosService] Successfully saved updated todo:`, result);
      return result;
    } catch (error) {
      console.error(`[TodosService] Error saving todo:`, error);
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    console.log(`[TodosService] Attempting to remove todo with ID ${id}`);
    try {
      const result = await this.todoRepository.delete(id);
      
      if (result.affected === 0) {
        console.log(`[TodosService] Todo with ID ${id} not found for deletion`);
        throw new NotFoundException(`Todo with ID ${id} not found`);
      }
      
      console.log(`[TodosService] Successfully deleted todo with ID ${id}`);
    } catch (error) {
      console.error(`[TodosService] Error deleting todo ${id}:`, error);
      throw error;
    }
  }
}