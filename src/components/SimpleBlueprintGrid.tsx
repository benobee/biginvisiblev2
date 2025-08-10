import { useState, useEffect, useRef } from 'react';
import { getAllSimpleServiceTouchPoints, simpleServiceConstellations } from '../data/serviceConstellationSimple';
import styles from './SimpleBlueprintGrid.module.css';

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

// Create 2D constellation layout with asymmetrical positioning
const createTouchPoints = () => {
  const serviceTouchPoints = getAllSimpleServiceTouchPoints();
  
  // Predefined asymmetrical positions that avoid center text area and spread nicely
  // Keep touch points away from the very top (minimum 30% from top)
  const servicePositions = [
    { x: 15, y: 35 },   // Top left
    { x: 75, y: 30 },   // Top right
    { x: 90, y: 45 },   // Mid right
    { x: 80, y: 75 },   // Bottom right
    { x: 25, y: 85 },   // Bottom left
    { x: 8, y: 60 }     // Mid left
  ];
  
  return serviceTouchPoints.map((service, index) => {
    const position = servicePositions[index % servicePositions.length];
    
    // Convert Color to RGB string
    const color = `rgb(${Math.round(service.color.r * 255)}, ${Math.round(service.color.g * 255)}, ${Math.round(service.color.b * 255)})`;
    
    return {
      id: service.id,
      name: service.name,
      x: position.x,
      y: position.y,
      color,
      size: service.size,
      glow: service.glow,
      type: service.type,
      connections: service.connections || []
    };
  });
};

// Create sub-service touch points positioned around their parent services
const createSubServiceTouchPoints = (serviceTouchPoints: TouchPoint[]) => {
  const subServices: TouchPoint[] = [];
  
  simpleServiceConstellations.forEach((constellation) => {
    const parentService = serviceTouchPoints.find(s => s.id === constellation.touchPoints.find(tp => tp.type === 'service')?.id);
    if (!parentService) return;
    
    const featurePoints = constellation.touchPoints.filter(tp => tp.type === 'feature');
    
    featurePoints.forEach((feature, index) => {
      // Create asymmetrical positions around the parent service
      const angles = [30, 120, 200, 280, 350]; // Non-symmetrical angles
      const distances = [12, 15, 18, 16, 14]; // Varying distances
      const angle = angles[index % angles.length] * (Math.PI / 180);
      const distance = distances[index % distances.length];
      
      // Calculate position relative to parent service
      const x = parentService.x + Math.cos(angle) * distance;
      const y = parentService.y + Math.sin(angle) * distance;
      
      // Keep within bounds and away from top edge (minimum 25% from top)
      const clampedX = Math.max(5, Math.min(95, x));
      const clampedY = Math.max(25, Math.min(95, y));
      
      const color = `rgb(${Math.round(feature.color.r * 255)}, ${Math.round(feature.color.g * 255)}, ${Math.round(feature.color.b * 255)})`;
      
      subServices.push({
        id: feature.id,
        name: feature.name,
        x: clampedX,
        y: clampedY,
        color,
        size: feature.size,
        glow: feature.glow,
        type: feature.type,
        connections: [],
        parentId: parentService.id
      });
    });
  });
  
  return subServices;
};

interface SimpleBlueprintGridProps {
  progress: number;
  gridVisible?: boolean;
}

const SimpleBlueprintGrid: React.FC<SimpleBlueprintGridProps> = ({ progress, gridVisible = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchPoints] = useState<TouchPoint[]>(createTouchPoints());
  const [subServicePoints] = useState<TouchPoint[]>(() => createSubServiceTouchPoints(createTouchPoints()));
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);
  const [activePoint, setActivePoint] = useState<string | null>(null);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [resumeTimeout, setResumeTimeout] = useState<NodeJS.Timeout | null>(null);
  const [initialTimeout, setInitialTimeout] = useState<NodeJS.Timeout | null>(null);

  // Calculate visibility states based on progress thresholds
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  const particleThreshold = 0.02;
  const subServiceThreshold = 0.2;
  const serviceThreshold = 0.3;

  const showParticles = prefersReduced || (gridVisible && progress >= particleThreshold);
  const showSubServices = prefersReduced || (gridVisible && progress >= subServiceThreshold);
  const showServices = prefersReduced || (gridVisible && progress >= serviceThreshold);

  console.log('Visibility states:', { progress, showParticles, showSubServices, showServices });

  // Set CSS custom properties based on progress thresholds - much simpler and more reliable
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReduced) {
      // If reduced motion, show everything immediately
      container.style.setProperty('--particles-progress', '1');
      container.style.setProperty('--subservices-progress', '1');
      container.style.setProperty('--services-progress', '1');
      return;
    }

    // thresholds expressed as fractions of hero progress (0 -> 1)
    const particleThreshold = 0.05; // particles show very early
    const subServiceThreshold = 0.35; // sub-services in mid progress
    const serviceThreshold = 0.45; // services later in the scroll

    const particlesProgress = progress >= particleThreshold ? '1' : '0';
    const subservicesProgress = progress >= subServiceThreshold ? '1' : '0';
    const servicesProgress = progress >= serviceThreshold ? '1' : '0';

    // Set CSS custom properties - let CSS handle the staggered reveals
    container.style.setProperty('--particles-progress', particlesProgress);
    container.style.setProperty('--subservices-progress', subservicesProgress);
    container.style.setProperty('--services-progress', servicesProgress);

    // Debug logging - check if CSS properties are actually being set
    console.log('Progress:', progress, 'GridVisible:', gridVisible, 'Particles:', particlesProgress, 'SubServices:', subservicesProgress, 'Services:', servicesProgress);
    console.log('Container element:', container);
    console.log('CSS properties set:', {
      particles: container.style.getPropertyValue('--particles-progress'),
      subservices: container.style.getPropertyValue('--subservices-progress'),
      services: container.style.getPropertyValue('--services-progress')
    });
  }, [progress, gridVisible]);

  // Auto-rotate through touch points every 3 seconds with initial delay
  useEffect(() => {
    if (touchPoints.length === 0) return;

    let timeout: NodeJS.Timeout | null = null;
    let interval: NodeJS.Timeout | null = null;

    // Only start if not user interacting
    if (!isUserInteracting) {
      // Wait 3 seconds before starting the auto-rotation
      timeout = setTimeout(() => {
        let currentIndex = 0;
        // Set first active point after initial delay
        setActivePoint(touchPoints[0].id);
        
        // Then start the interval for subsequent rotations
        interval = setInterval(() => {
          currentIndex = (currentIndex + 1) % touchPoints.length;
          setActivePoint(touchPoints[currentIndex].id);
        }, 3000);
        
        setIntervalId(interval);
      }, 3000);
      
      setInitialTimeout(timeout);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [touchPoints.length, isUserInteracting]);

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
    setActivePoint(null); // Clear active point when user leaves
    
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


  const handleClick = () => {
    // Find corresponding service and scroll to services section
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <div ref={containerRef} className={styles.container} suppressHydrationWarning={true}>
      {/* Centered Title */}
      {<div className={styles.centeredTitle}>
        <h1>Your brand</h1>
      </div>}
      {/* CSS Blueprint Grid Background */}
      <div className={styles.blueprintGrid} />
      {/* Floating particles */}
      <div className={styles.particlesContainer}>
        {Array.from({ length: 30 }, (_, i) => {
          // Use deterministic values based on index to avoid hydration mismatch
          // Better distribution using multiple seeds
          const seed1 = (i * 0.618033988749) % 1; // Golden ratio
          const seed2 = (i * 0.414213562373) % 1; // Silver ratio
          const left = seed1 * 100;
          const top = seed2 * 100;
          const duration = 3 + (seed1 * 4);
          const delay = seed2 * 2;
          
          return (
            <div
              key={i}
              className={styles.particle}
              style={{
                left: `${left}%`,
                top: `${top}%`,
                '--animation-duration': `${duration}s`,
                '--animation-delay': `${delay}s`,
                opacity: showParticles ? 0.2 : 0,
                transition: 'opacity 0.4s ease',
                transitionDelay: `${delay}s`
              } as React.CSSProperties}
            />
          );
        })}
      </div>

      {/* Connection lines */}
      <svg className={styles.connectionsContainer}>
        {touchPoints.map(point => 
          point.connections?.map(connectionId => {
            const targetPoint = touchPoints.find(p => p.id === connectionId);
            if (!targetPoint) return null;
            
            return (
              <line
                key={`${point.id}-${connectionId}`}
                x1={`${point.x}%`}
                y1={`${point.y}%`}
                x2={`${targetPoint.x}%`}
                y2={`${targetPoint.y}%`}
                stroke={point.color}
                className={styles.connectionLine}
              />
            );
          })
        )}
      </svg>


      {/* Connection Lines - SVG approach for better dotted lines */}
      <svg className={styles.connectionsContainer}>
        {subServicePoints.map(subPoint => {
          const parentPoint = touchPoints.find(p => p.id === subPoint.parentId);
          const isParentHovered = hoveredPoint === subPoint.parentId;
          const shouldShowLine = isParentHovered;
          
          if (!parentPoint || !shouldShowLine) return null;
          
          return (
            <line
              key={`line-${subPoint.id}`}
              x1={`${parentPoint.x}%`}
              y1={`${parentPoint.y}%`}
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

      {/* Touch Points (Services) */}
      {touchPoints.map((point, index) => {
        const isActive = activePoint === point.id;
        const isHovered = hoveredPoint === point.id;
        const isNearTop = point.y < 40; // Check if touch point is in top 40% of screen
        
        return (
          <div
            key={point.id}
            className={`${styles.touchPoint} ${isActive ? styles.touchPointActive : ''}`}
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
              '--animation-delay': `${index * 0.15}s`,
              opacity: showServices ? 1 : 0,
              transition: 'opacity 0.5s ease',
              transitionDelay: `${index * 0.15}s`
            } as React.CSSProperties}
            onClick={() => handleClick()}
            onMouseEnter={() => handleMouseEnter(point.id)}
            onMouseLeave={() => handleMouseLeave()}
          >
            <div className={styles.hotspotMarker}>
              <div 
                className={styles.hotspotOuter}
                style={{
                  borderColor: `${point.color}80` // 50% opacity
                }}
              />
              <div 
                className={styles.hotspotInner}
                style={{
                  background: `${point.color}e6` // 90% opacity
                }}
              />
            </div>

            {/* Label - position below if near top */}
            <div 
              className={`${styles.touchPointLabel} ${(isActive || isHovered) ? styles.touchPointLabelVisible : ''} ${isNearTop ? styles.touchPointLabelBelow : ''}`}
            >
              {point.name}
            </div>
          </div>
        );
      })}

      {/* Sub-Service Touch Points */}
      {subServicePoints.map((subPoint, index) => {
        const isParentHovered = hoveredPoint === subPoint.parentId;
        const shouldHighlight = isParentHovered;
        
        return (
          <div
            key={subPoint.id}
            className={`${styles.subServicePoint} ${shouldHighlight ? styles.subServicePointActive : ''}`}
            style={{
              left: `${subPoint.x}%`,
              top: `${subPoint.y}%`,
              '--animation-delay': `${(touchPoints.length * 0.15 + index * 0.05)}s`,
              opacity: showSubServices ? 0.2 : 0,
              transition: 'opacity 0.4s ease',
              transitionDelay: `${(touchPoints.length * 0.15 + index * 0.05)}s`
            } as React.CSSProperties}
          >
            <div className={styles.subServiceMarker}>
              <div 
                className={styles.subServiceInner}
                style={{
                  background: `${subPoint.color}e6` // 90% opacity
                }}
              />
            </div>

            {/* Sub-service label */}
            <div className={styles.subServiceLabel}>
              {subPoint.name}
            </div>
          </div>
        );
      })}

    </div>
  );
};

export default SimpleBlueprintGrid;
