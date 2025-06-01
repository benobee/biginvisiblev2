import styled from 'styled-components';

interface GridProps {
  children: React.ReactNode;
  columns?: number;
  gap?: 'small' | 'medium' | 'large';
  className?: string;
}

const StyledGrid = styled.div<{
  columns?: number;
  gap?: 'small' | 'medium' | 'large';
}>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns || 12}, 1fr);
  
  ${({ gap, theme }) => {
    switch (gap) {
      case 'small':
        return `gap: ${theme.spacing.md};`;
      case 'large':
        return `gap: ${theme.spacing['2xl']};`;
      default: // medium
        return `gap: ${theme.spacing.xl};`;
    }
  }}
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Grid = ({
  children,
  columns = 12,
  gap = 'medium',
  className,
}: GridProps) => {
  return (
    <StyledGrid
      columns={columns}
      gap={gap}
      className={className}
    >
      {children}
    </StyledGrid>
  );
};

export default Grid;
