import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

const AppHeader = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`flex items-center gap-2 transition-all duration-700 ${
        isVisible 
          ? 'opacity-100 translate-x-0 scale-100' 
          : 'opacity-0 -translate-x-8 scale-90'
      }`}
      style={{
        transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}
    >
      <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-lg">
        <Sparkles className="w-5 h-5 text-accent-foreground" />
      </div>
      <span className="text-xl font-bold text-accent">AppStorys</span>
    </div>
  );
};

export default AppHeader;
