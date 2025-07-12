import { useState, useEffect } from 'react';
import { services, type Service } from '../../data/services';
import { Menu, X } from 'lucide-react';

interface ServiceSidebarProps {
  currentServiceId: string;
  currentPath?: string;
}

const ServiceSidebar: React.FC<ServiceSidebarProps> = ({ currentPath }) => {
  // Use services in their original order - no reordering based on current service
  const allServices = services;
  
  // Default to collapsed on mobile/tablet (< 1024px)
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  useEffect(() => {
    const checkScreenSize = () => {
      const isSmallScreen = window.innerWidth < 1024;
      setIsCollapsed(isSmallScreen);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  return (
    <>
      <div 
        className={`fixed left-0 top-0 h-screen bg-white border-r border-[#E2E8F0] pt-10 pb-5 overflow-y-auto z-[100] shadow-[2px_0_10px_rgba(0,0,0,0.1)] transition-all duration-300 ${
          isCollapsed ? 'w-[80px]' : 'w-[280px]'
        }`}
      >
        <div className={`${isCollapsed ? 'px-2' : 'px-5'}`}>
          <div className={`pb-6 border-b border-[#E2E8F0] mb-8 ${isCollapsed ? 'px-2' : 'px-4'}`}>
            {isCollapsed ? (
              <>
                <a href="/" className="block mb-3">
                  <div className="h-8 w-8 mx-auto bg-[#ff2356] rounded-lg flex items-center justify-center text-white font-bold text-lg">
                    B
                  </div>
                </a>
                
                {/* Delimiter when collapsed */}
                <div className="h-px bg-[#E2E8F0] my-3 mx-2"></div>
                
                {/* Toggle button below logo when collapsed */}
                <button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="w-10 h-10 mx-auto bg-gray-50 border border-[#E2E8F0] rounded-lg flex items-center justify-center hover:bg-gray-100 transition-all lg:hidden"
                  aria-label="Expand sidebar"
                >
                  <Menu size={20} className="text-[#6B7280]" />
                </button>
              </>
            ) : (
              <>
                {/* Expanded layout with logo and X button on same line */}
                <div className="flex items-center justify-between mb-3">
                  <a href="/" className="block">
                    <img 
                      src="/images/logo/bigInvisible-logo.png"
                      alt="Big Invisible" 
                      className="h-8 w-auto"
                    />
                  </a>
                  
                  {/* X button on the right side of logo */}
                  <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="w-8 h-8 bg-gray-50 border border-[#E2E8F0] rounded-lg flex items-center justify-center hover:bg-gray-100 transition-all lg:hidden"
                    aria-label="Collapse sidebar"
                  >
                    <X size={16} className="text-[#6B7280]" />
                  </button>
                </div>
              </>
            )}
          </div>
          
          {!isCollapsed && <h3 className="text-lg mb-6 text-[#0F1923] font-bold px-4">All Services</h3>}
          
          {allServices.map((service: Service) => {
            const IconComponent = service.icon;
            const isActive = currentPath === `/services/${service.id}`;
            
            return (
              <a 
                key={service.id} 
                href={`/services/${service.id}`}
                className={`flex items-center mb-1 rounded-lg transition-all duration-300 no-underline text-[#4A5568] relative min-h-[44px] border-l-[3px] hover:translate-x-0.5 last:mb-0 ${
                  isActive 
                    ? 'bg-[rgba(255,58,70,0.1)] border-l-[#ff2356] hover:bg-[rgba(255,58,70,0.15)]' 
                    : 'bg-transparent border-l-transparent hover:bg-black/5'
                } ${isCollapsed ? 'py-3 px-2 justify-center' : 'py-2 px-4'}`}
                title={isCollapsed ? service.title : undefined}
              >
                <div 
                  className={`transition-all flex-shrink-0 ${isCollapsed ? 'p-2' : 'mr-3 p-2'} ${
                    isActive ? 'border-[#ff2356]' : 'border-[#DADCE0]'
                  } ${isActive ? 'text-[#ff2356]' : 'text-[#9CA3AF]'}`}
                >
                  <IconComponent size={isCollapsed ? "xs" : "xxs"} />
                </div>
                {!isCollapsed && (
                  <div className="text-left">
                    <span className={`font-medium text-[14px] block ${isActive ? 'text-[#0F1923]' : 'text-[#6B7280]'}`}>
                      {service.title}
                    </span>
                  </div>
                )}
              </a>
            );
          })}
          
          {!isCollapsed && (
            <div className="mt-8 pt-6 border-t border-[#E2E8F0] px-4">
              <a href="/services" className="text-[#ff2356] text-sm font-medium hover:underline block">
                ← Back to All Services
              </a>
            </div>
          )}
        </div>
      </div>
      
      {/* Overlay for mobile when expanded */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-[99] lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}
    </>
  );
};

export default ServiceSidebar;
