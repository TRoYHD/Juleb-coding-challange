// src/services/TodoService.ts
import { Todo, CreateTodoDto, UpdateTodoDto } from '../models/Todo';

// API base URL - will be used for both development and production
const API_URL = process.env.NODE_ENV === 'production' 
  ? '/api/todos' 
  : 'http://localhost:3000/api/todos';

export const TodoService = {
  // Get all todos
  getAll: async (): Promise<Todo[]> => {
    try {
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching todos:', error);
      throw error;
    }
  },

  // Get a specific todo by ID
  getById: async (id: number): Promise<Todo> => {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching todo ${id}:`, error);
      throw error;
    }
  },

  // Create a new todo
  create: async (todoData: CreateTodoDto): Promise<Todo> => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoData),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  },

  // Update an existing todo
  update: async (id: number, todoData: UpdateTodoDto): Promise<Todo> => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todoData),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error updating todo ${id}:`, error);
      throw error;
    }
  },

  // Delete a todo
  delete: async (id: number): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error deleting todo ${id}:`, error);
      throw error;
    }
  }
};