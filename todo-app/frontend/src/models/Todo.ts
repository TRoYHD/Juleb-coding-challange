export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateTodoDto {
  title: string;
  description: string;
  completed?: boolean;
}

export interface UpdateTodoDto {
  title?: string;
  description?: string;
  completed?: boolean;
}