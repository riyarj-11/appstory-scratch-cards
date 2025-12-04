import { useState } from 'react';
import ScratchCard from './ScratchCard';
import Confetti from './Confetti';
import { Gift, Clock, ShoppingBag } from 'lucide-react';

const ScreenContent = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const handleReveal = () => {
    setShowConfetti(true);
    setIsRevealed(true);
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-[hsl(30,50%,96%)] to-[hsl(30,40%,94%)]">
      <Confetti active={showConfetti} />
      
      {/* Header */}
      <div className="pt-14 px-4 pb-3">
        <div className="flex items-center gap-2 mb-0.5">
          <Gift className="w-4 h-4 text-accent" />
          <span className="text-xs font-semibold text-foreground">Today's Offer</span>
        </div>
        <p className="text-[10px] text-muted-foreground">Scratch & win exclusive discounts!</p>
      </div>

      {/* Scratch Card Section */}
      <div className="px-4 flex justify-center">
        <div className="relative">
          {/* Card glow effect */}
          <div className={`absolute -inset-3 bg-primary/20 rounded-2xl blur-2xl transition-all duration-700 ${
            isRevealed ? 'opacity-100 scale-110' : 'opacity-0'
          }`} />
          
          {/* Card container */}
          <div className={`relative bg-card rounded-2xl p-3 shadow-xl border border-border/50 ${
            isRevealed ? 'animate-card-glow' : ''
          }`}>
            <div className="text-center mb-2">
              <h3 className="text-base font-bold text-foreground tracking-tight">Clay Co.</h3>
              <p className="text-[10px] text-muted-foreground">Premium Skincare</p>
            </div>
            
            <ScratchCard
              width={220}
              height={130}
              couponCode="B20"
              discount="Flat 5% Off"
              brandName="Clay Co."
              onReveal={handleReveal}
            />

            <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Expires in 24h</span>
              </div>
              <span className="text-primary font-semibold">Worth ₹399</span>
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary Preview */}
      <div className="px-4 mt-4">
        <div className="bg-card/80 backdrop-blur-sm rounded-xl p-3 border border-border/50 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <ShoppingBag className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs font-semibold text-foreground">Order Summary</span>
          </div>
          
          <div className="space-y-1.5 text-[11px]">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>₹1,299</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Delivery</span>
              <span className="text-primary font-medium">FREE</span>
            </div>
            {isRevealed && (
              <div className="flex justify-between text-primary font-semibold animate-scale-in">
                <span>Coupon (B20)</span>
                <span>-₹65</span>
              </div>
            )}
            <div className="border-t border-border pt-1.5 flex justify-between font-bold text-foreground text-xs">
              <span>Total</span>
              <span>{isRevealed ? '₹1,234' : '₹1,299'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom home indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
        <div className="w-28 h-1 bg-foreground/20 rounded-full" />
      </div>
    </div>
  );
};

export default ScreenContent;
