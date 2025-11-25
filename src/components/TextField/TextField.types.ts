// src/components/TextField/TextField.types.ts
import { ChangeEventHandler, HTMLInputTypeAttribute, FocusEventHandler } from 'react';

export interface TextFieldProps {
  label: string;
  placeholder?: string;
  inputType?: HTMLInputTypeAttribute;
  containerClassName?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  errorText?: string;
  multiline?: boolean;
  rows?: number;
}
