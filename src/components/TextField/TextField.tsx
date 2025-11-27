import React, { InputHTMLAttributes, CSSProperties } from 'react';

interface CustomTextFieldProps {
  label: string;
  containerClassName?: string;
  inputType?: InputHTMLAttributes<HTMLInputElement>['type'];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  errorText?: string;
  multiline?: boolean;
  rows?: number;
  disabled?: boolean;
  inputStyle?: CSSProperties;
  placeholder?: string;
}

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
  disabled = false,
  inputStyle = {},
  placeholder,
}: CustomTextFieldProps) {
  const InputElement = multiline ? 'textarea' : 'input';

  const inputProps = {
    ...(multiline ? { rows } : { type: inputType }),
    style: inputStyle,
    disabled: disabled,
  };

  const uniqueId = `field-${label.replace(/\s/g, '-').toLowerCase()}`;

  const finalPlaceholder = placeholder || ' ';

  return (
    <div className={`field mb-3 ${containerClassName}`}>
      <label htmlFor={uniqueId} className="field__label">
        {label}
      </label>

      <InputElement
        {...inputProps}
        className="field__input"
        id={uniqueId}
        placeholder={finalPlaceholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />

      {errorText && <div className="invalid">{errorText}</div>}
    </div>
  );
}
