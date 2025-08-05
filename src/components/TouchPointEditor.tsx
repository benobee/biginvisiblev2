import { useState, useRef, useCallback, useEffect } from 'react';
import styles from './TouchPointEditor.module.css';

interface TouchPoint {
  id: string;
  name: string;
  x: number; // Percentage relative to image width
  y: number; // Percentage relative to image height
  type: 'service' | 'feature';
}

interface ImageDimensions {
  width: number;
  height: number;
  naturalWidth: number;
  naturalHeight: number;
}

interface TouchPointEditorProps {
  initialPoints?: TouchPoint[];
  backgroundImage?: string;
}

const TouchPointEditor = ({ initialPoints = [], backgroundImage }: TouchPointEditorProps) => {
  const [points, setPoints] = useState<TouchPoint[]>(initialPoints);
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [gridSize, setGridSize] = useState(10);
  const [backgroundUrl, setBackgroundUrl] = useState(backgroundImage || '');
  const [imageDimensions, setImageDimensions] = useState<ImageDimensions | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Calculate image position and dimensions within container
  const getImageRect = useCallback(() => {
    if (!containerRef.current || !imageDimensions) return null;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const containerAspect = containerRect.width / containerRect.height;
    const imageAspect = imageDimensions.naturalWidth / imageDimensions.naturalHeight;
    
    let imageWidth, imageHeight, offsetX, offsetY;
    
    if (imageAspect > containerAspect) {
      // Image is wider - fit to container width
      imageWidth = containerRect.width;
      imageHeight = containerRect.width / imageAspect;
      offsetX = 0;
      offsetY = (containerRect.height - imageHeight) / 2;
    } else {
      // Image is taller - fit to container height
      imageWidth = containerRect.height * imageAspect;
      imageHeight = containerRect.height;
      offsetX = (containerRect.width - imageWidth) / 2;
      offsetY = 0;
    }
    
    return {
      left: offsetX,
      top: offsetY,
      width: imageWidth,
      height: imageHeight
    };
  }, [imageDimensions]);

  // Convert container coordinates to image-relative coordinates
  const containerToImageCoords = useCallback((containerX: number, containerY: number) => {
    const imageRect = getImageRect();
    if (!imageRect) return { x: containerX, y: containerY };
    
    const imageX = ((containerX - imageRect.left) / imageRect.width) * 100;
    const imageY = ((containerY - imageRect.top) / imageRect.height) * 100;
    
    return {
      x: Math.max(0, Math.min(100, imageX)),
      y: Math.max(0, Math.min(100, imageY))
    };
  }, [getImageRect]);

  // Convert image-relative coordinates to container coordinates
  const imageToContainerCoords = useCallback((imageX: number, imageY: number) => {
    const imageRect = getImageRect();
    if (!imageRect) return { x: imageX, y: imageY };
    
    const containerX = (imageX / 100) * imageRect.width + imageRect.left;
    const containerY = (imageY / 100) * imageRect.height + imageRect.top;
    
    return { x: containerX, y: containerY };
  }, [getImageRect]);

  // Handle image load to get dimensions
  const handleImageLoad = useCallback(() => {
    if (imageRef.current) {
      setImageDimensions({
        width: imageRef.current.width,
        height: imageRef.current.height,
        naturalWidth: imageRef.current.naturalWidth,
        naturalHeight: imageRef.current.naturalHeight
      });
    }
  }, []);

  // Handle drag start
  const handleMouseDown = (e: React.MouseEvent, pointId: string) => {
    e.preventDefault();
    setSelectedPoint(pointId);
    setIsDragging(true);
  };

  // Handle drag
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !selectedPoint || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const containerX = e.clientX - rect.left;
    const containerY = e.clientY - rect.top;

    // Convert to image-relative coordinates
    const imageCoords = containerToImageCoords(containerX, containerY);

    // Snap to grid if enabled (grid is relative to image)
    const snappedX = showGrid ? Math.round(imageCoords.x / gridSize) * gridSize : imageCoords.x;
    const snappedY = showGrid ? Math.round(imageCoords.y / gridSize) * gridSize : imageCoords.y;

    // Clamp values between 0 and 100 (relative to image)
    const clampedX = Math.max(0, Math.min(100, snappedX));
    const clampedY = Math.max(0, Math.min(100, snappedY));

    setPoints(prev => prev.map(point => 
      point.id === selectedPoint 
        ? { ...point, x: clampedX, y: clampedY }
        : point
    ));
  }, [isDragging, selectedPoint, showGrid, gridSize, containerToImageCoords]);

  // Handle drag end
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add mouse event listeners
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [handleMouseMove, handleMouseUp]);

  // Add resize listener to handle container resizing
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        // Force re-render of points by updating image dimensions
        if (imageRef.current) {
          handleImageLoad();
        }
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [handleImageLoad]);

  // Add new point
  const addPoint = (type: 'service' | 'feature') => {
    const newPoint: TouchPoint = {
      id: `point-${Date.now()}`,
      name: `New ${type === 'service' ? 'Service' : 'Feature'}`,
      x: 50,
      y: 50,
      type
    };
    setPoints([...points, newPoint]);
  };

  // Delete point
  const deletePoint = (pointId: string) => {
    setPoints(points.filter(p => p.id !== pointId));
    if (selectedPoint === pointId) {
      setSelectedPoint(null);
    }
  };

  // Update point name
  const updatePointName = (pointId: string, name: string) => {
    setPoints(points.map(p => 
      p.id === pointId ? { ...p, name } : p
    ));
  };

  // Export positions
  const exportPositions = () => {
    const positions = points.map(({ id, name, x, y, type }) => ({
      id,
      name,
      x: Number(x.toFixed(2)),
      y: Number(y.toFixed(2)),
      type
    }));

    const dataStr = JSON.stringify(positions, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'touchpoint-positions.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Copy positions to clipboard
  const copyToClipboard = () => {
    const positions = points.map(({ name, x, y }) => 
      `{ x: ${x.toFixed(1)}, y: ${y.toFixed(1)} },   // ${name}`
    ).join('\n');

    navigator.clipboard.writeText(positions);
    alert('Positions copied to clipboard!');
  };

  return (
    <div className={styles.editor}>
      <div className={styles.toolbar}>
        <h2>Touch Point Position Editor</h2>
        
        <div className={styles.controls}>
          <button onClick={() => addPoint('service')} className={styles.button}>
            Add Service Point
          </button>
          <button onClick={() => addPoint('feature')} className={styles.button}>
            Add Feature Point
          </button>
          
          <label className={styles.checkbox}>
            <input 
              type="checkbox" 
              checked={showGrid} 
              onChange={(e) => setShowGrid(e.target.checked)}
            />
            Show Grid
          </label>
          
          {showGrid && (
            <label className={styles.gridControl}>
              Grid Size:
              <input 
                type="number" 
                min="1" 
                max="50" 
                value={gridSize}
                onChange={(e) => setGridSize(Number(e.target.value))}
                className={styles.gridInput}
              />
            </label>
          )}
          
          <input
            type="text"
            placeholder="Background image URL"
            value={backgroundUrl}
            onChange={(e) => setBackgroundUrl(e.target.value)}
            className={styles.urlInput}
          />
          
          <button onClick={exportPositions} className={styles.button}>
            Export JSON
          </button>
          <button onClick={copyToClipboard} className={styles.button}>
            Copy Positions
          </button>
        </div>
      </div>

      <div className={styles.workspace}>
        <div 
          ref={containerRef}
          className={styles.canvas}
        >
          {/* Hidden image for dimension calculation */}
          {backgroundUrl && (
            <img
              ref={imageRef}
              src={backgroundUrl}
              onLoad={handleImageLoad}
              className={styles.backgroundImage}
              alt="Background reference"
            />
          )}

          {/* Grid overlay */}
          {showGrid && imageDimensions && (
            <div 
              className={styles.grid}
              style={{
                ...(() => {
                  const imageRect = getImageRect();
                  if (!imageRect) return {};
                  
                  return {
                    left: `${imageRect.left}px`,
                    top: `${imageRect.top}px`,
                    width: `${imageRect.width}px`,
                    height: `${imageRect.height}px`,
                    backgroundSize: `${(imageRect.width * gridSize) / 100}px ${(imageRect.height * gridSize) / 100}px`
                  };
                })()
              }}
            />
          )}

          {/* Touch points */}
          {points.map((point) => {
            const containerCoords = imageToContainerCoords(point.x, point.y);
            const imageRect = getImageRect();
            
            // Only show point if image is loaded and point is within image bounds
            if (!imageRect) return null;
            
            return (
              <div
                key={point.id}
                className={`${styles.point} ${styles[point.type]} ${selectedPoint === point.id ? styles.selected : ''}`}
                style={{
                  left: `${containerCoords.x}px`,
                  top: `${containerCoords.y}px`,
                }}
                onMouseDown={(e) => handleMouseDown(e, point.id)}
              >
                <div className={styles.pointInner} />
                <div className={styles.pointLabel}>
                  {point.name}
                </div>
                <div className={styles.coordinates}>
                  {point.x.toFixed(1)}, {point.y.toFixed(1)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Point properties panel */}
        {selectedPoint && (
          <div className={styles.propertiesPanel}>
            <h3>Point Properties</h3>
            {points.filter(p => p.id === selectedPoint).map(point => (
              <div key={point.id} className={styles.properties}>
                <label>
                  Name:
                  <input
                    type="text"
                    value={point.name}
                    onChange={(e) => updatePointName(point.id, e.target.value)}
                  />
                </label>
                
                <label>
                  X Position:
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={point.x.toFixed(1)}
                    onChange={(e) => {
                      const x = Number(e.target.value);
                      setPoints(points.map(p => 
                        p.id === point.id ? { ...p, x } : p
                      ));
                    }}
                  />
                </label>
                
                <label>
                  Y Position:
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={point.y.toFixed(1)}
                    onChange={(e) => {
                      const y = Number(e.target.value);
                      setPoints(points.map(p => 
                        p.id === point.id ? { ...p, y } : p
                      ));
                    }}
                  />
                </label>
                
                <label>
                  Type:
                  <select 
                    value={point.type}
                    onChange={(e) => {
                      const type = e.target.value as 'service' | 'feature';
                      setPoints(points.map(p => 
                        p.id === point.id ? { ...p, type } : p
                      ));
                    }}
                  >
                    <option value="service">Service</option>
                    <option value="feature">Feature</option>
                  </select>
                </label>
                
                <button 
                  onClick={() => deletePoint(point.id)}
                  className={styles.deleteButton}
                >
                  Delete Point
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TouchPointEditor;