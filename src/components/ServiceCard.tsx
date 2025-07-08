import { ArrowRight } from 'lucide-react';
import type { Service } from '../data/services';

interface ServiceCardProps {
  service: Service;
  className?: string;
  variant?: 'home' | 'services';
}

const ServiceCard = ({ service, className = '', variant = 'services' }: ServiceCardProps) => {
  if (variant === 'home') {
    // Home page variant - simpler style without icons or features list
    return (
      <div className={`border-gray-border hover:border-brand-accent transition-all duration-300 group ${className}`}>
        <h3 className="text-xl font-bold mb-4">{service.title}</h3>
        <p className="text-gray-medium mb-6 leading-relaxed">
          {service.shortDescription}
        </p>
        <a 
          href={`/services/${service.id}`} 
          className="inline-flex items-center text-brand-accent hover:text-brand-dark transition-colors duration-150 font-medium group"
        >
          Learn more
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2 transition-transform group-hover:translate-x-1">
            <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor"/>
          </svg>
        </a>
      </div>
    );
  }

  // Services page variant - full card with icons and features
  return (
    <div className={`bg-white border border-gray-200 p-8 transition-all duration-300 h-full flex flex-col rounded-xl shadow-sm hover:border-accent hover:-translate-y-1 hover:shadow-md ${className}`}>
      {/* Icon */}
      <div className="mb-6 w-12 h-12 text-accent">
        <service.icon />
      </div>
      
      {/* Title */}
      <h3 className="text-xl mb-4 text-dark font-bold">{service.title}</h3>
      
      {/* Description */}
      <p className="opacity-80 leading-relaxed mb-6 text-dark">
        {service.shortDescription}
      </p>
      
      {/* Features List */}
      <ul className="list-none p-0 mb-6 flex-grow">
        {service.features.map((feature, index) => (
          <li 
            key={index}
            className="relative pl-6 mb-3 opacity-80 text-dark before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:bg-accent before:rounded-full"
          >
            {feature}
          </li>
        ))}
      </ul>
      
      {/* Learn More Link */}
      <a 
        href={`/services/${service.id}`} 
        className="mt-auto inline-flex items-center text-accent text-sm font-medium no-underline group hover:text-accent-dark transition-colors duration-150"
      >
        Learn more
        <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-150 group-hover:translate-x-1" />
      </a>
    </div>
  );
};

export default ServiceCard;