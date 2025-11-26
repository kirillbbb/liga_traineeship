import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface BaseTextFieldProps {
  label: string;
  containerClassName?: string;
  errorText?: string;
  multiline?: boolean;
  rows?: number;
  inputType?: string;
}

export interface TextFieldProps extends BaseTextFieldProps, InputHTMLAttributes<HTMLInputElement> {}
