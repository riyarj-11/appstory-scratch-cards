import { useRef, useEffect, useState, useCallback } from 'react';

interface ScratchCardProps {
  width: number;
  height: number;
  couponCode: string;
  discount: string;
  brandName: string;
  onReveal?: () => void;
}

const ScratchCard = ({ width, height, couponCode, discount, brandName, onReveal }: ScratchCardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercentage, setScratchPercentage] = useState(0);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create gradient scratch layer
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#c0c0c0');
    gradient.addColorStop(0.5, '#d4d4d4');
    gradient.addColorStop(1, '#a8a8a8');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add scratch pattern texture
    ctx.globalAlpha = 0.3;
    for (let i = 0; i < width; i += 4) {
      for (let j = 0; j < height; j += 4) {
        if (Math.random() > 0.5) {
          ctx.fillStyle = '#b0b0b0';
          ctx.fillRect(i, j, 2, 2);
        }
      }
    }
    ctx.globalAlpha = 1;

    // Add "SCRATCH HERE" text
    ctx.fillStyle = '#888';
    ctx.font = 'bold 14px DM Sans';
    ctx.textAlign = 'center';
    ctx.fillText('✨ SCRATCH TO REVEAL ✨', width / 2, height / 2);
  }, [width, height]);

  useEffect(() => {
    initCanvas();
  }, [initCanvas]);

  const calculateScratchPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;

    const ctx = canvas.getContext('2d');
    if (!ctx) return 0;

    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparentPixels++;
    }

    return (transparentPixels / (pixels.length / 4)) * 100;
  }, [width, height]);

  const scratch = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    
    // Create circular scratch effect
    const radius = 25;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    const percentage = calculateScratchPercentage();
    setScratchPercentage(percentage);

    if (percentage > 50 && !isRevealed) {
      setIsRevealed(true);
      // Clear remaining scratch layer
      ctx.clearRect(0, 0, width, height);
      onReveal?.();
    }
  }, [isRevealed, calculateScratchPercentage, width, height, onReveal]);

  const getPosition = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsScratching(true);
    const { x, y } = getPosition(e);
    scratch(x, y);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isScratching) return;
    const { x, y } = getPosition(e);
    scratch(x, y);
  };

  const handleEnd = () => {
    setIsScratching(false);
  };

  return (
    <div 
      className="relative overflow-hidden rounded-xl"
      style={{ width, height }}
    >
      {/* Revealed content underneath */}
      <div 
        className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-4 transition-all duration-500 ${
          isRevealed ? 'animate-scale-in' : ''
        }`}
      >
        <span className="text-xs font-medium opacity-80 mb-1">{brandName}</span>
        <span className="text-2xl font-bold mb-2">{discount}</span>
        <div className="bg-card/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-primary-foreground/20">
          <span className="text-xs opacity-80">Code:</span>
          <p className="text-lg font-bold tracking-wider">{couponCode}</p>
        </div>
        {isRevealed && (
          <button className="mt-3 bg-primary-foreground text-primary px-6 py-2 rounded-full text-sm font-semibold hover:scale-105 transition-transform">
            Claim Now
          </button>
        )}
      </div>

      {/* Scratch layer */}
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className={`absolute inset-0 cursor-crosshair touch-none transition-opacity duration-300 ${
          isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      />

      {/* Progress indicator */}
      {!isRevealed && scratchPercentage > 0 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-foreground/80 text-background text-xs px-2 py-1 rounded-full">
          {Math.round(scratchPercentage)}% revealed
        </div>
      )}
    </div>
  );
};

export default ScratchCard;
