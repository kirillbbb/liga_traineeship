// src/components/TextField.tsx

import React, { InputHTMLAttributes } from 'react';
import { TextFieldProps } from './TextField.types';

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
}: // ... все остальные пропсы
TextFieldProps) {
  const InputElement = multiline ? 'textarea' : 'input';
  const inputProps = multiline ? { rows } : { type: inputType };

  // ✅ ИСПРАВЛЕНИЕ 1: Создание безопасного и уникального ID
  const uniqueId = `field-${label.replace(/\s/g, '-').toLowerCase()}`;

  return (
    <div className={`field mb-3 ${containerClassName}`}>
      {/* 2. Используем уникальный ID для связки */}
      <label htmlFor={uniqueId} className="field__label">
        {label}
      </label>

      <InputElement
        {...inputProps}
        className="field__input"
        id={uniqueId} // ✅ ID теперь уникальный
        // ✅ КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ 2: Плейсхолдер для анимации
        placeholder=" "
        value={value}
        // Убрано "as any", если в TextFieldProps верные типы
        onChange={onChange}
        onBlur={onBlur}
      />

      {errorText && <div className="invalid">{errorText}</div>}
    </div>
  );
}
