import { cn } from "../../lib/utils";

interface MasonryItemProps {
  children: React.ReactNode;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const MasonryItem = ({
  children,
  className,
  size = 'medium',
}: MasonryItemProps) => {
  const sizeClasses = {
    small: 'row-span-3',
    medium: 'row-span-4', 
    large: 'row-span-6',
  };

  return (
    <div
      className={cn(
        'w-full',
        sizeClasses[size],
        className
      )}
    >
      {children}
    </div>
  );
};

export default MasonryItem;