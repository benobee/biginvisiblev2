interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

const SectionHeader = ({
  title,
  subtitle,
  description,
  align = 'left',
  className,
}: SectionHeaderProps) => {
  const getAlignmentClasses = () => {
    switch (align) {
      case 'center':
        return 'mx-auto';
      case 'right':
        return 'text-right ml-auto';
      default:
        return 'text-left';
    }
  };

  const getDescriptionClasses = () => {
    return align === 'center' 
      ? 'text-lg lg:text-xl opacity-80 leading-relaxed mx-auto text-left'
      : 'text-lg lg:text-xl opacity-80 leading-relaxed text-left';
  };

  return (
    <div className={`mb-24 ${getAlignmentClasses()} ${className || ''}`}>
      {subtitle && (
        <div className="reveal-text text-sm uppercase tracking-widest text-accent mb-4">
          {subtitle}
        </div>
      )}
      <h2 className="reveal-text text-3xl md:text-3xl lg:text-5xl mb-8 font-bold leading-tight">
        {title}
      </h2>
      {description && (
        <p className={`reveal-text ${getDescriptionClasses()}`}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
