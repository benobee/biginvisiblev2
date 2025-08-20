import { cn } from "../../lib/utils";

interface MasonryGridProps {
  children: React.ReactNode;
  columns?: {
    default: number;
    md?: number;
    lg?: number;
  };
  gap?: 'small' | 'medium' | 'large';
  className?: string;
}

const MasonryGrid = ({
  children,
  columns = { default: 1, md: 2, lg: 3 },
  gap = 'medium',
  className,
}: MasonryGridProps) => {
  const gapClasses = {
    small: 'gap-4',
    medium: 'gap-6', 
    large: 'gap-8',
  };

  // Create responsive grid classes
  const gridCols = {
    default: `grid-cols-${columns.default}`,
    md: columns.md ? `md:grid-cols-${columns.md}` : '',
    lg: columns.lg ? `lg:grid-cols-${columns.lg}` : '',
  };

  return (
    <div
      className={cn(
        'grid auto-rows-max items-start',
        gridCols.default,
        gridCols.md,
        gridCols.lg,
        gapClasses[gap],
        className
      )}
    >
      {children}
    </div>
  );
};

export default MasonryGrid;