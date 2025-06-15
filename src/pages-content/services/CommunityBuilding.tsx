import ServiceTemplate from './ServiceTemplate';
import { getServiceById } from '../../data/services';

const CommunityBuilding = () => {
  const service = getServiceById('community-building');
  
  if (!service) {
    return <div>Service not found</div>;
  }
  
  return <ServiceTemplate service={service} />;
};

export default CommunityBuilding;
