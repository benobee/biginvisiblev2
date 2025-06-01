import styled from 'styled-components';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

const StyledSectionHeader = styled.div<{ align?: 'left' | 'center' | 'right' }>`
  margin-bottom: ${({ theme }) => theme.spacing.section};
  max-width: ${({ align }) => align === 'center' ? '800px' : '100%'};
  margin-left: ${({ align }) => align === 'center' ? 'auto' : '0'};
  margin-right: ${({ align }) => align === 'center' ? 'auto' : '0'};
  text-align: ${({ align }) => align || 'left'};
  
  .section-title {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: ${({ theme }) => theme.colors.accent};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  h2 {
    font-size: clamp(2rem, 4vw, ${({ theme }) => theme.typography.fontSize['4xl']});
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    line-height: 1.1;
  }
  
  .description {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    opacity: 0.8;
    line-height: 1.6;
    max-width: ${({ align }) => align === 'center' ? '700px' : '100%'};
    margin-left: ${({ align }) => align === 'center' ? 'auto' : '0'};
    margin-right: ${({ align }) => align === 'center' ? 'auto' : '0'};
  }
`;

const SectionHeader = ({
  title,
  subtitle,
  description,
  align = 'left',
  className,
}: SectionHeaderProps) => {
  return (
    <StyledSectionHeader align={align} className={className}>
      {subtitle && <div className="section-title reveal-text">{subtitle}</div>}
      <h2 className="reveal-text">{title}</h2>
      {description && <p className="description reveal-text">{description}</p>}
    </StyledSectionHeader>
  );
};

export default SectionHeader;
