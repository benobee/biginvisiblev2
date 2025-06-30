import Card from './ui/Card';

interface ValueCardProps {
  title: string;
  description: string;
  className?: string;
}

const ValueCard = ({ title, description, className }: ValueCardProps) => {
  return (
    <Card variant="default" padding="none" className={`reveal-text bg-white border-gray-200 text-left ${className || ''}`}>
      <h3 className="text-xl mb-4 text-accent">{title}</h3>
      <p className="opacity-80 leading-relaxed text-dark">{description}</p>
    </Card>
  );
};

export default ValueCard;