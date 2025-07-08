import ServiceTemplate from './ServiceTemplate';
import { getServiceById } from '../../data/services';

interface BrandStrategyProps {
  currentPath?: string;
}

const BrandStrategy = ({ currentPath }: BrandStrategyProps) => {
  const service = getServiceById('brand-strategy');
  
  if (!service) {
    return <div>Service not found</div>;
  }
  
  return <ServiceTemplate service={service} currentPath={currentPath} />;
};

export default BrandStrategy;
