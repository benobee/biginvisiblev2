type Padding = 'none' | 'small' | 'medium' | 'large';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'hover' | 'outline';
  padding?: Padding;
  className?: string;
}

const getCardClasses = (variant: string, padding: Padding) => {
  const baseClasses = 'bg-white/5 border rounded-lg';
  
  const variantClasses = {
    default: 'border-white/10',
    hover: 'border-white/10 transition-all duration-300 hover:border-accent hover:-translate-y-1',
    outline: 'bg-transparent shadow-md'
  };
  
  const paddingClasses = {
    small: 'p-4',
    medium: 'p-8',
    large: 'p-12'
  };
  
  return `${baseClasses} ${variantClasses[variant as keyof typeof variantClasses]} ${padding !== 'none' && paddingClasses[padding as keyof typeof paddingClasses]}`;
};

const Card = ({
  children,
  variant = 'default',
  padding = 'medium',
  className,
}: CardProps) => {
  const cardClasses = `${getCardClasses(variant, padding)} ${className || ''}`;
  
  return (
    <div className={cardClasses}>
      {children}
    </div>
  );
};

export default Card;
