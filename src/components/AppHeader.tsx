import { Sparkles } from 'lucide-react';

const AppHeader = () => {
  return (
    <div className="flex items-center gap-2 text-accent">
      <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
        <Sparkles className="w-6 h-6 text-accent-foreground" />
      </div>
      <span className="text-xl font-bold">AppStorys</span>
    </div>
  );
};

export default AppHeader;
