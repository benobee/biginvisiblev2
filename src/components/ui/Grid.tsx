import { cn } from "../../lib/utils";

interface GridProps {
  children: React.ReactNode;
  columns?: number;
  gap?: 'small' | 'medium' | 'large';
  className?: string;
}

const Grid = ({
  children,
  columns = 12,
  gap = 'medium',
  className,
}: GridProps) => {
  const gapClasses = {
    small: 'gap-4',
    medium: 'gap-6',
    large: 'gap-8'
  };

  return (
    <div
      className={cn(
        'grid',
        `grid-cols-${columns}`,
        'md:grid-cols-4',
        gapClasses[gap],
        className
      )}
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`
      }}
    >
      {children}
    </div>
  );
};

export default Grid;
