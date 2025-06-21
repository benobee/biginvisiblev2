import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Button.module.css';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  as?: React.ElementType;
  to?: string;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  as: Component = 'button',
  to,
  href,
  onClick,
  children,
  className,
  ...props
}: ButtonProps) => {
  // Build class names
  const classNames = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    className
  ].filter(Boolean).join(' ');

  // Handle Link component
  if (to) {
    return (
      <Link
        to={to}
        className={classNames}
        {...props}
      >
        {children}
      </Link>
    );
  }
  
  // Handle anchor element
  if (href) {
    return (
      <a
        href={href}
        className={classNames}
        {...props}
      >
        {children}
      </a>
    );
  }
  
  // Handle custom component or button
  return (
    <Component
      className={classNames}
      onClick={onClick}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;
