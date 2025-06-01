import styled from 'styled-components';

interface SectionProps {
  children: React.ReactNode;
  background?: 'primary' | 'secondary' | 'accent' | 'light';
  spacing?: 'normal' | 'large' | 'small';
  className?: string;
}

const StyledSection = styled.section<{
  background?: 'primary' | 'secondary' | 'accent' | 'light';
  spacing?: 'normal' | 'large' | 'small';
}>`
  position: relative;
  
  ${({ background, theme }) => {
    switch (background) {
      case 'secondary':
        return `background-color: ${theme.colors.backgroundAlt};`;
      case 'accent':
        return `background-color: ${theme.colors.accent};`;
      case 'light':
        return `background-color: ${theme.colors.backgroundLight};`;
      default: // primary
        return `background-color: ${theme.colors.background};`;
    }
  }}
  
  ${({ spacing, theme }) => {
    switch (spacing) {
      case 'large':
        return `padding: calc(${theme.spacing.section} * 1.5) 0;`;
      case 'small':
        return `padding: calc(${theme.spacing.section} * 0.5) 0;`;
      default: // normal
        return `padding: ${theme.spacing.section} 0;`;
    }
  }}
`;

const Section = ({
  children,
  background = 'primary',
  spacing = 'normal',
  className,
}: SectionProps) => {
  return (
    <StyledSection
      background={background}
      spacing={spacing}
      className={className}
    >
      <div className="container">
        {children}
      </div>
    </StyledSection>
  );
};

export default Section;
