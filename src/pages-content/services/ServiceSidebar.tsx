import { services, type Service } from '../../data/services';

interface ServiceSidebarProps {
  currentServiceId: string;
  currentPath?: string;
}

const ServiceSidebar: React.FC<ServiceSidebarProps> = ({ currentPath }) => {
  // Use services in their original order - no reordering based on current service
  const allServices = services;
  
  return (
    <div className="fixed left-0 top-0 w-[280px] h-screen bg-white border-r border-[#E2E8F0] pt-20 px-5 pb-5 overflow-y-auto z-[100] shadow-[2px_0_10px_rgba(0,0,0,0.1)] hidden md:block">
      <div className="px-4 pb-8 border-b border-[#E2E8F0] mb-8">
        <a href="/" className="block mb-2">
          <img 
            src="/images/logo/bigInvisible-logo.png" 
            alt="Big Invisible" 
            className="h-8 w-auto"
          />
        </a>
        <p className="text-sm text-[#6B7280] mt-1 mb-0">Services</p>
      </div>
      
      <h3 className="text-lg mb-6 text-[#0F1923] font-bold px-4">All Services</h3>
      {allServices.map((service: Service) => {
        const IconComponent = service.icon;
        const isActive = currentPath === `/services/${service.id}`;
        
        return (
          <a 
            key={service.id} 
            href={`/services/${service.id}`}
            className={`flex items-center py-2 px-4 mb-1 rounded-lg transition-all duration-300 no-underline text-[#4A5568] relative min-h-[44px] border-l-[3px] hover:translate-x-0.5 last:mb-0 ${
              isActive 
                ? 'bg-[rgba(255,58,70,0.1)] border-l-[#ff2356] hover:bg-[rgba(255,58,70,0.15)]' 
                : 'bg-transparent border-l-transparent hover:bg-black/5'
            }`}
          >
            <div 
              className={`mr-3 p-2 transition-all flex-shrink-0 ${
                isActive ? 'border-[#ff2356]' : 'border-[#DADCE0]'
              } ${isActive ? 'text-[#ff2356]' : 'text-[#9CA3AF]'}`}
            >
              <IconComponent size="xxs" />
            </div>
            <div className="text-left">
              <span className={`font-medium text-[14px] block ${isActive ? 'text-[#0F1923]' : 'text-[#6B7280]'}`}>
                {service.title}
              </span>
            </div>
          </a>
        );
      })}
      
      <div className="mt-8 pt-6 border-t border-[#E2E8F0] px-4">
        <a href="/services" className="text-[#ff2356] text-sm font-medium hover:underline block">
          ← Back to All Services
        </a>
      </div>
    </div>
  );
};

export default ServiceSidebar;
