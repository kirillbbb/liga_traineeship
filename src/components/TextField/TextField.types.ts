import { InputHTMLAttributes, TextareaHTMLAttributes, ChangeEventHandler, FocusEventHandler } from 'react';

interface BaseTextFieldProps {
  label: string;
  containerClassName?: string;
  errorText?: string;
  multiline?: boolean;
  rows?: number;
  inputType?: string;
}

type StandardInputAttributes =
  InputHTMLAttributes<HTMLInputElement> & TextareaHTMLAttributes<HTMLTextAreaElement>;

type UniversalChangeHandler = ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
type UniversalFocusHandler = FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;

export interface TextFieldProps
  extends BaseTextFieldProps,
    Omit<StandardInputAttributes, 'type' | 'rows' | 'value' | 'onChange' | 'onBlur'> {
  value?: string | number | readonly string[];
  onChange?: UniversalChangeHandler;
  onBlur?: UniversalFocusHandler;

}
