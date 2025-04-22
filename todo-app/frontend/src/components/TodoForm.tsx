// src/components/TodoForm.tsx
import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonCheckbox,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonRow,
  IonCol
} from '@ionic/react';
import { CreateTodoDto } from '../models/Todo';

interface TodoFormProps {
  initialValues: CreateTodoDto;
  isEditing: boolean;
  onSubmit: (values: CreateTodoDto) => Promise<void>;
  onCancel: () => void;
}

// Validation schema
const TodoSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Title is too short')
    .max(100, 'Title is too long')
    .required('Title is required'),
  description: Yup.string()
    .max(500, 'Description is too long'),
  completed: Yup.boolean()
});

const TodoForm: React.FC<TodoFormProps> = ({
  initialValues,
  isEditing,
  onSubmit,
  onCancel
}) => {
  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>
          {isEditing ? 'Edit Todo' : 'Add New Todo'}
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <Formik
          initialValues={initialValues}
          validationSchema={TodoSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              await onSubmit(values);
              resetForm();
            } catch (err) {
              console.error('Error submitting form:', err);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, handleChange, handleBlur, values, errors, touched }) => (
            <Form>
              <IonItem className={errors.title && touched.title ? 'ion-invalid' : ''}>
                <IonLabel position="floating">Title</IonLabel>
                <IonInput
                  name="title"
                  value={values.title}
                  onIonChange={handleChange}
                  onIonBlur={handleBlur}
                />
                {errors.title && touched.title && (
                  <div className="error-message ion-padding-start ion-color-danger">
                    {errors.title}
                  </div>
                )}
              </IonItem>

              <IonItem className={errors.description && touched.description ? 'ion-invalid' : ''}>
                <IonLabel position="floating">Description</IonLabel>
                <IonTextarea
                  name="description"
                  value={values.description}
                  onIonChange={handleChange}
                  onIonBlur={handleBlur}
                  rows={3}
                />
                {errors.description && touched.description && (
                  <div className="error-message ion-padding-start ion-color-danger">
                    {errors.description}
                  </div>
                )}
              </IonItem>

              <IonItem lines="none">
                <IonLabel>Completed</IonLabel>
                <IonCheckbox
                  slot="start"
                  name="completed"
                  checked={values.completed}
                  onIonChange={handleChange}
                />
              </IonItem>

              <IonRow className="ion-padding-top">
                <IonCol>
                  <IonButton
                    expand="block"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isEditing ? 'Update' : 'Add'} Todo
                  </IonButton>
                </IonCol>
                <IonCol>
                  <IonButton
                    expand="block"
                    fill="outline"
                    onClick={onCancel}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </IonButton>
                </IonCol>
              </IonRow>
            </Form>
          )}
        </Formik>
      </IonCardContent>
    </IonCard>
  );
};

export default TodoForm;