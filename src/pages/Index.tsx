import { useEffect, useState } from 'react';
import PhoneMockup from '@/components/PhoneMockup';
import ScreenContent from '@/components/ScreenContent';
import BackgroundPattern from '@/components/BackgroundPattern';
import AppHeader from '@/components/AppHeader';

const Index = () => {
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowTitle(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <BackgroundPattern />
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        {/* Header with intro animation */}
        <div className="absolute top-6 left-6">
          <AppHeader />
        </div>

        {/* Phone mockup with scratch card */}
        <div className="flex flex-col items-center gap-6">
          <PhoneMockup>
            <ScreenContent autoPlay={true} />
          </PhoneMockup>

          {/* Instructions with staggered animation */}
          <div className="text-center max-w-xs">
            <h1 
              className={`text-2xl font-bold text-foreground mb-2 transition-all duration-700 ${
                showTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '0.6s' }}
            >
              Scratch & Win
            </h1>
            <p 
              className={`text-muted-foreground text-sm transition-all duration-700 ${
                showTitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '0.8s' }}
            >
              Scratch the card to reveal your exclusive discount code
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
