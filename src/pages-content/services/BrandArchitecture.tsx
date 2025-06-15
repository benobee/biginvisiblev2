import ServiceTemplate from './ServiceTemplate';
import { getServiceById } from '../../data/services';

const BrandArchitecture = () => {
  const service = getServiceById('brand-architecture');
  
  if (!service) {
    return <div>Service not found</div>;
  }
  
  return <ServiceTemplate service={service} />;
};

export default BrandArchitecture;
