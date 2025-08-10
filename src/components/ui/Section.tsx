import React from 'react';
import { themeClasses } from '../../utils/theme';

interface SectionProps {
  children: React.ReactNode;
  background?: 'primary' | 'secondary' | 'accent' | 'light';
  spacing?: 'normal' | 'large' | 'small';
  className?: string;
  id?: string;
}

const getSectionClasses = (background: string, spacing: string) => {
  const backgroundClasses = {
    primary: themeClasses.bg.primary, // bg-bg-primary -> uses CSS variables
    secondary: themeClasses.bg.alt,   // bg-bg-alt
    accent: themeClasses.bg.accent,   // bg-accent
    light: themeClasses.bg.light      // bg-bg-light
  };
  
  const spacingClasses = {
    large: 'py-36',
    small: 'py-12',
    normal: 'py-24'
  };
  
  return `relative ${backgroundClasses[background as keyof typeof backgroundClasses]} ${spacingClasses[spacing as keyof typeof spacingClasses]}`;
};

const Section = ({
  children,
  background = 'primary',
  spacing = 'normal',
  className,
  id,
}: SectionProps) => {
  const sectionClasses = `${getSectionClasses(background, spacing)} ${className || ''}`;
  
  return (
    <section className={sectionClasses} id={id}>
      <div className="section-container">
        {children}
      </div>
    </section>
  );
};

export default Section;
