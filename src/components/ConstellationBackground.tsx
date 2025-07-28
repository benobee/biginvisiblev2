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
  isActive: boolean;
}

const ConstellationBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(null);
  const [mounted, setMounted] = useState(false);
  const [touchPoints, setTouchPoints] = useState<TouchPoint[]>([]);
  const [particles, setParticles] = useState<FloatingParticle[]>([]);
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Ensure component is mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Convert serviceConstellation data to 2D touch points
  useEffect(() => {
    if (!mounted) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { width, height } = canvas.getBoundingClientRect();
    const serviceTouchPoints = getAllServiceTouchPoints();

    console.log({ serviceConstellations });
    
    // Create 2D constellation layout
    const points: TouchPoint[] = serviceTouchPoints.map((service, index) => {
      const angle = (index / serviceTouchPoints.length) * Math.PI * 2;
      const radius = Math.min(width, height) * 0.3;
      const centerX = width * 0.5;
      const centerY = height * 0.5;
      
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      // Convert Color3 to hex
      const color = `rgb(${Math.round(service.color.r * 255)}, ${Math.round(service.color.g * 255)}, ${Math.round(service.color.b * 255)})`;
      
      return {
        id: service.id,
        name: service.name,
        x,
        y,
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
  }, [mounted]);

  // Draw blueprint grid
  const drawBlueprintGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const gridSize = 50; // Grid spacing
    const subGridSize = 10; // Sub-grid spacing
    
    // Set grid style
    ctx.lineWidth = 0.5;
    
    // Draw main grid lines
    ctx.strokeStyle = 'rgba(64, 128, 255, 0.2)'; // Blue grid lines
    ctx.beginPath();
    
    // Vertical lines
    for (let x = 0; x <= width; x += gridSize) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    
    // Horizontal lines
    for (let y = 0; y <= height; y += gridSize) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    
    ctx.stroke();
    
    // Draw sub-grid lines (finer grid)
    ctx.strokeStyle = 'rgba(64, 128, 255, 0.08)'; // Fainter blue for sub-grid
    ctx.lineWidth = 0.3;
    ctx.beginPath();
    
    // Vertical sub-grid lines
    for (let x = 0; x <= width; x += subGridSize) {
      if (x % gridSize !== 0) { // Skip main grid lines
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
    }
    
    // Horizontal sub-grid lines
    for (let y = 0; y <= height; y += subGridSize) {
      if (y % gridSize !== 0) { // Skip main grid lines
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
    }
    
    ctx.stroke();
    
    // Add grid coordinates/markers at main intersections
    ctx.fillStyle = 'rgba(64, 128, 255, 0.3)';
    ctx.font = '8px monospace';
    
    for (let x = gridSize; x < width; x += gridSize * 2) {
      for (let y = gridSize; y < height; y += gridSize * 2) {
        // Small dot at intersection
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fill();
        
        // Optional: Add coordinate text (uncomment if desired)
        // const coordText = `${Math.floor(x/gridSize)},${Math.floor(y/gridSize)}`;
        // ctx.fillText(coordText, x + 3, y - 3);
      }
    }
  };

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      const { width, height } = canvas;
      
      // Clear canvas with dark background
      ctx.fillStyle = 'rgba(5, 15, 25, 0.95)';
      ctx.fillRect(0, 0, width, height);
      
      // Draw blueprint grid background
      drawBlueprintGrid(ctx, width, height);

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

      // Draw touch points (stars)
      touchPoints.forEach(point => {
        drawTouchPoint(ctx, point, hoveredPoint === point.id);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [touchPoints, particles, hoveredPoint]);

  // Draw constellation line between two points
  const drawConnection = (ctx: CanvasRenderingContext2D, from: TouchPoint, to: TouchPoint) => {
    const gradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
    gradient.addColorStop(0, from.color + '60');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
    gradient.addColorStop(1, to.color + '60');

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
    glowGradient.addColorStop(0, point.color + 'AA');
    glowGradient.addColorStop(0.3, point.color + '44');
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
    if (!canvas) return;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas);
    handleResize();

    return () => resizeObserver.disconnect();
  }, []);

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