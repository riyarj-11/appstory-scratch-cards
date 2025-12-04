import { ReactNode } from 'react';

interface PhoneMockupProps {
  children: ReactNode;
}

const PhoneMockup = ({ children }: PhoneMockupProps) => {
  return (
    <div className="relative animate-float">
      {/* Phone frame */}
      <div className="relative bg-foreground rounded-[3rem] p-3 shadow-phone">
        {/* Screen bezel */}
        <div className="relative bg-card rounded-[2.5rem] overflow-hidden">
          {/* Dynamic Island / Notch */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
            <div className="bg-foreground w-24 h-7 rounded-full flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-muted-foreground/50" />
              <div className="w-3 h-3 rounded-full bg-muted-foreground/30 ring-2 ring-muted-foreground/20" />
            </div>
          </div>
          
          {/* Screen content */}
          <div className="relative w-[280px] h-[580px] overflow-hidden">
            {children}
          </div>
        </div>
        
        {/* Side buttons */}
        <div className="absolute -left-1 top-28 w-1 h-8 bg-foreground rounded-l-sm" />
        <div className="absolute -left-1 top-40 w-1 h-12 bg-foreground rounded-l-sm" />
        <div className="absolute -left-1 top-56 w-1 h-12 bg-foreground rounded-l-sm" />
        <div className="absolute -right-1 top-36 w-1 h-16 bg-foreground rounded-r-sm" />
      </div>
    </div>
  );
};

export default PhoneMockup;
