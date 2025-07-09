import { cn } from "../../lib/utils";
import { useId } from "react";

interface GridItemProps {
  children: React.ReactNode;
  span?: number;
  start?: number;
  className?: string;
}

const GridItem = ({
  children,
  span = 1,
  start,
  className,
}: GridItemProps) => {
  const id = useId();
  const uniqueClass = `grid-item-${id.replace(/:/g, '-')}`;

  // Create responsive styles for this specific grid item
  const responsiveStyle = `
    .${uniqueClass} {
      grid-column: span 1;
    }
    @media (min-width: 768px) {
      .${uniqueClass} {
        grid-column: ${start ? `${start} / span ${span}` : `span ${span}`};
      }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: responsiveStyle }} />
      <div className={cn(uniqueClass, className)}>
        {children}
      </div>
    </>
  );
};

export default GridItem;