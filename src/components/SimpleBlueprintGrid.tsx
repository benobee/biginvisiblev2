import { useState, useEffect } from 'react';
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

const SimpleBlueprintGrid = () => {
  const [touchPoints] = useState<TouchPoint[]>(createTouchPoints());
  const [subServicePoints] = useState<TouchPoint[]>(() => createSubServiceTouchPoints(createTouchPoints()));
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);
  const [activePoint, setActivePoint] = useState<string | null>(null);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [resumeTimeout, setResumeTimeout] = useState<NodeJS.Timeout | null>(null);
  const [initialTimeout, setInitialTimeout] = useState<NodeJS.Timeout | null>(null);

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
    <div className={styles.container}>
      {/* CSS Blueprint Grid Background */}
      <div className={styles.blueprintGrid} />
      
      {/* Floating particles */}
      <div className={styles.particlesContainer}>
        {Array.from({ length: 30 }, (_, i) => (
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
        const isLeftSide = point.x < 50; // Check if on left or right side
        
        return (
          <div
            key={point.id}
            className={`${styles.touchPoint} ${isActive ? styles.touchPointActive : ''} ${isLeftSide ? styles.fadeInLeft : styles.fadeInRight}`}
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
              '--animation-delay': `${index * 0.15}s`
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
            className={`${styles.subServicePoint} ${shouldHighlight ? styles.subServicePointActive : ''} ${shouldHighlight ? styles.visible : ''} ${styles.fadeInScale}`}
            style={{
              left: `${subPoint.x}%`,
              top: `${subPoint.y}%`,
              '--animation-delay': `${(touchPoints.length * 0.15 + index * 0.05)}s`
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