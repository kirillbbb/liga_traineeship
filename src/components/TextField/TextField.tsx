// src/components/TextField/TextField.tsx
import React from 'react';
import { TextFieldProps } from './TextField.types';
import './TextField.css';

export function TextField({
  label,
  placeholder,
  containerClassName = '',
  inputType = 'text',
  value,
  onChange,
  onBlur,
  errorText,
  multiline = false,
  rows = 3,
}: TextFieldProps) {
  const InputElement = multiline ? 'textarea' : 'input';

  const inputProps = multiline ? { rows } : { type: inputType };

  return (
    <div className={`mb-3 ${containerClassName}`}>
      <label htmlFor={label} className="form-label">
        {label}
      </label>
      <InputElement
        {...inputProps}
        className="form-control"
        id={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange as any}
        onBlur={onBlur as any}
      />
      {errorText && <div className="invalid">{errorText}</div>}
    </div>
  );
}
