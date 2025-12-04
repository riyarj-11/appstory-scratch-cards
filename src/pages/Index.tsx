import PhoneMockup from '@/components/PhoneMockup';
import ScreenContent from '@/components/ScreenContent';
import BackgroundPattern from '@/components/BackgroundPattern';
import AppHeader from '@/components/AppHeader';

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <BackgroundPattern />
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        {/* Header */}
        <div className="absolute top-6 left-6">
          <AppHeader />
        </div>

        {/* Phone mockup with scratch card */}
        <div className="flex flex-col items-center gap-8">
          <PhoneMockup>
            <ScreenContent />
          </PhoneMockup>

          {/* Instructions */}
          <div className="text-center max-w-xs">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Scratch & Win
            </h1>
            <p className="text-muted-foreground text-sm">
              Scratch the card to reveal your exclusive discount code
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
