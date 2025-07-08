import ServiceTemplate from './ServiceTemplate';
import { getServiceById } from '../../data/services';

interface ContentStrategyProps {
  currentPath?: string;
}

const ContentStrategy = ({ currentPath }: ContentStrategyProps) => {
  const service = getServiceById('content-strategy');
  
  if (!service) {
    return <div>Service not found</div>;
  }
  
  return <ServiceTemplate service={service} currentPath={currentPath} />;
};

export default ContentStrategy;
