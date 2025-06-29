import { Link } from 'react-router-dom';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'primaryInverse';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  as?: React.ElementType; // 'button' | 'a' | 'Link'
  to?: string;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const getButtonClasses = (variant: string, size: string, fullWidth: boolean) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium uppercase tracking-wider rounded-md transition-all duration-300 cursor-pointer no-underline';
  
  const sizeClasses = {
    small: 'px-4 py-2 text-xs',
    large: 'px-8 py-4 text-lg',
    medium: 'px-6 py-3 text-sm'
  };
  
  const variantClasses = {
    primary: 'bg-accent text-white border border-accent hover:bg-transparent hover:text-accent',
    primaryInverse: 'bg-white text-accent border border-white hover:bg-accent hover:text-white',
    secondary: 'bg-backgroundAlt border',
    outline: 'bg-transparent text-accent border border-accent hover:bg-accent hover:text-white',
    text: 'bg-transparent text-white px-0 py-0 border-none hover:text-accent'
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return `${baseClasses} ${sizeClasses[size as keyof typeof sizeClasses]} ${variantClasses[variant as keyof typeof variantClasses]} ${widthClass}`.trim();
};

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
  const buttonClasses = `${getButtonClasses(variant, size, fullWidth)} ${className || ''}`;
  
  if (to) {
    return (
      <Link
        to={to}
        className={buttonClasses}
        {...props}
      >
        {children}
      </Link>
    );
  }
  
  if (href) {
    return (
      <a
        href={href}
        className={buttonClasses}
        {...props}
      >
        {children}
      </a>
    );
  }
  
  return (
    <Component
      onClick={onClick}
      className={buttonClasses}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;
