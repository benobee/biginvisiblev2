import React from 'react';
import styles from './FullScreenHero.module.css';

interface FullScreenHeroProps {
  title: string | React.ReactNode;
  subtitle?: string;
  description?: string;
  imageUrl: string;
  imageAlt?: string;
  overlayOpacity?: number;
  textAlign?: 'left' | 'center' | 'right';
  animateAccent?: boolean;
}

const FullScreenHero: React.FC<FullScreenHeroProps> = ({
  title,
  subtitle,
  description,
  imageUrl,
  imageAlt = 'Hero image',
  overlayOpacity = 0.5,
  textAlign = 'center',
  animateAccent = true
}) => {
  const alignmentClasses = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end'
  };

  const containerAlignment = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end'
  };

  return (
    <section className="relative w-full h-[73vh] min-h-[500px] mt-[80px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={imageUrl}
          alt={imageAlt}
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      </div>

      {/* Content */}
      <div className={`relative z-10 section-container w-full flex ${containerAlignment[textAlign]}`}>
        <div className={`max-w-4xl ${alignmentClasses[textAlign]} flex flex-col`}>
          {subtitle && (
            <span className="reveal-text text-sm lg:text-base uppercase tracking-wider text-white/80 mb-4 font-medium">
              {subtitle}
            </span>
          )}
          
          <h1 className="reveal-text text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
            {title}
          </h1>
          
          {description && (
            <p className="reveal-text text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed max-w-3xl">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FullScreenHero;