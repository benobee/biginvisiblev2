import ServiceTemplate from './ServiceTemplate';
import { getServiceById } from '../../data/services';

interface DigitalExperienceProps {
  currentPath?: string;
}

const DigitalExperience = ({ currentPath }: DigitalExperienceProps) => {
  const service = getServiceById('digital-experience');
  
  if (!service) {
    return <div>Service not found</div>;
  }
  
  return <ServiceTemplate service={service} currentPath={currentPath} />;
};

export default DigitalExperience;
