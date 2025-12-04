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
    <div className="relative w-full h-full bg-gradient-to-b from-secondary to-background">
      <Confetti active={showConfetti} />
      
      {/* Header */}
      <div className="pt-14 px-4 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <Gift className="w-5 h-5 text-accent" />
          <span className="text-sm font-semibold text-foreground">Today's Offer</span>
        </div>
        <p className="text-xs text-muted-foreground">Scratch & win exclusive discounts!</p>
      </div>

      {/* Scratch Card Section */}
      <div className="px-4 flex justify-center">
        <div className="relative">
          {/* Card glow effect */}
          <div className={`absolute -inset-2 bg-primary/30 rounded-2xl blur-xl transition-opacity duration-500 ${
            isRevealed ? 'opacity-100' : 'opacity-0'
          }`} />
          
          {/* Card container */}
          <div className="relative bg-card rounded-2xl p-4 shadow-card">
            <div className="text-center mb-3">
              <h3 className="text-lg font-bold text-foreground">Clay Co.</h3>
              <p className="text-xs text-muted-foreground">Premium Skincare</p>
            </div>
            
            <ScratchCard
              width={220}
              height={140}
              couponCode="CLAY20"
              discount="Flat 20% Off"
              brandName="Clay Co."
              onReveal={handleReveal}
            />

            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>Expires in 24h</span>
              </div>
              <span className="text-primary font-medium">Worth ₹399</span>
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary Preview */}
      <div className="px-4 mt-6">
        <div className="bg-card/50 backdrop-blur-sm rounded-xl p-3 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <ShoppingBag className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Order Summary</span>
          </div>
          
          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span>₹1,299</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Delivery</span>
              <span>FREE</span>
            </div>
            {isRevealed && (
              <div className="flex justify-between text-primary font-medium animate-scale-in">
                <span>Coupon (CLAY20)</span>
                <span>-₹260</span>
              </div>
            )}
            <div className="border-t border-border pt-2 flex justify-between font-semibold text-foreground">
              <span>Total</span>
              <span>{isRevealed ? '₹1,039' : '₹1,299'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
        <div className="w-32 h-1 bg-foreground/20 rounded-full" />
      </div>
    </div>
  );
};

export default ScreenContent;
