interface SectionProps {
  children: React.ReactNode;
  background?: 'primary' | 'secondary' | 'accent' | 'light';
  spacing?: 'normal' | 'large' | 'small';
  className?: string;
  id?: string;
}

const getSectionClasses = (background: string, spacing: string) => {
  const backgroundClasses = {
    primary: 'bg-white',
    secondary: 'bg-gray-100',
    accent: 'bg-accent',
    light: 'bg-gray-light'
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
