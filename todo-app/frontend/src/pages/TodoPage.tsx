import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonToast,
  IonRefresher,
  IonRefresherContent,
  IonButtons,
  IonButton
} from '@ionic/react';
import { add, refreshOutline } from 'ionicons/icons';
import { Todo, CreateTodoDto } from '../models/Todo';
import { TodoService } from '../services/TodoService';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';

const TodoPage: React.FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState<boolean>(false);

  // Default values for the form
  const defaultTodo: CreateTodoDto = {
    title: '',
    description: '',
    completed: false
  };

  const handleAddClick = () => {
    setEditingTodo(null);
    setShowForm(true);
  };

  const handleEditClick = (todo: Todo) => {
    setEditingTodo(todo);
    setShowForm(true);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingTodo(null);
  };

  const handleRefresh = (event: CustomEvent) => {
    setRefreshTrigger(true);
    // The event.detail.complete() will be called by the TodoList component
    setTimeout(() => {
      event.detail.complete();
    }, 1000);
  };

  const handleFormSubmit = async (values: CreateTodoDto) => {
    try {
      if (editingTodo) {
        // Update existing todo
        await TodoService.update(editingTodo.id, values);
        setMessage('Todo updated successfully!');
      } else {
        // Create new todo
        await TodoService.create(values);
        setMessage('Todo created successfully!');
      }
      setShowForm(false);
      setEditingTodo(null);
      setRefreshTrigger(true);
    } catch (err) {
      setMessage('Error saving todo. Please try again.');
      console.error('Error saving todo:', err);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Todo App</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setRefreshTrigger(true)}>
              <IonIcon icon={refreshOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <div className="ion-padding">
          {showForm ? (
            <TodoForm
              initialValues={editingTodo || defaultTodo}
              isEditing={!!editingTodo}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
            />
          ) : (
            <TodoList
              onEdit={handleEditClick}
              refresh={refreshTrigger}
              onRefreshComplete={() => setRefreshTrigger(false)}
            />
          )}
        </div>

        {!showForm && (
          <IonFab vertical="bottom" horizontal="end" slot="fixed">
            <IonFabButton onClick={handleAddClick}>
              <IonIcon icon={add} />
            </IonFabButton>
          </IonFab>
        )}

        <IonToast
          isOpen={!!message}
          onDidDismiss={() => setMessage(null)}
          message={message || ''}
          duration={2000}
          position="bottom"
        />
      </IonContent>
    </IonPage>
  );
};

export default TodoPage;