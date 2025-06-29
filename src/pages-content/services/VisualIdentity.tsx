import ServiceTemplate from './ServiceTemplate';
import { getServiceById } from '../../data/services';

const VisualIdentity = () => {
  const service = getServiceById('visual-identity');
  
  if (!service) {
    return <div>Service not found</div>;
  }
  
  return <ServiceTemplate service={service} />;
};

export default VisualIdentity;
