const BackgroundPattern = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-[0.15]">
      {/* Repeating text pattern */}
      <div className="absolute inset-0 flex flex-col justify-center gap-4 -rotate-12 scale-150">
        {Array.from({ length: 20 }).map((_, rowIndex) => (
          <div 
            key={rowIndex} 
            className="flex gap-8 whitespace-nowrap"
            style={{
              transform: `translateX(${rowIndex % 2 === 0 ? '-50px' : '0px'})`,
            }}
          >
            {Array.from({ length: 8 }).map((_, colIndex) => (
              <span 
                key={colIndex}
                className="text-foreground/80 text-2xl font-bold tracking-wider"
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
