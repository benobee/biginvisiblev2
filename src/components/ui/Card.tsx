import styled from 'styled-components';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'hover' | 'outline';
  padding?: 'small' | 'medium' | 'large';
  className?: string;
}

const StyledCard = styled.div<{
  variant?: 'default' | 'hover' | 'outline';
  padding?: 'small' | 'medium' | 'large';
}>`
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  ${({ variant, theme }) => {
    switch (variant) {
      case 'hover':
        return `
          transition: all ${theme.transitions.default};
          
          &:hover {
            border-color: ${theme.colors.accent};
            transform: translateY(-5px);
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          border: 1px solid rgba(255, 255, 255, 0.2);
        `;
      default:
        return '';
    }
  }}
  
  ${({ padding, theme }) => {
    switch (padding) {
      case 'small':
        return `padding: ${theme.spacing.md};`;
      case 'large':
        return `padding: ${theme.spacing['2xl']};`;
      default: // medium
        return `padding: ${theme.spacing.xl};`;
    }
  }}
`;

const Card = ({
  children,
  variant = 'default',
  padding = 'medium',
  className,
}: CardProps) => {
  return (
    <StyledCard
      variant={variant}
      padding={padding}
      className={className}
    >
      {children}
    </StyledCard>
  );
};

export default Card;
