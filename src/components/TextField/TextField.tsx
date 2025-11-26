import React, { InputHTMLAttributes } from 'react';
import { TextFieldProps } from './TextField.types';
import './TextField.css';

export function TextField({
  label,
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
    <div className={`field mb-3 ${containerClassName}`}>
      <label htmlFor={label} className="field__label">
        {label}
      </label>

      <InputElement
        {...inputProps}
        className="field__input"
        id={label}
        placeholder=" "
        value={value}
        onChange={onChange as any}
        onBlur={onBlur as any}
      />
      {errorText && <div className="invalid">{errorText}</div>}
    </div>
  );
}
