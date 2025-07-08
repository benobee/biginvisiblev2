import ServiceTemplate from './ServiceTemplate';
import { getServiceById } from '../../data/services';

interface BrandArchitectureProps {
  currentPath?: string;
}

const BrandArchitecture = ({ currentPath }: BrandArchitectureProps) => {
  const service = getServiceById('brand-architecture');
  
  if (!service) {
    return <div>Service not found</div>;
  }
  
  return <ServiceTemplate service={service} currentPath={currentPath} />;
};

export default BrandArchitecture;
