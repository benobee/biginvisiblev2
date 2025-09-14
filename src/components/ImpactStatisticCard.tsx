import { useState, useEffect, useRef } from 'react';
import { ExternalLink } from 'lucide-react';
import type { StatisticEntry } from '../data/statisticsDatabase';

interface ImpactStatisticCardProps {
  statistic: StatisticEntry;
  variant?: 'default' | 'large' | 'minimal' | 'featured';
  showSource?: boolean;
  showPercentage?: boolean;
  className?: string;
}

const ImpactStatisticCard = ({ 
  statistic, 
  variant = 'default', 
  showSource = false,
  showPercentage = true,
  className = '' 
}: ImpactStatisticCardProps) => {
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
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
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
      const duration = 2000;
      const steps = 60;
      const increment = statistic.impactPercentage / steps;
      const stepDuration = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const value = Math.min(increment * step, statistic.impactPercentage);
        setCurrentValue(Math.round(value));
        
        if (step >= steps) {
          clearInterval(timer);
          setHasAnimated(true);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [isVisible, statistic.impactPercentage, hasAnimated]);


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
          container: 'bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-64',
          percentage: 'text-5xl lg:text-6xl font-bold text-accent mb-3',
          statement: 'text-base leading-relaxed text-gray-700',
          source: 'text-xs text-gray-500 mt-3'
        };
    }
  };

  const classes = getVariantClasses();

  return (
    <div ref={cardRef} className={`${classes.container} ${className} reveal-text`}>
      {/* Featured variant background elements */}
      {variant === 'featured' && (
        <>
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-2xl"></div>
          <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-gradient-to-tr from-accent/15 to-transparent rounded-full blur-xl"></div>
        </>
      )}
      
      <div className="relative z-10 h-full flex flex-col justify-center text-center">
        {/* Percentage */}
        {showPercentage && (
          <div className={classes.percentage}>
            {currentValue}%
          </div>
        )}
        
        {/* Statement */}
        <p className={classes.statement}>
          {statistic.impactStatement}
        </p>
        
        {/* Source */}
        {showSource && (
          <div className={classes.source}>
            Source: {statistic.source}
            {statistic.sourceUrl && (
              <a 
                href={statistic.sourceUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 ml-2 text-accent hover:text-accent-dark transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImpactStatisticCard;
