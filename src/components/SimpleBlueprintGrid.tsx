import { useState, useEffect, useRef } from 'react';
import { getAllSimpleServiceTouchPoints, simpleServiceConstellations } from '../data/serviceConstellationSimple';
import styles from './SimpleBlueprintGrid.module.css';

interface TouchPoint {
  id: string;
  name: string;
  x?: number;
  y?: number;
  orbital?: {
    radius: number;
    angle: number;
    elevation: number;
    rotationSpeed: number;
    eccentricity?: number;
  };
  color: string;
  size: number;
  glow: number;
  type: 'service' | 'feature';
  connections?: string[];
  parentId?: string;
}

// Create 3D orbital layout with touch points rotating around center
const createTouchPoints = () => {
  const serviceTouchPoints = getAllSimpleServiceTouchPoints();
  
  // Define orbital rings with different radii and elevations for 3D effect.
  // Compute radii with wider spacing so services are almost equally spaced visually.
  const ringCount = 3;
  const baseRadius = 250; // Increased base radius for larger orbits
  const ringSpacing = 100; // Increased spacing between rings

  // Use a single uniform rotation speed for all service rings so they rotate together
  const uniformRotationSpeed = (1 / 3) * 2; // Increased by 2x from the 3x slowdown = 2/3 speed
  const orbitalRings = Array.from({ length: ringCount }, (_, i) => {
    const elevations = [0, 30, -20];
    return {
      radius: baseRadius + i * ringSpacing,
      elevation: elevations[i] ?? 0,
      rotationSpeed: uniformRotationSpeed
    };
  });
  
  return serviceTouchPoints.map((service, index) => {
    // Use service ID for deterministic randomization
    const seedValue = service.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const pseudoRandom1 = ((seedValue * 9301 + 49297) % 233280) / 233280;
    const pseudoRandom2 = ((seedValue * 13597 + 24631) % 233280) / 233280;
    const pseudoRandom3 = ((seedValue * 7919 + 31627) % 233280) / 233280;
    
    // Give each service its own unique orbit radius to prevent clustering
    // Distribute services across a range from baseRadius to maxRadius
    const minRadius = 250;
    const maxRadius = 450;
    const radiusRange = maxRadius - minRadius;
    
    // Each service gets its own orbit based on index + some randomization
    const baseOrbitalRadius = minRadius + (index / serviceTouchPoints.length) * radiusRange;
    const radiusVariation = 30; // Smaller variation to maintain separation
    const randomizedRadius = baseOrbitalRadius + (pseudoRandom1 - 0.5) * radiusVariation;
    
    // Calculate initial angle with controlled randomization
    const total = serviceTouchPoints.length;
    const baseAngle = (index / total) * (2 * Math.PI);
    const angleVariation = (Math.PI / 6); // Reduced to 30 degrees to prevent overlap
    const initialAngle = baseAngle + (pseudoRandom2 - 0.5) * angleVariation;
    
    // Vary elevation based on radius for more 3D depth
    const elevationBase = (pseudoRandom3 - 0.5) * 40;
    const ring = orbitalRings[0]; // Use base ring for speed reference
    
    // Calculate speed based on orbital radius - larger orbits are slower (Kepler's laws)
    // Inner orbits (250 radius) rotate faster, outer orbits (450 radius) rotate slower
    const radiusFactor = minRadius / randomizedRadius; // Will be 1.0 for innermost, ~0.55 for outermost
    const baseSpeed = uniformRotationSpeed * radiusFactor; // Apply inverse relationship
    
    // Convert Color to RGB string
    const color = `rgb(${Math.round(service.color.r * 255)}, ${Math.round(service.color.g * 255)}, ${Math.round(service.color.b * 255)})`;
    
    // Create connections between services (not to features)
    let serviceConnections: string[] = [];
    if (index < serviceTouchPoints.length - 1) {
      // Connect to next service
      serviceConnections.push(serviceTouchPoints[index + 1].id);
    }
    if (index === serviceTouchPoints.length - 1) {
      // Last service connects back to first (creating a circle)
      serviceConnections.push(serviceTouchPoints[0].id);
    }
    // Also connect to service 2 positions away for more interesting network
    if (serviceTouchPoints.length > 3) {
      const targetIndex = (index + 2) % serviceTouchPoints.length;
      serviceConnections.push(serviceTouchPoints[targetIndex].id);
    }
    
    // Determine if this orbit should be elliptical
    // Make some orbits elliptical based on pseudorandom value
    const shouldBeElliptical = pseudoRandom1 > 0.4; // 60% chance of being elliptical
    const eccentricity = shouldBeElliptical ? 0.3 + (pseudoRandom2 * 0.4) : 0; // Eccentricity between 0.3-0.7 for elliptical orbits
    
    return {
      id: service.id,
      name: service.name,
      // Store 3D orbital properties with unique radius for each service
      orbital: {
        radius: randomizedRadius,
        angle: initialAngle,
        elevation: elevationBase, // Unique elevation per service
        rotationSpeed: baseSpeed * (0.8 + pseudoRandom3 * 0.4), // Add some variation (0.8x to 1.2x) to the radius-based speed
        eccentricity: eccentricity // Add eccentricity for elliptical orbits
      },
      color,
      size: service.size,
      glow: service.glow,
      type: service.type,
      connections: serviceConnections
    };
  });
};

// Calculate 3D position from orbital coordinates
const calculate3DPosition = (orbital: { radius: number; angle: number; elevation: number; rotationSpeed: number; eccentricity?: number }, rotationOffset: number = 0, containerWidth: number = 800, containerHeight: number = 600) => {
  // Use viewport measurements when available so orbits center on the fixed "Your brand" title.
  const cw = (typeof window !== 'undefined') ? window.innerWidth : containerWidth;
  const ch = (typeof window !== 'undefined') ? window.innerHeight : containerHeight;

  const centerX = cw / 2; // centeredTitle is positioned at viewport center
  const centerY = ch / 2;

  // Scale orbital radii relative to viewport so circles fit visually around the title.
  const scaleFactor = Math.min(cw, ch) / 800;
  const maxOrbit = Math.min(cw, ch) * 0.42; // keep orbits within ~84% of the smaller viewport dimension

  // Apply rotation offset for scroll-based rotation
  const currentAngle = orbital.angle + (rotationOffset * orbital.rotationSpeed);

  // Constrain radius so orbits form a near-circle within the screen size around the title
  const effectiveRadius = Math.min(orbital.radius * scaleFactor, maxOrbit);

  // Calculate elliptical orbit if eccentricity is provided
  // Eccentricity determines how stretched the ellipse is (0 = circle, 1 = very stretched)
  const eccentricity = orbital.eccentricity || 0;
  
  // For wider screens, stretch the orbit horizontally
  const aspectRatio = cw / ch;
  const horizontalStretch = aspectRatio > 1 ? 1 + (eccentricity * (aspectRatio - 1)) : 1;
  const verticalCompress = aspectRatio > 1 ? 1 - (eccentricity * 0.2) : 1; // Slightly compress vertically for more elliptical shape
  
  // Calculate 3D coordinates with elliptical adjustments
  const x3d = Math.cos(currentAngle) * effectiveRadius * horizontalStretch;
  const y3d = Math.sin(currentAngle) * effectiveRadius * verticalCompress;
  const z3d = Math.sin(currentAngle * 0.5) * (orbital.elevation * scaleFactor); // scaled elevation

  // Project to 2D screen coordinates with perspective
  const perspective = 1000;
  const scale = perspective / (perspective + z3d);

  const screenX = centerX + (x3d * scale);
  const screenY = centerY + (y3d * scale);

  // Convert to percentages (allow values outside 0-100 to avoid snapping/clamping)
  const xPercent = (screenX / cw) * 100;
  const yPercent = (screenY / ch) * 100;

  return {
    x: xPercent,
    y: yPercent,
    scale: scale,
    depth: z3d
  };
};

// Create sub-service touch points positioned around their parent services
const createSubServiceTouchPoints = (serviceTouchPoints: TouchPoint[]) => {
  const subServices: TouchPoint[] = [];
  
  simpleServiceConstellations.forEach((constellation) => {
    const parentService = serviceTouchPoints.find(s => s.id === constellation.touchPoints.find(tp => tp.type === 'service')?.id);
    if (!parentService || !parentService.orbital) return;
    
    const featurePoints = constellation.touchPoints.filter(tp => tp.type === 'feature');
    
    featurePoints.forEach((feature, index) => {
      if (!parentService.orbital) return;
      
      // Create orbital rings around parent service - increased distance for better visibility
      const subOrbitalRadius = 200 + (index * 75); // 5x increase: base 40->200, spacing 15->75
      const subAngle = (index * (2 * Math.PI / featurePoints.length)); // Even distribution
      
      // Randomize each sub-service speed independently
      // Use a seeded random based on feature ID to ensure consistency across renders
      const seedValue = feature.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const pseudoRandom = ((seedValue * 9301 + 49297) % 233280) / 233280; // Simple LCG for deterministic "random"
      
      // Speed inversely proportional to orbit radius (bigger orbits = slower speed)
      // Closer sub-services (200 radius) rotate faster, farther ones slower
      const radiusFactor = 200 / subOrbitalRadius; // Will be 1.0 for closest, lower for farther
      
      // Base speed range with radius factor applied - slowed down by 3x
      const minSpeed = (1.0 * radiusFactor) / 3;
      const maxSpeed = (4.5 * radiusFactor) / 3;
      
      // Add some randomization within the range
      const moonRotationSpeed = minSpeed + (pseudoRandom * (maxSpeed - minSpeed));
      
      const color = `rgb(${Math.round(feature.color.r * 255)}, ${Math.round(feature.color.g * 255)}, ${Math.round(feature.color.b * 255)})`;
      
      subServices.push({
        id: feature.id,
        name: feature.name,
        orbital: {
          radius: subOrbitalRadius,
          angle: subAngle,
          elevation: parentService.orbital.elevation + (index * 2), // Slight elevation offset
          rotationSpeed: moonRotationSpeed // Moons have their own faster rotation speed
        },
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
  const [rotationOffset, setRotationOffset] = useState(0);
  
  // Auto-rotation effect - continuous slow rotation
  useEffect(() => {
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    
    let animationId: number;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000; // Convert to seconds
      const rotationSpeed = (0.1 / 3) * 2; // Increased by 2x from the 3x slowdown (radians per second)
      setRotationOffset(elapsed * rotationSpeed);
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  // Calculate current 3D positions for all touch points (use container size when available)
  const currentTouchPointPositions = touchPoints.map(point => {
    if (!point.orbital) return { x: 50, y: 50, scale: 1, depth: 0 };

    const cw = containerRef.current?.clientWidth ?? 800;
    const ch = containerRef.current?.clientHeight ?? 600;
    const pos = calculate3DPosition(point.orbital, rotationOffset, cw, ch);

    // Determine visibility locally (mirror service visibility logic)
    const prefersReducedLocal = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const showServicesLocal = prefersReducedLocal || (gridVisible && progress >= 0.95);

    // When services are visible, ensure points land within a visible band so they appear on screen after reveal.
    if (showServicesLocal) {
      return {
        x: Math.max(2, Math.min(98, pos.x)),
        y: Math.max(2, Math.min(98, pos.y)),
        scale: pos.scale,
        depth: pos.depth
      };
    }

    return pos;
  });
  
  const currentSubServicePositions = subServicePoints.map(subPoint => {
    if (!subPoint.orbital) return { x: 50, y: 50, scale: 1, depth: 0 };
    const parent = touchPoints.find(p => p.id === subPoint.parentId);
    if (!parent || !parent.orbital) {
      // Fallback to global projection if parent not found
      const cw = containerRef.current?.clientWidth ?? 800;
      const ch = containerRef.current?.clientHeight ?? 600;
      return calculate3DPosition(subPoint.orbital, rotationOffset, cw, ch);
    }

    // Use container dimensions when available
    const cw = containerRef.current?.clientWidth ?? 800;
    const ch = containerRef.current?.clientHeight ?? 600;
    const scaleFactor = Math.min(cw, ch) / 800;
    const maxOrbit = Math.min(cw, ch) * 0.42;
    const centerX = cw / 2;
    const centerY = ch / 2;

    // Compute parent's current world position (planet position) - accounting for elliptical orbits
    const parentAngle = parent.orbital.angle + (rotationOffset * parent.orbital.rotationSpeed);
    const parentEffectiveRadius = Math.min(parent.orbital.radius * scaleFactor, maxOrbit);
    
    // Apply elliptical adjustments to parent position (same as in calculate3DPosition)
    const eccentricity = parent.orbital.eccentricity || 0;
    const aspectRatio = cw / ch;
    const horizontalStretch = aspectRatio > 1 ? 1 + (eccentricity * (aspectRatio - 1)) : 1;
    const verticalCompress = aspectRatio > 1 ? 1 - (eccentricity * 0.2) : 1;
    
    const x3d_p = Math.cos(parentAngle) * parentEffectiveRadius * horizontalStretch;
    const y3d_p = Math.sin(parentAngle) * parentEffectiveRadius * verticalCompress;
    const z3d_p = Math.sin(parentAngle * 0.5) * (parent.orbital.elevation * scaleFactor);

    // Compute moon's local orbit around the parent planet
    // Moons rotate independently with their own speed
    const moonAngle = subPoint.orbital.angle + (rotationOffset * subPoint.orbital.rotationSpeed);
    const moonRadius = subPoint.orbital.radius * scaleFactor * 0.5; // Adjusted scale for larger orbits
    
    // Calculate moon's position relative to parent
    const x3d_moon = Math.cos(moonAngle) * moonRadius;
    const y3d_moon = Math.sin(moonAngle) * moonRadius;
    // Add a slight vertical oscillation for more interesting 3D motion
    const z3d_moon = Math.sin(moonAngle * 2) * 10 * scaleFactor;

    // Combine parent and moon positions (moon orbits around moving parent)
    const x3d = x3d_p + x3d_moon;
    const y3d = y3d_p + y3d_moon;
    const z3d = z3d_p + z3d_moon;

    // Project to 2D screen coordinates with perspective
    const perspective = 1000;
    const scale = perspective / (perspective + z3d);
    const screenX = centerX + (x3d * scale);
    const screenY = centerY + (y3d * scale);

    // Convert to percentages
    const xPercent = (screenX / cw) * 100;
    const yPercent = (screenY / ch) * 100;

    // Determine local visibility for sub-services
    const prefersReducedLocal = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const showSubServicesLocal = prefersReducedLocal || (gridVisible && progress >= 0.85);

    if (showSubServicesLocal) {
      return {
        x: Math.max(2, Math.min(98, xPercent)),
        y: Math.max(2, Math.min(98, yPercent)),
        scale,
        depth: z3d
      };
    }

    return {
      x: xPercent,
      y: yPercent,
      scale,
      depth: z3d
    };
  });

  // Calculate visibility states based on progress thresholds
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Use the same thresholds as the CSS-controlled reveals below
  const particleThreshold = 0.05;
  const subServiceThreshold = 0.35;  
  const serviceThreshold = 0.35;

  const showParticles = prefersReduced || (gridVisible && progress >= particleThreshold);
  const showSubServices = prefersReduced || (gridVisible && progress >= subServiceThreshold);
  const showServices = prefersReduced || (gridVisible && progress >= serviceThreshold);

  // Debug info for Visual Identity rendering issues
  const visualIndex = touchPoints.findIndex(p => p.id === 'visual-identity-main');
  const visualPos = visualIndex !== -1 ? currentTouchPointPositions[visualIndex] : null;
  console.log('DEBUG visual-identity', {
    visualIndex,
    visualPos,
    showServices,
    showSubServices,
    gridVisible,
    progress
  });

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
    const subServiceThreshold = 0.45; // sub-services appear near bottom
    const serviceThreshold = 0.45; // services appear only at very bottom

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

      {/* Connection Lines - SVG approach for better dotted lines */}
      <svg className={styles.connectionsContainer}>
        {subServicePoints.map((subPoint, subIndex) => {
          const parentPointIndex = touchPoints.findIndex(p => p.id === subPoint.parentId);
          const isParentHovered = hoveredPoint === subPoint.parentId;
          const isActive = activePoint === subPoint.parentId;
          const shouldShowLine = isActive || isParentHovered;
          
          // Don't render sub-service connection lines unless sub-services are visible
          if (!showSubServices || parentPointIndex === -1 || !shouldShowLine) return null;
          
          const parentPos = currentTouchPointPositions[parentPointIndex];
          const subPos = currentSubServicePositions[subIndex];
          
          return (
            <line
              key={`line-${subPoint.id}`}
              x1={`${parentPos.x}%`}
              y1={`${parentPos.y}%`}
              x2={`${subPos.x}%`}
              y2={`${subPos.y}%`}
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
      {showServices && touchPoints.map((point, index) => {
        // Ensure color string exists for rendering (handles object or string)
        let colorStr: any = point.color as any;
        if (typeof colorStr !== 'string' && colorStr && typeof colorStr.r === 'number') {
          colorStr = `rgb(${Math.round(colorStr.r * 255)}, ${Math.round(colorStr.g * 255)}, ${Math.round(colorStr.b * 255)})`;
        }
        const isActive = activePoint === point.id;
        const isHovered = hoveredPoint === point.id;
        const currentPos = currentTouchPointPositions[index];
        const isNearTop = currentPos.y < 40; // Check if touch point is in top 40% of screen
        
        // Calculate opacity based on depth (farther points are more transparent)
        const depthOpacity = Math.max(0.3, Math.min(1, (currentPos.scale - 0.5) * 2));
        const finalOpacity = showServices ? depthOpacity : 0;

        // Debug / temporary override for specific services that are not rendering their dot
        let computedOpacity = finalOpacity;
        let computedZIndex = Math.round(100 + currentPos.depth);

        return (
          <div
            key={point.id}
            className={`${styles.touchPoint} ${isActive ? styles.touchPointActive : ''} ${showServices ? styles.touchPointVisible : ''}`}
            style={{
              left: `${currentPos.x}%`,
              top: `${currentPos.y}%`,
              transform: `translate(-50%, -50%) scale(${currentPos.scale})`,
              '--animation-delay': `${index * 0.15}s`,
              zIndex: computedZIndex
            } as React.CSSProperties}
            onClick={() => handleClick()}
            onMouseEnter={() => handleMouseEnter(point.id)}
            onMouseLeave={() => handleMouseLeave()}
          >
            <div className={styles.hotspotMarker}>
              <div 
                className={styles.hotspotOuter}
                style={{
                  borderColor: (typeof point.color === 'string' && point.color.startsWith('rgb')) ? point.color.replace('rgb(', 'rgba(').replace(')', ',0.5)') : `${point.color}80` // 50% opacity
                }}
              />
              <div 
                className={styles.hotspotInner}
                style={{
                  background: (typeof point.color === 'string' && point.color.startsWith('rgb')) ? point.color.replace('rgb(', 'rgba(').replace(')', ',0.9)') : `${point.color}e6` // 90% opacity
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
      {showSubServices && subServicePoints.map((subPoint, index) => {
        const isParentHovered = hoveredPoint === subPoint.parentId;
        const isActive = activePoint === subPoint.parentId;
        const shouldHighlight = isActive || isParentHovered;
        const currentPos = currentSubServicePositions[index];
        
        // Calculate opacity based on depth
        const depthOpacity = Math.max(0.1, Math.min(0.4, (currentPos.scale - 0.5) * 0.8));
        const finalOpacity = showSubServices ? depthOpacity : 0;
        
        return (
          <div
            key={subPoint.id}
            className={`${styles.subServicePoint} ${shouldHighlight ? styles.subServicePointActive : ''} ${showSubServices ? styles.subServicePointVisible : ''}`}
            style={{
              left: `${currentPos.x}%`,
              top: `${currentPos.y}%`,
              transform: `translate(-50%, -50%) scale(${currentPos.scale})`,
              '--animation-delay': `${(touchPoints.length * 0.15 + index * 0.05)}s`,
              zIndex: Math.round(50 + currentPos.depth)
            } as React.CSSProperties}
          >
            <div className={styles.subServiceMarker}>
              <div 
                className={styles.subServiceInner}
                style={{
                  background: (typeof subPoint.color === 'string' && subPoint.color.startsWith('rgb')) ? subPoint.color.replace('rgb(', 'rgba(').replace(')', ',0.9)') : `${subPoint.color}e6` // 90% opacity
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
