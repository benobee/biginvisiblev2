import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { getOtherServices, getServiceById, type Service } from '../../data/services';

const SidebarContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: ${({ theme }) => theme.spacing.lg};
  height: fit-content;
  position: sticky;
  top: 140px;
  
  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    color: ${({ theme }) => theme.colors.text};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }
`;

const ServiceItem = styled(Link)<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  border: 1px solid ${({ $isActive, theme }) => 
    $isActive ? theme.colors.accent : 'transparent'};
  background-color: ${({ $isActive }) => 
    $isActive ? 'rgba(255, 58, 70, 0.1)' : 'transparent'};
  border-radius: 4px;
  transition: all ${({ theme }) => theme.transitions.default};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  position: relative;
  min-height: 40px;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    background-color: rgba(255, 255, 255, 0.05);
    transform: translateX(3px);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
  
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    margin-right: ${({ theme }) => theme.spacing.md};
    flex-shrink: 0;
    margin-bottom:0;
    
    svg {
      width: 18px;
      height: 18px;
      color: ${({ $isActive, theme }) => 
        $isActive ? theme.colors.accent : theme.colors.text};
    }
  }
  
  .title {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    font-weight: ${({ $isActive, theme }) => 
      $isActive ? theme.typography.fontWeight.semibold : theme.typography.fontWeight.medium};
    line-height: 1.2;
    color: ${({ $isActive, theme }) => 
      $isActive ? theme.colors.accent : theme.colors.text};
    display: flex;
    align-items: center;
  }
  
  ${({ $isActive }) => $isActive && `
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background-color: currentColor;
    }
  `}
`;

interface ServiceSidebarProps {
  currentServiceId: string;
}

const ServiceSidebar: React.FC<ServiceSidebarProps> = ({ currentServiceId }) => {
  const location = useLocation();
  const otherServices = getOtherServices(currentServiceId);
  const currentService = getServiceById(currentServiceId);
  
  // Combine current service with other services for full navigation
  const allServices = currentService ? [currentService, ...otherServices] : otherServices;
  
  return (
    <SidebarContainer className="reveal-text">
      <h3>All Services</h3>
      {allServices.map((service: Service) => {
        const IconComponent = service.icon;
        const isActive = location.pathname === `/services/${service.id}`;
        
        return (
          <ServiceItem 
            key={service.id} 
            to={`/services/${service.id}`}
            $isActive={isActive}
          >
            <div className="icon">
              <IconComponent />
            </div>
            <div className="title">{service.title}</div>
          </ServiceItem>
        );
      })}
    </SidebarContainer>
  );
};

export default ServiceSidebar;
