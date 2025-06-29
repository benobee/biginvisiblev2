import ServiceTemplate from './ServiceTemplate';
import { getServiceById } from '../../data/services';

const BrandStrategy = () => {
  const service = getServiceById('brand-strategy');
  
  if (!service) {
    return <div>Service not found</div>;
  }
  
  return <ServiceTemplate service={service} />;
};

export default BrandStrategy;
