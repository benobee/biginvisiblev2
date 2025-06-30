import Card from './ui/Card';

interface FunFactCardProps {
  fact: string;
  className?: string;
}

const FunFactCard = ({ fact, className }: FunFactCardProps) => {
  return (
    <Card variant="default" padding="medium" className={`reveal-text bg-white border-l-4 border-accent ${className || ''}`}>
      <div className="text-sm opacity-80 italic text-dark">{fact}</div>
    </Card>
  );
};

export default FunFactCard;