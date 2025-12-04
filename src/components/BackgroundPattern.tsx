const BackgroundPattern = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Repeating text pattern with animation */}
      <div className="absolute inset-0 flex flex-col justify-center gap-3 animate-pattern-scroll opacity-[0.12]">
        {Array.from({ length: 25 }).map((_, rowIndex) => (
          <div 
            key={rowIndex} 
            className="flex gap-6 whitespace-nowrap"
            style={{
              transform: `translateX(${rowIndex % 2 === 0 ? '-100px' : '0px'})`,
            }}
          >
            {Array.from({ length: 12 }).map((_, colIndex) => (
              <span 
                key={colIndex}
                className="text-foreground text-xl font-bold tracking-widest uppercase"
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
