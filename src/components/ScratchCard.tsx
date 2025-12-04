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

    // Create metallic silver gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#b8b8b8');
    gradient.addColorStop(0.3, '#d0d0d0');
    gradient.addColorStop(0.5, '#e8e8e8');
    gradient.addColorStop(0.7, '#d0d0d0');
    gradient.addColorStop(1, '#b8b8b8');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add scratch texture
    ctx.globalAlpha = 0.4;
    for (let i = 0; i < width; i += 3) {
      for (let j = 0; j < height; j += 3) {
        if (Math.random() > 0.6) {
          ctx.fillStyle = Math.random() > 0.5 ? '#c0c0c0' : '#a8a8a8';
          ctx.fillRect(i, j, 2, 2);
        }
      }
    }
    ctx.globalAlpha = 1;

    // Add "SCRATCH TO REVEAL" text
    ctx.fillStyle = '#777';
    ctx.font = 'bold 12px DM Sans';
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
    
    const radius = 28;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
    gradient.addColorStop(0.8, 'rgba(0, 0, 0, 0.8)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    const percentage = calculateScratchPercentage();
    setScratchPercentage(percentage);

    if (percentage > 45 && !isRevealed) {
      setIsRevealed(true);
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
        className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-primary via-primary to-[hsl(145,72%,38%)] text-primary-foreground p-4 transition-all duration-500 ${
          isRevealed ? 'animate-scale-in' : ''
        }`}
      >
        <span className="text-[10px] font-medium opacity-80 mb-0.5">{brandName}</span>
        <span className="text-xl font-bold mb-1">{discount}</span>
        <div className="bg-primary-foreground/20 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-primary-foreground/30">
          <span className="text-[10px] opacity-80">Code:</span>
          <p className="text-base font-bold tracking-wider">{couponCode}</p>
        </div>
        {isRevealed && (
          <button className="mt-2 bg-primary-foreground text-primary px-5 py-1.5 rounded-full text-xs font-semibold hover:scale-105 transition-transform shadow-lg">
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
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 bg-foreground/80 text-card text-[10px] px-2 py-0.5 rounded-full">
          {Math.round(scratchPercentage)}%
        </div>
      )}
    </div>
  );
};

export default ScratchCard;
