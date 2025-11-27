import React, { CSSProperties } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { TaskFormValues } from 'api/tasksApi';

import { Button } from 'components/Button/Button';
import { Checkbox } from 'components/Checkbox';
import { TextField } from 'components/TextField';

export const taskValidationSchema = yup.object({
  name: yup.string().required('Название обязательно').max(100, 'Название не должно превышать 100 символов').defined(),

  info: yup.string().max(500, 'Описание не должно превышать 500 символов').default('').defined(),

  isCompleted: yup.boolean().required().default(false).defined(),

  isImportant: yup.boolean().required().default(false).defined(),
});

type FormData = TaskFormValues;

interface Props {
  initialData?: TaskFormValues;
  onSubmit: (data: FormData) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

const sharedInputStyle: CSSProperties = {
  padding: '10px 12px',
  boxSizing: 'border-box',
};

const TaskFormComponent: React.FC<Props> = ({ onSubmit, initialData, onCancel, isSubmitting = false }) => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<TaskFormValues>({
    defaultValues: {
      name: initialData?.name ?? '',
      info: initialData?.info ?? '',
      isCompleted: initialData?.isCompleted ?? false,
      isImportant: initialData?.isImportant ?? false,
    },
    resolver: yupResolver(taskValidationSchema),
  });

  const isCompleted = watch('isCompleted');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Название задачи"
            inputStyle={sharedInputStyle}
            errorText={errors.name?.message as string | undefined}
            disabled={isSubmitting}
          />
        )}
      />

      <Controller
        name="info"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Описание"
            multiline
            rows={5}
            inputStyle={sharedInputStyle}
            errorText={errors.info?.message as string | undefined}
            disabled={isSubmitting}
          />
        )}
      />

      <div style={{ display: 'flex', gap: '20px', margin: '15px 0' }}>
        <Controller
          name="isImportant"
          control={control}
          render={({ field: { value: rhfValue, ...restField } }) => (
            <Checkbox
              {...restField}
              checked={rhfValue ?? false}
              onChange={(e) => restField.onChange(e.target.checked)}
              label="Важная задача"
              disabled={isSubmitting}
            />
          )}
        />
        <Controller
          name="isCompleted"
          control={control}
          render={({ field: { value: rhfValue, ...restField } }) => (
            <Checkbox
              {...restField}
              checked={rhfValue ?? false}
              onChange={(e) => restField.onChange(e.target.checked)}
              label="Завершено"
              disabled={isSubmitting}
            />
          )}
        />
      </div>

      <div className="form-actions" style={{ marginTop: '20px' }}>
        <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
          Сохранить
        </Button>
        {onCancel && (
          <Button variant="secondary" onClick={onCancel} disabled={isSubmitting}>
            Отмена
          </Button>
        )}
      </div>
    </form>
  );
};

const TaskForm = React.memo(TaskFormComponent);
export default TaskForm;
