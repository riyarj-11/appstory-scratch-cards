import { Sparkles } from 'lucide-react';

const AppHeader = () => {
  return (
    <div className="flex items-center gap-2 opacity-0 animate-intro-logo">
      <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shadow-lg">
        <Sparkles className="w-5 h-5 text-accent-foreground" />
      </div>
      <span className="text-xl font-bold text-accent">AppStorys</span>
    </div>
  );
};

export default AppHeader;
