import { cn } from "../../lib/utils";

interface GridProps {
  children: React.ReactNode;
  columns?: number;
  gap?: 'small' | 'medium' | 'large' | 'xl' | 'xxl';
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
    large: 'gap-12',
    xl: 'gap-24',
    xxl: 'gap-48',
  };

  // Create a custom style for responsive grid columns
  const gridStyle = `
    @media (max-width: 767px) {
      .responsive-grid-${columns} {
        grid-template-columns: repeat(1, minmax(0, 1fr));
      }
    }
    @media (min-width: 768px) {
      .responsive-grid-${columns} {
        grid-template-columns: repeat(${columns}, minmax(0, 1fr));
      }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: gridStyle }} />
      <div
        className={cn(
          'grid',
          `responsive-grid-${columns}`,
          gapClasses[gap],
          className
        )}
      >
        {children}
      </div>
    </>
  );
};

export default Grid;