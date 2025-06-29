import { Link, useLocation } from 'react-router-dom';
import { services, type Service } from '../../data/services';

interface ServiceSidebarProps {
  currentServiceId: string;
}

const ServiceSidebar: React.FC<ServiceSidebarProps> = () => {
  const location = useLocation();
  
  // Use services in their original order - no reordering based on current service
  const allServices = services;
  
  return (
    <div className="fixed left-0 top-0 w-[280px] h-screen bg-white border-r border-[#E2E8F0] pt-20 px-5 pb-5 overflow-y-auto z-[100] shadow-[2px_0_10px_rgba(0,0,0,0.1)] hidden md:block">
      <div className="px-4 pb-8 border-b border-[#E2E8F0] mb-8">
        <h2 className="text-xl text-[#0F1923] font-bold m-0">BigInvisible</h2>
        <p className="text-sm text-[#6B7280] mt-1 mb-0">Services</p>
      </div>
      
      <h3 className="text-lg mb-6 text-[#0F1923] font-bold px-4">All Services</h3>
      {allServices.map((service: Service) => {
        const IconComponent = service.icon;
        const isActive = location.pathname === `/services/${service.id}`;
        
        return (
          <Link 
            key={service.id} 
            to={`/services/${service.id}`}
            className={`flex items-center py-2 px-4 mb-1 rounded-lg transition-all duration-300 no-underline text-[#4A5568] relative min-h-[44px] border-l-[3px] hover:translate-x-0.5 last:mb-0 ${
              isActive 
                ? 'bg-[rgba(255,58,70,0.1)] border-l-[#ff2356] hover:bg-[rgba(255,58,70,0.15)]' 
                : 'bg-transparent border-l-transparent hover:bg-black/5'
            }`}
          >
            <div className={`flex items-center justify-center w-5 h-5 mr-2 flex-shrink-0 ${isActive ? 'text-[#ff2356]' : 'text-[#6B7280]'} [&>svg]:w-4 [&>svg]:h-4`}>
              <IconComponent />
            </div>
            <div className={`text-sm leading-[1.3] flex items-center ${
              isActive ? 'font-bold text-[#ff2356]' : 'font-semibold text-[#374151]'
            }`}>
              {service.title}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ServiceSidebar;
