import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { taskSchema } from 'app/taskAdd/validation';
import { CreateTaskDto, Task } from 'types/task';
import { Checkbox } from 'components/Checkbox';
import { TextField } from 'components/TextField';

interface Props {
  onSubmit: (data: CreateTaskDto) => void;
  defaultValues?: Task;
  isEdit?: boolean;
  onCancel?: () => void;
}

const TaskFormComponent: React.FC<Props> = ({ onSubmit, defaultValues, onCancel }) => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<CreateTaskDto>({
    defaultValues: defaultValues || {
      title: '',
      description: '',
      isCompleted: false,
      isImportant: false,
    },
    resolver: yupResolver(taskSchema),
  });

  const isCompleted = watch('isCompleted');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Title" placeholder="Enter task title" errorText={errors.title?.message} />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Description"
            placeholder="Enter task description"
            multiline={true}
            errorText={errors.description?.message}
          />
        )}
      />

      <Controller
        name="isCompleted"
        control={control}
        render={({ field }) => (
          <Checkbox
            label="Completed"
            checked={field.value}
            onChange={(e) => field.onChange(e.target.checked)}
            onBlur={field.onBlur}
          />
        )}
      />

      <Controller
        name="isImportant"
        control={control}
        render={({ field }) => (
          <Checkbox
            label="Important"
            checked={field.value}
            onChange={(e) => field.onChange(e.target.checked)}
            onBlur={field.onBlur}
            disabled={isCompleted}
          />
        )}
      />

      <div className="d-flex justify-content-between mt-3">
        <button className="btn btn-primary" type="submit">
          {defaultValues ? 'Save Changes' : 'Add Task'}
        </button>

        {onCancel && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

const TaskForm = React.memo(TaskFormComponent);
export default TaskForm;
