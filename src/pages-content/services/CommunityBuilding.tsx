import ServiceTemplate from './ServiceTemplate';
import { getServiceById } from '../../data/services';

interface CommunityBuildingProps {
  currentPath?: string;
}

const CommunityBuilding = ({ currentPath }: CommunityBuildingProps) => {
  const service = getServiceById('community-building');
  
  if (!service) {
    return <div>Service not found</div>;
  }
  
  return <ServiceTemplate service={service} currentPath={currentPath} />;
};

export default CommunityBuilding;
