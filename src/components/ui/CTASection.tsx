import Section from './Section';
import Button from './Button';

interface CTASectionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonTo: string;
  buttonVariant?: 'primary' | 'secondary' | 'outline' | 'text' | 'primaryInverse';
  className?: string;
}

const CTASection = ({
  title,
  description,
  buttonText,
  buttonTo,
  buttonVariant = 'secondary',
  className,
}: CTASectionProps) => {
  return (
    <Section background="accent" className={className}>
      <div className="text-center">
        <div className="max-w-8xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 reveal-text text-white">
            {title}
          </h2>
          <p className="mx-auto text-lg max-w-3xl md:text-xl mb-8 text-white/90 leading-relaxed reveal-text">
            {description}
          </p>
          <Button 
            to={buttonTo} 
            variant={buttonVariant}
            size="large"
            className="reveal-text"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </Section>
  );
};

export default CTASection;