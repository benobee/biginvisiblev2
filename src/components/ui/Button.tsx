import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  as?: any;
  to?: string;
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const ButtonStyles = css<{
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: all ${({ theme }) => theme.transitions.default};
  cursor: pointer;
  text-decoration: none;
  
  ${({ fullWidth }) => fullWidth && `
    width: 100%;
  `}
  
  ${({ size, theme }) => {
    switch (size) {
      case 'small':
        return `
          padding: ${theme.spacing.xs} ${theme.spacing.md};
          font-size: ${theme.typography.fontSize.xs};
        `;
      case 'large':
        return `
          padding: ${theme.spacing.lg} ${theme.spacing['2xl']};
          font-size: ${theme.typography.fontSize.lg};
        `;
      default: // medium
        return `
          padding: ${theme.spacing.md} ${theme.spacing.xl};
          font-size: ${theme.typography.fontSize.sm};
        `;
    }
  }}
  
  ${({ variant, theme }) => {
    switch (variant) {
      case 'secondary':
        return `
          background-color: ${theme.colors.backgroundAlt};
          color: ${theme.colors.text};
          border: 1px solid rgba(255, 255, 255, 0.2);
          
          &:hover {
            border-color: ${theme.colors.text};
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: ${theme.colors.accent};
          border: 1px solid ${theme.colors.accent};
          
          &:hover {
            background-color: ${theme.colors.accent};
            color: ${theme.colors.background};
          }
        `;
      case 'text':
        return `
          background-color: transparent;
          color: ${theme.colors.text};
          padding-left: 0;
          padding-right: 0;
          border: none;
          
          &:hover {
            color: ${theme.colors.accent};
          }
        `;
      default: // primary
        return `
          background-color: ${theme.colors.accent};
          color: ${theme.colors.text};
          border: 1px solid ${theme.colors.accent};
          
          &:hover {
            background-color: transparent;
            color: ${theme.colors.accent};
          }
        `;
    }
  }}
`;

const StyledButton = styled.button`
  ${ButtonStyles}
`;

const StyledLink = styled(Link)`
  ${ButtonStyles}
`;

const StyledAnchor = styled.a`
  ${ButtonStyles}
`;

const Button = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  as,
  to,
  href,
  onClick,
  children,
  className,
  ...props
}: ButtonProps) => {
  if (to) {
    return (
      <StyledLink
        to={to}
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        className={className}
        {...props}
      >
        {children}
      </StyledLink>
    );
  }
  
  if (href) {
    return (
      <StyledAnchor
        href={href}
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        className={className}
        {...props}
      >
        {children}
      </StyledAnchor>
    );
  }
  
  return (
    <StyledButton
      as={as}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
