import ServiceTemplate from './ServiceTemplate';
import { getServiceById } from '../../data/services';

const DigitalExperience = () => {
  const service = getServiceById('digital-experience');
  
  if (!service) {
    return <div>Service not found</div>;
  }
  
  return <ServiceTemplate service={service} />;
};

export default DigitalExperience;
