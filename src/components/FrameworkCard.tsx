import type { ReactNode } from 'react';
import Card from './ui/Card';

interface FrameworkCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FrameworkCard = ({ icon, title, description }: FrameworkCardProps) => {
  return (
    <Card 
      variant="default" 
      padding="none" 
      className={`reveal-text`}
    >
      {icon}
      <h3 className="text-xl mb-4 text-dark">{title}</h3>
      <p className="opacity-80 leading-relaxed text-dark">{description}</p>
    </Card>
  );
};

export default FrameworkCard;