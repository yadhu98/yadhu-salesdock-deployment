import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'lang-active' | 'lang-inactive';
  positioned?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  positioned = false,
  children,
  className = '',
  style,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return { backgroundColor: 'transparent', color: '#26b7c9', border: 'none' };
      case 'lang-active':
        return { backgroundColor: '#26b7c9', color: '#ffffff', border: 'none' };
      case 'lang-inactive':
        return { backgroundColor: '#ffffff', color: '#333333', border: '1px solid #cccccc' };
      case 'primary':
    default:
        return { backgroundColor: '#26b7c9', color: '#ffffff', border: 'none' };
    }
  };

  const baseStyles: React.CSSProperties = {
    minWidth: '85px', 
    height: '40px',
    paddingLeft: '16px',
    paddingRight: '16px',
    gap: '10px',
    opacity: 1,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    borderRadius: '0px', 
    fontSize: '0.875rem',
    transition: 'opacity 0.15s ease-in-out, background-color 0.15s ease-in-out',
    ...(positioned ? {
      position: 'absolute',
      top: '80px',
      left: '150px',
      transform: 'rotate(0deg)'
    } : {}),

    ...getVariantStyles(),
    ...style 
 };

  return (
    <button 
      className={`custom-global-btn ${className}`} 
      style={baseStyles} 
      {...props}
    >
      {children}
    </button>
  );
};