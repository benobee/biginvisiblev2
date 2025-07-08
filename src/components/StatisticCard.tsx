import { useState, useEffect, useRef } from 'react';
import type { StatisticEntry } from '../data/statisticsDatabase';

interface StatisticCardProps {
  statistic: StatisticEntry;
  variant?: 'default' | 'large' | 'minimal' | 'featured';
  showSource?: boolean;
  className?: string;
  clickable?: boolean;
}

const StatisticCard = ({ 
  statistic, 
  variant = 'default', 
  showSource = false,
  className = '',
  clickable = false
}: StatisticCardProps) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before the element is fully visible
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = statistic.percentage / steps;
      const stepDuration = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const value = Math.min(increment * step, statistic.percentage);
        setCurrentValue(Math.round(value));
        
        if (step >= steps) {
          clearInterval(timer);
          setHasAnimated(true);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [isVisible, statistic.percentage, hasAnimated]);
  const getVariantClasses = () => {
    switch (variant) {
      case 'large':
        return {
          container: 'bg-white rounded-2xl p-8 shadow-xl border border-gray-100 h-80',
          percentage: 'text-6xl lg:text-7xl font-bold text-accent mb-4',
          statement: 'text-lg lg:text-xl leading-relaxed text-gray-700 font-medium',
          source: 'text-sm text-gray-500 mt-4'
        };
      case 'minimal':
        return {
          container: 'bg-gray-50 rounded-lg p-6 border-l-4 border-accent h-64',
          percentage: 'text-4xl font-bold text-accent mb-2',
          statement: 'text-base text-gray-700',
          source: 'text-xs text-gray-500 mt-2'
        };
      case 'featured':
        return {
          container: 'bg-gradient-to-br from-accent/5 via-white to-accent/10 rounded-3xl p-10 shadow-2xl border-2 border-accent/20 relative overflow-hidden h-80',
          percentage: 'text-7xl lg:text-8xl font-bold text-accent mb-6',
          statement: 'text-xl lg:text-2xl leading-relaxed text-gray-700 font-semibold',
          source: 'text-sm text-gray-600 mt-6'
        };
      default:
        return {
          container: `bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 h-64 ${clickable ? 'cursor-pointer hover:-translate-y-1' : ''}`,
          percentage: 'text-5xl lg:text-6xl font-bold text-accent mb-3',
          statement: 'text-base leading-relaxed text-gray-700',
          source: 'text-xs text-gray-500 mt-3'
        };
    }
  };

  const classes = getVariantClasses();
  const cardProps = clickable 
    ? { href: `/stat-detail?id=${statistic.id}`, className: `${classes.container} ${className} reveal-text no-underline` }
    : { className: `${classes.container} ${className} reveal-text` };

  return (
    <div 
      ref={cardRef} 
      {...cardProps}
    >
      <a href={cardProps.href}>
      {/* Featured variant background elements */}
      {variant === 'featured' && (
        <>
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-gradient-to-tr from-accent/15 to-transparent rounded-full blur-xl"></div>
        </>
      )}
      
      <div className="relative z-10 h-full flex flex-col justify-center text-center">
        {/* Percentage */}
        <div className={classes.percentage}>
          {currentValue}%
        </div>
        
        {/* Statement */}
        <p className={classes.statement}>
          {statistic.statement}
        </p>
        
        {/* Source */}
        {showSource && (
          <div className={classes.source}>
            Source: {statistic.source}
          </div>
        )}
      </div>
      </a>
    </div>
  );
};

export default StatisticCard;
