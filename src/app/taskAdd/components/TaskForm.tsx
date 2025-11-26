import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from 'components/Button/Button';
import { taskValidationSchema, TaskFormValues } from 'app/taskAdd/validation';
import { Checkbox } from 'components/Checkbox';
import { TextField } from 'components/TextField';

type FormData = TaskFormValues;

interface Props {
  initialData?: TaskFormValues;
  onSubmit: (data: FormData) => void;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

const TaskFormComponent: React.FC<Props> = ({ onSubmit, initialData, onCancel, isSubmitting = false }) => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<TaskFormValues>({
    defaultValues: {
      title: initialData?.title ?? '',
      description: initialData?.description ?? '',
      isCompleted: initialData?.isCompleted ?? false,
      isImportant: initialData?.isImportant ?? false,
    },
    resolver: yupResolver(taskValidationSchema),
  });

  const isCompleted = watch('isCompleted');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Название задачи"
            placeholder="Что нужно сделать?"
            errorText={errors.title?.message}
            disabled={isSubmitting}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Описание"
            placeholder="Подробности (необязательно)"
            multiline
            rows={3}
            errorText={errors.description?.message}
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
              checked={rhfValue}
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
              checked={rhfValue}
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
