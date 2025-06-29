import ServiceTemplate from './ServiceTemplate';
import { getServiceById } from '../../data/services';

const ContentStrategy = () => {
  const service = getServiceById('content-strategy');
  
  if (!service) {
    return <div>Service not found</div>;
  }
  
  return <ServiceTemplate service={service} />;
};

export default ContentStrategy;
