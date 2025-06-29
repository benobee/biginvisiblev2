import { cn } from "../../lib/utils";

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
  return (
    <div
      className={cn(
        "md:col-span-full",
        className
      )}
      style={{
        gridColumn: start ? `${start} / span ${span}` : `span ${span}`
      }}
    >
      {children}
    </div>
  );
};

export default GridItem;
