// src/components/TodoList.tsx
import React, { useState, useEffect } from 'react';
import {
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonIcon,
  IonCheckbox,
  IonSpinner,
  IonAlert,
  IonButtons
} from '@ionic/react';
import { trash, create } from 'ionicons/icons';
import { Todo } from '../models/Todo';
import { TodoService } from '../services/TodoService';

interface TodoListProps {
  onEdit: (todo: Todo) => void;
  refresh: boolean;
  onRefreshComplete: () => void;
}

const TodoList: React.FC<TodoListProps> = ({ onEdit, refresh, onRefreshComplete }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);
  const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null);

  // Fetch todos when component mounts or refresh flag changes
  useEffect(() => {
    fetchTodos();
    if (refresh) {
      onRefreshComplete();
    }
  }, [refresh, onRefreshComplete]); // Added dependency

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await TodoService.getAll();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch todos. Please try again later.');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComplete = async (todo: Todo) => {
    try {
      // Only send the completed status, nothing else
      const updatedTodo = await TodoService.update(todo.id, {
        completed: !todo.completed
        // Don't include title or description here
      });
      
      setTodos(todos.map(t => t.id === todo.id ? updatedTodo : t));
    } catch (err) {
      setError('Failed to update todo status.');
      console.error('Error updating todo:', err);
    }
  };

  const handleDelete = async (todo: Todo) => {
    setTodoToDelete(todo);
    setShowDeleteAlert(true);
  };

  const confirmDelete = async () => {
    if (todoToDelete) {
      try {
        await TodoService.delete(todoToDelete.id);
        setTodos(todos.filter(t => t.id !== todoToDelete.id));
      } catch (err) {
        setError('Failed to delete todo.');
        console.error('Error deleting todo:', err);
      }
    }
    setShowDeleteAlert(false);
    setTodoToDelete(null);
  };

  if (loading && todos.length === 0) {
    return (
      <div className="ion-padding ion-text-center">
        <IonSpinner />
        <p>Loading todos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ion-padding ion-text-center">
        <p className="ion-color-danger">{error}</p>
        <IonButton onClick={fetchTodos}>Try Again</IonButton>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="ion-padding ion-text-center">
        <p>No todos found. Create your first todo!</p>
      </div>
    );
  }

  return (
    <>
      <IonList>
        {todos.map(todo => (
          <IonItem key={todo.id}>
            <IonCheckbox 
              slot="start" 
              checked={todo.completed} 
              onIonChange={() => handleToggleComplete(todo)}
            />
            <IonLabel>
              <h2 style={{ 
                textDecoration: todo.completed ? 'line-through' : 'none',
                opacity: todo.completed ? 0.7 : 1 // Add opacity rather than making text disappear
              }}>
                {todo.title}
              </h2>
              <p style={{ opacity: todo.completed ? 0.7 : 1 }}>
                {todo.description}
              </p>
            </IonLabel>
            
            {/* Added visible buttons for better usability */}
            <IonButtons slot="end">
              <IonButton onClick={() => onEdit(todo)}>
                <IonIcon slot="icon-only" icon={create} />
              </IonButton>
              <IonButton color="danger" onClick={() => handleDelete(todo)}>
                <IonIcon slot="icon-only" icon={trash} />
              </IonButton>
            </IonButtons>
          </IonItem>
        ))}
      </IonList>

      <IonAlert
        isOpen={showDeleteAlert}
        onDidDismiss={() => setShowDeleteAlert(false)}
        header="Confirm Delete"
        message="Are you sure you want to delete this todo?"
        buttons={[
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Delete',
            handler: confirmDelete
          }
        ]}
      />
    </>
  );
};

export default TodoList;