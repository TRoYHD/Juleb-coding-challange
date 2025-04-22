import { Todo, CreateTodoDto, UpdateTodoDto } from '../models/Todo';

const API_URL = process.env.NODE_ENV === 'production' 
  ? '/api/todos' 
  : 'http://localhost:3000/api/todos';

export const TodoService = {
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