import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  isLoading = false,
  disabled,
  ...rest
}) => {
  const baseStyle = {
    padding: '10px 15px',
    border: 'none',
    cursor: 'pointer',
    opacity: disabled || isLoading ? 0.5 : 1,
    marginRight: '10px',
  };

  const style = {
    ...baseStyle,
    backgroundColor: variant === 'primary' ? 'blue' : 'lightgray',
    color: variant === 'primary' ? 'white' : 'black',
  };

  return (
    <button style={style} disabled={disabled || isLoading} {...rest}>
      {isLoading ? 'Загрузка...' : children}
    </button>
  );
};
