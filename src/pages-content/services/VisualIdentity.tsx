import ServiceTemplate from './ServiceTemplate';
import { getServiceById } from '../../data/services';

interface VisualIdentityProps {
  currentPath?: string;
}

const VisualIdentity = ({ currentPath }: VisualIdentityProps) => {
  const service = getServiceById('visual-identity');
  
  if (!service) {
    return <div>Service not found</div>;
  }
  
  return <ServiceTemplate service={service} currentPath={currentPath} />;
};

export default VisualIdentity;
