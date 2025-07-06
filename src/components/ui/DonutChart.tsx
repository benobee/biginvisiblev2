import { useState, useEffect, useRef } from 'react';
import { Users, TrendingUp } from 'lucide-react';

interface DonutChartProps {
  percentage: number;
  variant?: 'default' | 'people' | 'pie' | 'icon';
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  color?: 'accent' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  textSize?: 'small' | 'medium' | 'large' | 'xlarge';
  strokeWidth?: number;
  showLabel?: boolean;
  label?: string;
  animated?: boolean;
  className?: string;
  statisticType?: 'percentage' | 'multiplier' | 'ratio' | 'count';
}

const DonutChart = ({ 
  percentage,
  variant = 'default',
  size = 'medium',
  color = 'accent',
  textSize = 'medium',
  strokeWidth,
  showLabel = false,
  label = '',
  animated = true,
  className = '',
  statisticType = 'percentage'
}: DonutChartProps) => {
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);

  // Size configurations
  const sizeConfig = {
    small: {
      containerSize: 80,
      radius: 30,
      strokeWidth: strokeWidth || 6,
      centerSize: 18
    },
    medium: {
      containerSize: 120,
      radius: 45,
      strokeWidth: strokeWidth || 8,
      centerSize: 30
    },
    large: {
      containerSize: 160,
      radius: 60,
      strokeWidth: strokeWidth || 10,
      centerSize: 40
    },
    xlarge: {
      containerSize: 200,
      radius: 75,
      strokeWidth: strokeWidth || 12,
      centerSize: 50
    }
  };

  // Text size configurations
  const textSizeConfig = {
    small: 'text-lg',
    medium: 'text-2xl',
    large: 'text-3xl',
    xlarge: 'text-4xl'
  };

  // Color configurations
  const colorConfig = {
    accent: {
      stroke: 'stroke-accent',
      bg: 'stroke-gray-200',
      text: 'text-accent',
      peopleActive: 'text-accent',
      peopleInactive: 'text-gray-300'
    },
    primary: {
      stroke: 'stroke-primary',
      bg: 'stroke-gray-200',
      text: 'text-primary',
      peopleActive: 'text-primary',
      peopleInactive: 'text-gray-300'
    },
    secondary: {
      stroke: 'stroke-secondary',
      bg: 'stroke-gray-200',
      text: 'text-secondary',
      peopleActive: 'text-secondary',
      peopleInactive: 'text-gray-300'
    },
    success: {
      stroke: 'stroke-green-500',
      bg: 'stroke-gray-200',
      text: 'text-green-500',
      peopleActive: 'text-green-500',
      peopleInactive: 'text-gray-300'
    },
    warning: {
      stroke: 'stroke-yellow-500',
      bg: 'stroke-gray-200',
      text: 'text-yellow-500',
      peopleActive: 'text-yellow-500',
      peopleInactive: 'text-gray-300'
    },
    danger: {
      stroke: 'stroke-red-500',
      bg: 'stroke-gray-200',
      text: 'text-red-500',
      peopleActive: 'text-red-500',
      peopleInactive: 'text-gray-300'
    }
  };

  const config = sizeConfig[size];
  const colors = colorConfig[color];
  const textClass = textSizeConfig[textSize];

  // Calculate circle properties
  const circumference = 2 * Math.PI * config.radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (currentPercentage / 100) * circumference;

  // Intersection Observer for animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => {
      if (chartRef.current) {
        observer.unobserve(chartRef.current);
      }
    };
  }, [isVisible]);

  // Animate percentage
  useEffect(() => {
    if (isVisible && animated) {
      const duration = 2000;
      const steps = 60;
      const increment = percentage / steps;
      const stepDuration = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const value = Math.min(increment * step, percentage);
        setCurrentPercentage(Math.round(value));
        
        if (step >= steps) {
          clearInterval(timer);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    } else if (!animated) {
      setCurrentPercentage(percentage);
    }
  }, [isVisible, percentage, animated]);

  // People icon variant
  if (variant === 'people') {
    const totalPeople = 10;
    const activePeople = Math.round((currentPercentage / 100) * totalPeople);
    
    return (
      <div ref={chartRef} className={`flex flex-col items-center ${className}`}>
        <div className="flex flex-wrap justify-center mb-4">
          {Array.from({ length: totalPeople }, (_, index) => (
            <Users
              size={config.centerSize}
              key={index}
              className={`${index < activePeople ? colors.peopleActive : colors.peopleInactive
              } transition-colors duration-300`}
            />
          ))}
        </div>
        <div className={`${textClass} font-bold ${colors.text} text-4xl`}>
          {currentPercentage}%
        </div>
        {showLabel && label && (
          <div className="text-sm text-gray-600 mt-2 text-center">
            {label}
          </div>
        )}
      </div>
    );
  }

  // Pie chart variant (filled circle)
  if (variant === 'pie') {
    const angle = (currentPercentage / 100) * 360;
    const radius = config.radius;
    const centerX = config.containerSize / 2;
    const centerY = config.containerSize / 2;
    
    // Calculate the path for the pie slice
    const getPathData = (angle: number) => {
      if (angle === 0) return '';
      if (angle >= 360) {
        // Full circle
        return `M ${centerX} ${centerY - radius} A ${radius} ${radius} 0 1 1 ${centerX - 0.1} ${centerY - radius} Z`;
      }
      
      const angleRad = (angle - 90) * (Math.PI / 180); // Start from top (-90 degrees)
      const x = centerX + radius * Math.cos(angleRad);
      const y = centerY + radius * Math.sin(angleRad);
      const largeArcFlag = angle > 180 ? 1 : 0;
      
      return `M ${centerX} ${centerY} L ${centerX} ${centerY - radius} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x} ${y} Z`;
    };

    return (
      <div ref={chartRef} className={`flex flex-col items-center ${className}`}>
        <div className="relative" style={{ width: config.containerSize, height: config.containerSize }}>
          <svg
            width={config.containerSize}
            height={config.containerSize}
          >
            {/* Background circle */}
            <circle
              cx={centerX}
              cy={centerY}
              r={radius}
              fill="currentColor"
              className={colors.bg}
            />
            
            {/* Pie slice */}
            <path
              d={getPathData(angle)}
              fill="currentColor"
              className={colors.stroke}
              style={{
                transition: animated ? 'all 0.5s ease-in-out' : 'none'
              }}
            />
          </svg>
          
          {/* Center percentage text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`${textClass} font-bold text-white drop-shadow-lg`}>
              {currentPercentage}%
            </div>
          </div>
        </div>
        
        {showLabel && label && (
          <div className="text-sm text-gray-600 mt-2 text-center">
            {label}
          </div>
        )}
      </div>
    );
  }

  // Icon only variant (for multiplier types)
  if (variant === 'icon') {
    const iconSize = config.containerSize * 0.4; // 40% of container size
    
    return (
      <div ref={chartRef} className={`flex flex-col items-center justify-center ${className}`}>
        <div 
          className="flex items-center justify-center"
          style={{ width: config.containerSize, height: config.containerSize }}
        >
          <TrendingUp 
            size={iconSize}
            className={`${colors.text} opacity-90`}
            strokeWidth={2.5}
          />
        </div>
        
        {showLabel && label && (
          <div className="text-sm text-gray-600 mt-2 text-center">
            {label}
          </div>
        )}
      </div>
    );
  }

  // Default donut chart variant
  return (
    <div ref={chartRef} className={`flex flex-col items-center ${className}`}>
      <div className="relative" style={{ width: config.containerSize, height: config.containerSize }}>
        <svg
          width={config.containerSize}
          height={config.containerSize}
          className="transform -rotate-90"
        >
          {/* Background circle */}
          <circle
            cx={config.containerSize / 2}
            cy={config.containerSize / 2}
            r={config.radius}
            fill="none"
            className={colors.bg}
            strokeWidth={config.strokeWidth}
          />
          
          {/* Progress circle */}
          <circle
            cx={config.containerSize / 2}
            cy={config.containerSize / 2}
            r={config.radius}
            fill="none"
            className={colors.stroke}
            strokeWidth={config.strokeWidth}
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            style={{
              transition: animated ? 'stroke-dashoffset 0.5s ease-in-out' : 'none'
            }}
          />
        </svg>
        
        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Users 
            size={config.centerSize}
            className={`${colors.text} opacity-90`}
            strokeWidth={2.5}
          />
        </div>
      </div>
      
      {showLabel && label && (
        <div className="text-sm text-gray-600 mt-2 text-center">
          {label}
        </div>
      )}
    </div>
  );
};

export default DonutChart;