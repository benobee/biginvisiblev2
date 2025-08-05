import { useState, useEffect } from 'react';
import styles from './SimpleBlueprintGrid.module.css';
import { type Service } from '../data/services';

interface TouchPoint {
  id: string;
  name: string;
  x: number;
  y: number;
  color: string;
  size: number;
  glow: number;
  type: 'service' | 'feature';
  connections?: string[];
  parentId?: string;
}

interface ServiceBlueprintGridProps {
  service: Service;
}

const ServiceBlueprintGrid = ({ service }: ServiceBlueprintGridProps) => {
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);
  const [activePoint, setActivePoint] = useState<string | null>(null);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [resumeTimeout, setResumeTimeout] = useState<NodeJS.Timeout | null>(null);
  const [initialTimeout, setInitialTimeout] = useState<NodeJS.Timeout | null>(null);

  // Create main service touch point positioned to the right
  const mainServicePoint: TouchPoint = {
    id: service.id,
    name: service.title,
    x: 70,
    y: 50,
    color: '#ff2356',
    size: 24,
    glow: 3,
    type: 'service',
    connections: []
  };

  // Create sub-service touch points from expanded features
  const createSubServiceTouchPoints = (): TouchPoint[] => {
    const subServices: TouchPoint[] = [];
    
    // Create asymmetrical positions around the center
    const angles = [30, 120, 200, 280]; // Non-symmetrical angles
    const distances = [25, 28, 26, 27]; // Varying distances
    
    service.expandedFeatures.forEach((feature, index) => {
      const angle = angles[index % angles.length] * (Math.PI / 180);
      const distance = distances[index % distances.length];
      
      // Calculate position relative to main service point (right side)
      const x = 70 + Math.cos(angle) * distance;
      const y = 50 + Math.sin(angle) * distance;
      
      // Keep within bounds and in the right half of the screen
      const clampedX = Math.max(50, Math.min(90, x));
      const clampedY = Math.max(20, Math.min(80, y));
      
      subServices.push({
        id: `${service.id}-${index}`,
        name: feature.title,
        x: clampedX,
        y: clampedY,
        color: '#4080ff',
        size: 16,
        glow: 2,
        type: 'feature',
        connections: [],
        parentId: service.id
      });
    });
    
    return subServices;
  };

  const [subServicePoints] = useState<TouchPoint[]>(createSubServiceTouchPoints());

  // Auto-rotate through sub-services
  useEffect(() => {
    if (subServicePoints.length === 0) return;

    let timeout: NodeJS.Timeout | null = null;
    let interval: NodeJS.Timeout | null = null;

    if (!isUserInteracting) {
      // Wait 2 seconds before starting the auto-rotation
      timeout = setTimeout(() => {
        let currentIndex = 0;
        // Set first active point after initial delay
        setActivePoint(subServicePoints[0].id);
        
        // Then start the interval for subsequent rotations
        interval = setInterval(() => {
          currentIndex = (currentIndex + 1) % subServicePoints.length;
          setActivePoint(subServicePoints[currentIndex].id);
        }, 3000);
        
        setIntervalId(interval);
      }, 2000);
      
      setInitialTimeout(timeout);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [subServicePoints, isUserInteracting]);

  // Handle user interaction start
  const handleMouseEnter = (pointId: string) => {
    // Clear any pending resume timeout
    if (resumeTimeout) {
      clearTimeout(resumeTimeout);
      setResumeTimeout(null);
    }
    
    // Clear initial timeout if still waiting
    if (initialTimeout) {
      clearTimeout(initialTimeout);
      setInitialTimeout(null);
    }
    
    // Stop auto-rotation and prioritize user interaction
    setIsUserInteracting(true);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    
    // Set this point as the only active one
    setHoveredPoint(pointId);
    setActivePoint(pointId);
  };

  // Handle user interaction end
  const handleMouseLeave = () => {
    setHoveredPoint(null);
    setActivePoint(null);
    
    // Resume auto-rotation after 2 seconds
    const timeout = setTimeout(() => {
      setIsUserInteracting(false);
    }, 2000);
    
    setResumeTimeout(timeout);
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
      if (resumeTimeout) clearTimeout(resumeTimeout);
      if (initialTimeout) clearTimeout(initialTimeout);
    };
  }, [intervalId, resumeTimeout, initialTimeout]);

  return (
    <div className={styles.container}>
      {/* CSS Blueprint Grid Background */}
      <div className={styles.blueprintGrid} />
      
      {/* Floating particles */}
      <div className={styles.particlesContainer}>
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className={styles.particle}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              '--animation-duration': `${3 + Math.random() * 4}s`,
              '--animation-delay': `${Math.random() * 2}s`
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Connection Lines - SVG approach */}
      <svg className={styles.connectionsContainer}>
        {subServicePoints.map(subPoint => {
          const isSubPointHovered = hoveredPoint === subPoint.id;
          const isSubPointActive = activePoint === subPoint.id;
          const shouldShowLine = isSubPointHovered || isSubPointActive || hoveredPoint === mainServicePoint.id;
          
          if (!shouldShowLine) return null;
          
          return (
            <line
              key={`line-${subPoint.id}`}
              x1={`${mainServicePoint.x}%`}
              y1={`${mainServicePoint.y}%`}
              x2={`${subPoint.x}%`}
              y2={`${subPoint.y}%`}
              stroke="#ff2356"
              strokeWidth="1"
              strokeDasharray="2 3"
              opacity="0.6"
              className={styles.subServiceConnectionLine}
            />
          );
        })}
      </svg>

      {/* Main Service Touch Point */}
      <div
        className={`${styles.touchPoint} ${hoveredPoint === mainServicePoint.id ? styles.touchPointActive : ''} ${styles.fadeInScale}`}
        style={{
          left: `${mainServicePoint.x}%`,
          top: `${mainServicePoint.y}%`,
          '--animation-delay': '0s'
        } as React.CSSProperties}
        onMouseEnter={() => handleMouseEnter(mainServicePoint.id)}
        onMouseLeave={() => handleMouseLeave()}
      >
        <div className={styles.hotspotMarker}>
          <div 
            className={styles.hotspotOuter}
            style={{
              borderColor: `${mainServicePoint.color}80`,
              width: '48px',
              height: '48px'
            }}
          />
          <div 
            className={styles.hotspotInner}
            style={{
              background: `${mainServicePoint.color}e6`,
              width: '24px',
              height: '24px'
            }}
          />
        </div>

        {/* Label */}
        <div 
          className={`${styles.touchPointLabel} ${hoveredPoint === mainServicePoint.id ? styles.touchPointLabelVisible : ''}`}
        >
          {mainServicePoint.name}
        </div>
      </div>

      {/* Sub-Service Touch Points */}
      {subServicePoints.map((subPoint, index) => {
        const isHovered = hoveredPoint === subPoint.id;
        const isActive = activePoint === subPoint.id;
        const shouldHighlight = isHovered || isActive || hoveredPoint === mainServicePoint.id;
        
        return (
          <div
            key={subPoint.id}
            className={`${styles.subServicePoint} ${shouldHighlight ? styles.subServicePointActive : ''} ${shouldHighlight ? styles.visible : ''} ${styles.fadeInScale}`}
            style={{
              left: `${subPoint.x}%`,
              top: `${subPoint.y}%`,
              '--animation-delay': `${0.3 + index * 0.1}s`
            } as React.CSSProperties}
            onMouseEnter={() => handleMouseEnter(subPoint.id)}
            onMouseLeave={() => handleMouseLeave()}
          >
            <div className={styles.subServiceMarker}>
              <div 
                className={styles.subServiceInner}
                style={{
                  background: `${subPoint.color}e6`
                }}
              />
            </div>

            {/* Sub-service label */}
            <div className={`${styles.subServiceLabel} ${(isHovered || isActive) ? styles.touchPointLabelVisible : ''}`}>
              {subPoint.name}
            </div>
          </div>
        );
      })}

    </div>
  );
};

export default ServiceBlueprintGrid;