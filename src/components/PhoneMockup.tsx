import { ReactNode, useEffect, useState } from 'react';

interface PhoneMockupProps {
  children: ReactNode;
}

const PhoneMockup = ({ children }: PhoneMockupProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`relative transition-all duration-1000 ease-out ${
        isVisible 
          ? 'opacity-100 translate-y-0 rotate-0 scale-100' 
          : 'opacity-0 translate-y-32 -rotate-3 scale-90'
      }`}
      style={{
        transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}
    >
      {/* Glow effect behind phone */}
      <div className={`absolute -inset-8 bg-gradient-to-b from-primary/10 to-transparent rounded-full blur-3xl transition-opacity duration-1000 delay-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`} />
      
      {/* Phone frame */}
      <div className="relative bg-[#1a1a1a] rounded-[3rem] p-3 shadow-2xl">
        {/* Screen bezel */}
        <div className="relative bg-white rounded-[2.5rem] overflow-hidden">
          {/* Dynamic Island / Notch */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
            <div className="bg-[#1a1a1a] w-28 h-8 rounded-full flex items-center justify-center gap-3 px-3">
              <div className="w-2 h-2 rounded-full bg-[#3a3a3a]" />
              <div className="w-3 h-3 rounded-full bg-[#2a2a2a] ring-2 ring-[#3a3a3a]" />
            </div>
          </div>
          
          {/* Screen content */}
          <div className="relative w-[280px] h-[580px] overflow-hidden">
            {children}
          </div>
        </div>
        
        {/* Side buttons */}
        <div className="absolute -left-[3px] top-28 w-[3px] h-8 bg-[#2a2a2a] rounded-l-sm" />
        <div className="absolute -left-[3px] top-40 w-[3px] h-14 bg-[#2a2a2a] rounded-l-sm" />
        <div className="absolute -left-[3px] top-[220px] w-[3px] h-14 bg-[#2a2a2a] rounded-l-sm" />
        <div className="absolute -right-[3px] top-36 w-[3px] h-20 bg-[#2a2a2a] rounded-r-sm" />
      </div>
    </div>
  );
};

export default PhoneMockup;
