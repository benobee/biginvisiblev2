import Card from './ui/Card';

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  image: string;
  className?: string;
}

const TeamMember = ({ name, role, bio, image, className }: TeamMemberProps) => {
  return (
    <Card variant="default" padding="medium" className={`reveal-text text-center bg-white border-gray-200 ${className || ''}`}>
      <div className="w-full aspect-square bg-gray-100 mb-6 overflow-hidden rounded-xl group">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
        />
      </div>
      <h3 className="text-xl mb-2 text-dark">{name}</h3>
      <div className="text-sm text-accent mb-4">{role}</div>
      <p className="text-sm opacity-80 leading-relaxed text-dark">{bio}</p>
    </Card>
  );
};

export default TeamMember;