import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { services, type Service } from '../../data/services';

const SidebarContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 280px;
  height: 100vh;
  background: #FFFFFF;
  border-right: 1px solid #E2E8F0;
  padding: 80px 20px 20px 20px;
  overflow-y: auto;
  z-index: 100;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    display: none;
  }
  
  h3 {
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    color: #0F1923;
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`;

const ServiceItem = styled(Link)<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  border-radius: 8px;
  transition: all ${({ theme }) => theme.transitions.default};
  text-decoration: none;
  color: #4A5568;
  position: relative;
  min-height: 44px;
  background-color: ${({ $isActive }) => 
    $isActive ? 'rgba(255, 58, 70, 0.1)' : 'transparent'};
  border-left: ${({ $isActive, theme }) => 
    $isActive ? `3px solid ${theme.colors.accent}` : '3px solid transparent'};
  
  &:hover {
    background-color: ${({ $isActive }) => 
      $isActive ? 'rgba(255, 58, 70, 0.15)' : 'rgba(0, 0, 0, 0.05)'};
    transform: translateX(2px);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
  
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    margin-right: ${({ theme }) => theme.spacing.sm};
    flex-shrink: 0;
    
    svg {
      width: 16px;
      height: 16px;
      color: ${({ $isActive, theme }) => 
        $isActive ? theme.colors.accent : '#6B7280'};
    }
  }
  
  .title {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    font-weight: ${({ $isActive, theme }) => 
      $isActive ? theme.typography.fontWeight.semibold : theme.typography.fontWeight.medium};
    line-height: 1.3;
    color: ${({ $isActive, theme }) => 
      $isActive ? theme.colors.accent : '#374151'};
    display: flex;
    align-items: center;
  }
`;

const SidebarBrand = styled.div`
  padding: 0 ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid #E2E8F0;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  h2 {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    color: #0F1923;
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    margin: 0;
  }
  
  p {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: #6B7280;
    margin: 4px 0 0 0;
  }
`;

interface ServiceSidebarProps {
  currentServiceId: string;
}

const ServiceSidebar: React.FC<ServiceSidebarProps> = ({ currentServiceId }) => {
  const location = useLocation();
  
  // Use services in their original order - no reordering based on current service
  const allServices = services;
  
  return (
    <SidebarContainer>
      <SidebarBrand>
        <h2>BigInvisible</h2>
        <p>Services</p>
      </SidebarBrand>
      
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
