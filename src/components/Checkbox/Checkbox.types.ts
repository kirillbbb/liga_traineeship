import { ChangeEventHandler, FocusEventHandler } from 'react';

export interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  containerClassName?: string;
  disabled?: boolean;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}
