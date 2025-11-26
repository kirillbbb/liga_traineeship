import * as yup from 'yup';

export const taskValidationSchema = yup.object({
  title: yup.string().required('Title is required').max(100, 'Title cannot exceed 100 characters').defined(),

  description: yup.string().max(500, 'Description cannot exceed 500 characters').default('').defined(),

  isCompleted: yup.boolean().required().default(false).defined(),

  isImportant: yup.boolean().required().default(false).defined(),
});

export type TaskFormValues = yup.InferType<typeof taskValidationSchema>;
