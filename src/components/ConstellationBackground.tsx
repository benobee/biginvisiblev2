import { useRef, useEffect, useState } from 'react';
import { serviceConstellations, getAllServiceTouchPoints } from '../data/serviceConstellation';

interface FloatingParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  direction: number;
}

interface OrbitalPoint {
  id: number;
  radius: number;      // Distance from center
  angle: number;       // Current angle in orbit (radians)
  size: number;        // Point size (1-3px)
  opacity: number;     // Low opacity (0.1-0.3)
  speed: number;       // Angular velocity (calculated by Kepler's law)
  orbitTilt?: number;  // Optional tilt for 3D effect
  color: string;       // Point color
}

interface TouchPoint {
  id: string;
  name: string;
  x: number;
  y: number;
  radius: number;      // Orbital radius
  angle: number;       // Current angle in orbit
  speed: number;       // Angular velocity (Kepler's law)
  color: string;
  size: number;
  glow: number;
  type: 'service' | 'feature';
  connections?: string[];
  isActive: boolean;
}

const ConstellationBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(null);
  const [mounted, setMounted] = useState(false);
  const [touchPoints, setTouchPoints] = useState<TouchPoint[]>([]);
  const [particles, setParticles] = useState<FloatingParticle[]>([]);
  const [orbitalPoints, setOrbitalPoints] = useState<OrbitalPoint[]>([]);
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Ensure component is mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize canvas data after mounting
  useEffect(() => {
    if (!mounted) return;
    
    // Small delay to ensure canvas is ready
    const timer = setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const { width, height } = rect;
      
      if (width === 0 || height === 0) return;

      const serviceTouchPoints = getAllServiceTouchPoints();
      
      // Create orbital layout for services with different radii
      const centerX = width * 0.5;
      const centerY = height * 0.5;
      const minServiceRadius = Math.min(width, height) * 0.2;  // Closest service orbit
      const maxServiceRadius = Math.min(width, height) * 0.35; // Farthest service orbit
      
      const points: TouchPoint[] = serviceTouchPoints.map((service, index) => {
        // Distribute services across different orbital radii
        const radiusRange = maxServiceRadius - minServiceRadius;
        const radius = minServiceRadius + (radiusRange * (index / (serviceTouchPoints.length - 1)));
        
        // Initial angle - spread them out evenly but with some variation
        const baseAngle = (index / serviceTouchPoints.length) * Math.PI * 2;
        const angleVariation = (Math.random() - 0.5) * 0.3; // Add some randomness
        const angle = baseAngle + angleVariation;
        
        // Calculate orbital speed using Kepler's third law: speed ∝ 1/√radius
        const keplerConstant = 0.0005; // Adjust for visible but slow rotation
        const speed = keplerConstant / Math.sqrt(radius / minServiceRadius);
        
        // Initial position based on angle and radius
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        // Convert Color3 to hex
        const color = `rgb(${Math.round(service.color.r * 255)}, ${Math.round(service.color.g * 255)}, ${Math.round(service.color.b * 255)})`;
        
        return {
          id: service.id,
          name: service.name,
          x,
          y,
          radius,
          angle,
          speed,
          color,
          size: service.size,
          glow: service.glow,
          type: service.type,
          connections: service.connections || [],
          isActive: false
        };
      });

      setTouchPoints(points);

      // Create floating particles for space atmosphere
      const newParticles: FloatingParticle[] = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.6 + 0.2,
        speed: Math.random() * 0.5 + 0.1,
        direction: Math.random() * Math.PI * 2
      }));

      setParticles(newParticles);

      // Initialize orbital points
      const minRadius = Math.min(width, height) * 0.15;
      const maxRadius = Math.min(width, height) * 0.45;
      
      // Create 4 orbital rings with different radii
      const orbitalRings = [
        { radius: minRadius, points: 8, opacity: 0.4 },
        { radius: minRadius * 1.5, points: 10, opacity: 0.35 },
        { radius: minRadius * 2.2, points: 12, opacity: 0.3 },
        { radius: maxRadius, points: 15, opacity: 0.25 }
      ];

      const newOrbitalPoints: OrbitalPoint[] = [];
      let pointId = 0;

      orbitalRings.forEach((ring, ringIndex) => {
        const angleStep = (Math.PI * 2) / ring.points;
        
        for (let i = 0; i < ring.points; i++) {
          // Kepler's third law: T² ∝ r³, so speed ∝ 1/√r
          const keplerConstant = 0.002; // Reduced from 0.01 for slower orbits
          const orbitalSpeed = keplerConstant / Math.sqrt(ring.radius / minRadius);
          
          newOrbitalPoints.push({
            id: pointId++,
            radius: ring.radius,
            angle: i * angleStep + (ringIndex * Math.PI / 8),
            size: Math.random() * 2 + 1.5,
            opacity: ring.opacity * (0.8 + Math.random() * 0.4),
            speed: orbitalSpeed * (0.9 + Math.random() * 0.2),
            orbitTilt: ringIndex * 0.1,
            color: Math.random() > 0.5 ? 'rgba(64, 128, 255, 1)' : 'rgba(255, 255, 255, 1)'
          });
        }
      });

      setOrbitalPoints(newOrbitalPoints);
    }, 100); // 100ms delay to ensure canvas is ready

    return () => clearTimeout(timer);
  }, [mounted]);


  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      const { width, height } = canvas;
      const centerX = width * 0.5;
      const centerY = height * 0.5;
      
      // Clear canvas - transparent background
      ctx.clearRect(0, 0, width, height);

      // Update and draw orbital points (drawn first so they're in background)
      orbitalPoints.forEach(point => {
        // Update angle based on speed (Kepler's law)
        point.angle += point.speed;
        if (point.angle > Math.PI * 2) {
          point.angle -= Math.PI * 2;
        }

        // Calculate position with optional tilt for 3D effect
        const tiltedRadius = point.radius * (1 + Math.sin(point.angle * 2) * (point.orbitTilt || 0) * 0.1);
        const x = centerX + Math.cos(point.angle) * tiltedRadius;
        const y = centerY + Math.sin(point.angle) * point.radius * (1 - (point.orbitTilt || 0) * 0.2);

        // Draw orbital point with very low opacity
        ctx.beginPath();
        ctx.arc(x, y, point.size, 0, Math.PI * 2);
        
        // Apply color with opacity
        const baseColor = point.color.replace('1)', `${point.opacity})`);
        ctx.fillStyle = baseColor;
        ctx.fill();

        // Optional: Add a very subtle glow
        if (point.opacity > 0.15) {
          const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, point.size * 3);
          glowGradient.addColorStop(0, point.color.replace('1)', `${point.opacity * 0.5})`));
          glowGradient.addColorStop(1, 'transparent');
          ctx.fillStyle = glowGradient;
          ctx.fillRect(x - point.size * 3, y - point.size * 3, point.size * 6, point.size * 6);
        }
      });

      // Update and draw floating particles
      particles.forEach(particle => {
        // Move particle
        particle.x += Math.cos(particle.direction) * particle.speed;
        particle.y += Math.sin(particle.direction) * particle.speed;

        // Wrap around edges
        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity * 0.3})`;
        ctx.fill();
      });

      // Update service positions based on orbital motion
      touchPoints.forEach(point => {
        // Update angle based on Kepler's law speed
        point.angle += point.speed;
        if (point.angle > Math.PI * 2) {
          point.angle -= Math.PI * 2;
        }
        
        // Calculate new position based on updated angle
        point.x = centerX + Math.cos(point.angle) * point.radius;
        point.y = centerY + Math.sin(point.angle) * point.radius;
      });

      // Draw constellation connections
      touchPoints.forEach(point => {
        if (point.connections) {
          point.connections.forEach(connectionId => {
            const targetPoint = touchPoints.find(p => p.id === connectionId);
            if (targetPoint) {
              drawConnection(ctx, point, targetPoint);
            }
          });
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [touchPoints, particles, orbitalPoints, hoveredPoint]);

  // Draw constellation line between two points
  const drawConnection = (ctx: CanvasRenderingContext2D, from: TouchPoint, to: TouchPoint) => {
    const gradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
    
    // Convert RGB to RGBA with opacity for gradient stops
    const convertToRGBA = (color: string, opacity: number) => {
      const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (rgbMatch) {
        const [, r, g, b] = rgbMatch;
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
      }
      return color;
    };
    
    gradient.addColorStop(0, convertToRGBA(from.color, 0.38)); // 60 in hex is ~0.38 in decimal
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
    gradient.addColorStop(1, convertToRGBA(to.color, 0.38));

    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 6]);
    ctx.stroke();
    ctx.setLineDash([]);
  };

  // Draw star-like touch point
  const drawTouchPoint = (ctx: CanvasRenderingContext2D, point: TouchPoint, isHovered: boolean) => {
    const size = point.size * 8 * (isHovered ? 1.3 : 1);
    const glowSize = size * 2;

    // Draw glow effect
    const glowGradient = ctx.createRadialGradient(
      point.x, point.y, 0,
      point.x, point.y, glowSize
    );
    // Convert RGB to RGBA with opacity
    const rgbMatch = point.color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (rgbMatch) {
      const [, r, g, b] = rgbMatch;
      glowGradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.67)`); // AA in hex is ~0.67 in decimal
      glowGradient.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, 0.27)`); // 44 in hex is ~0.27 in decimal
    } else {
      glowGradient.addColorStop(0, point.color);
      glowGradient.addColorStop(0.3, point.color);
    }
    glowGradient.addColorStop(1, 'transparent');

    ctx.beginPath();
    ctx.arc(point.x, point.y, glowSize, 0, Math.PI * 2);
    ctx.fillStyle = glowGradient;
    ctx.fill();

    // Draw star shape
    drawStar(ctx, point.x, point.y, 5, size, size * 0.5, point.color);

    // Draw core
    ctx.beginPath();
    ctx.arc(point.x, point.y, size * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
  };

  // Draw a star shape
  const drawStar = (
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    spikes: number,
    outerRadius: number,
    innerRadius: number,
    color: string
  ) => {
    let rot = (Math.PI / 2) * 3;
    const step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);

    for (let i = 0; i < spikes; i++) {
      const x = cx + Math.cos(rot) * outerRadius;
      const y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      const x2 = cx + Math.cos(rot) * innerRadius;
      const y2 = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x2, y2);
      rot += step;
    }

    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    ctx.stroke();
  };

  // Handle canvas resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !mounted) return;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      // Only recalculate if we already have orbital points (not on initial load)
      if (rect.width > 0 && rect.height > 0 && orbitalPoints.length > 0) {
        const centerX = rect.width * 0.5;
        const centerY = rect.height * 0.5;
        const minRadius = Math.min(rect.width, rect.height) * 0.15;
        const maxRadius = Math.min(rect.width, rect.height) * 0.45;
        
        // Create 4 orbital rings with different radii
        const orbitalRings = [
          { radius: minRadius, points: 8, opacity: 0.4 },
          { radius: minRadius * 1.5, points: 10, opacity: 0.35 },
          { radius: minRadius * 2.2, points: 12, opacity: 0.3 },
          { radius: maxRadius, points: 15, opacity: 0.25 }
        ];

        const newOrbitalPoints: OrbitalPoint[] = [];
        let pointId = 0;

        orbitalRings.forEach((ring, ringIndex) => {
          const angleStep = (Math.PI * 2) / ring.points;
          
          for (let i = 0; i < ring.points; i++) {
            // Keep existing angles if possible to maintain continuity
            const existingPoint = orbitalPoints.find(p => p.id === pointId);
            const angle = existingPoint ? existingPoint.angle : (i * angleStep + (ringIndex * Math.PI / 8));
            
            const keplerConstant = 0.0008; // Reduced from 0.01 for slower orbits
            const orbitalSpeed = keplerConstant / Math.sqrt(ring.radius / minRadius);
            
            newOrbitalPoints.push({
              id: pointId++,
              radius: ring.radius,
              angle: angle,
              size: Math.random() * 2 + 1.5,
              opacity: ring.opacity * (0.8 + Math.random() * 0.4),
              speed: orbitalSpeed * (0.9 + Math.random() * 0.2),
              orbitTilt: ringIndex * 0.1,
              color: Math.random() > 0.5 ? 'rgba(64, 128, 255, 1)' : 'rgba(255, 255, 255, 1)'
            });
          }
        });

        setOrbitalPoints(newOrbitalPoints);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas);
    handleResize();

    return () => resizeObserver.disconnect();
  }, [mounted, orbitalPoints.length]);

  // Handle mouse interactions
  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    setMousePos({ x: event.clientX, y: event.clientY });

    // Check if mouse is over any touch point
    const hoveredPoint = touchPoints.find(point => {
      const distance = Math.sqrt(
        Math.pow(mouseX - point.x, 2) + Math.pow(mouseY - point.y, 2)
      );
      return distance < point.size * 15;
    });

    setHoveredPoint(hoveredPoint?.id || null);
  };

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Check if click is on any touch point
    const clickedPoint = touchPoints.find(point => {
      const distance = Math.sqrt(
        Math.pow(mouseX - point.x, 2) + Math.pow(mouseY - point.y, 2)
      );
      return distance < point.size * 15;
    });

    if (clickedPoint) {
      // Find corresponding service and scroll to services section
      const serviceSlug = clickedPoint.id.replace('-main', '');
      const servicesSection = document.getElementById('services');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Don't render until mounted on client
  if (!mounted) {
    return (
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full bg-transparent" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-auto cursor-pointer"
        onMouseMove={handleMouseMove}
        onClick={handleClick}
        style={{ background: 'transparent' }}
      />
      
      {/* Tooltip for hovered point */}
      {hoveredPoint && (
        <div 
          className="fixed pointer-events-none z-50 bg-black/90 text-white px-3 py-2 rounded-lg border border-white/20 text-sm backdrop-blur-sm"
          style={{
            left: mousePos.x + 10,
            top: mousePos.y - 10,
            transform: 'translateY(-100%)'
          }}
        >
          {touchPoints.find(p => p.id === hoveredPoint)?.name}
        </div>
      )}
    </div>
  );
};

export default ConstellationBackground;
