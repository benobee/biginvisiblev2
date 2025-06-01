import styled from 'styled-components';

interface GridItemProps {
  children: React.ReactNode;
  span?: number;
  start?: number;
  className?: string;
}

const StyledGridItem = styled.div<{
  span?: number;
  start?: number;
}>`
  grid-column: ${({ start, span }) => 
    start ? `${start} / span ${span || 1}` : `span ${span || 1}`};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-column: 1 / -1;
  }
`;

const GridItem = ({
  children,
  span = 1,
  start,
  className,
}: GridItemProps) => {
  return (
    <StyledGridItem
      span={span}
      start={start}
      className={className}
    >
      {children}
    </StyledGridItem>
  );
};

export default GridItem;
