import React from 'react';
import { CheckboxProps } from './Checkbox.types';

export function Checkbox({ label, checked, onChange, disabled, containerClassName = '', onBlur }: CheckboxProps) {
  return (
    <div className={`form-check mb-3 ${containerClassName}`}>
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        id={label}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        onBlur={onBlur}
      />
      <label className="form-check-label" htmlFor={label}>
        {label}
      </label>
    </div>
  );
}
