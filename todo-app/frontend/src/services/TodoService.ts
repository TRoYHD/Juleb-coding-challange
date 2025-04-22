// src/services/TodoService.ts
import { Todo, CreateTodoDto, UpdateTodoDto } from '../models/Todo';

// Mock data for testing
let MOCK_TODOS: Todo[] = [
  {
    id: 1,
    title: 'Learn Ionic React',
    description: 'Study the basics of Ionic with React',
    completed: true,
    createdAt: new Date('2025-04-15T10:00:00'),
    updatedAt: new Date('2025-04-15T10:00:00')
  },
  {
    id: 2,
    title: 'Build Todo App',
    description: 'Create a Todo application with Ionic React',
    completed: false,
    createdAt: new Date('2025-04-16T10:00:00'),
    updatedAt: new Date('2025-04-16T10:00:00')
  }
];

export const TodoService = {
  // Get all todos
  getAll: async (): Promise<Todo[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...MOCK_TODOS];
  },

  // Get a specific todo by ID
  getById: async (id: number): Promise<Todo> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const todo = MOCK_TODOS.find(t => t.id === id);
    if (!todo) {
      throw new Error(`Todo with ID ${id} not found`);
    }
    
    return { ...todo };
  },

  // Create a new todo
  create: async (todoData: CreateTodoDto): Promise<Todo> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Generate a new ID
    const newId = Math.max(0, ...MOCK_TODOS.map(t => t.id)) + 1;
    
    const newTodo: Todo = {
      id: newId,
      title: todoData.title,
      description: todoData.description || '',
      completed: todoData.completed || false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    MOCK_TODOS.push(newTodo);
    return { ...newTodo };
  },

  // Update an existing todo
  update: async (id: number, todoData: UpdateTodoDto): Promise<Todo> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = MOCK_TODOS.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error(`Todo with ID ${id} not found`);
    }
    
    // Update the todo
    const updatedTodo: Todo = {
      ...MOCK_TODOS[index],
      ...todoData,
      updatedAt: new Date()
    };
    
    MOCK_TODOS[index] = updatedTodo;
    return { ...updatedTodo };
  },

  // Delete a todo
  delete: async (id: number): Promise<void> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = MOCK_TODOS.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error(`Todo with ID ${id} not found`);
    }
    
    MOCK_TODOS.splice(index, 1);
  }
};