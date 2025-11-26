import { InputHTMLAttributes, TextareaHTMLAttributes, ChangeEventHandler, FocusEventHandler } from 'react';

// 1. Определяем базовый интерфейс для наших кастомных пропсов
interface BaseTextFieldProps {
  label: string;
  containerClassName?: string;
  errorText?: string;
  multiline?: boolean;
  rows?: number;
  inputType?: string;
}

// 2. Создаем объединенный тип для стандартных HTML-атрибутов, исключая конфликтующие пропсы
type StandardInputAttributes =
  // Объединяем атрибуты Input и Textarea
  InputHTMLAttributes<HTMLInputElement> & TextareaHTMLAttributes<HTMLTextAreaElement>;

// 3. Создаем универсальный тип для Event Handlers
type UniversalChangeHandler = ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
type UniversalFocusHandler = FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;

// 4. Окончательный интерфейс TextFieldProps
export interface TextFieldProps
  extends BaseTextFieldProps,
    Omit<StandardInputAttributes, 'type' | 'rows' | 'value' | 'onChange' | 'onBlur'> {
  // Переопределяем наши пропсы, используя универсальный обработчик
  value?: string | number | readonly string[];
  onChange?: UniversalChangeHandler;
  onBlur?: UniversalFocusHandler;

  // Примечание: 'type', 'rows', 'multiline' уже есть в BaseTextFieldProps.
}
