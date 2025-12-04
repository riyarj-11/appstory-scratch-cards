import { useEffect, useState } from 'react';

const BackgroundPattern = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Repeating text pattern with animation */}
      <div 
        className={`absolute inset-0 flex flex-col justify-center gap-3 -rotate-12 scale-150 transition-opacity duration-1000 ${
          isAnimating ? 'opacity-[0.08]' : 'opacity-0'
        }`}
        style={{
          animation: isAnimating ? 'pattern-scroll 25s linear infinite' : 'none'
        }}
      >
        {Array.from({ length: 30 }).map((_, rowIndex) => (
          <div 
            key={rowIndex} 
            className="flex gap-6 whitespace-nowrap"
            style={{
              transform: `translateX(${rowIndex % 2 === 0 ? '-80px' : '0px'})`,
            }}
          >
            {Array.from({ length: 15 }).map((_, colIndex) => (
              <span 
                key={colIndex}
                className="text-foreground text-lg font-bold tracking-widest uppercase"
              >
                SCRATCH CARDS
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BackgroundPattern;
