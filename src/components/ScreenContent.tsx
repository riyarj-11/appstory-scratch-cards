import { useState, useEffect } from 'react';
import ScratchCard from './ScratchCard';
import Confetti from './Confetti';
import { Gift, Clock } from 'lucide-react';

interface ScreenContentProps {
  autoPlay?: boolean;
}

const ScreenContent = ({ autoPlay = true }: ScreenContentProps) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Stagger the content appearance
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleReveal = () => {
    setShowConfetti(true);
    setIsRevealed(true);
  };

  // Sample product images (using colored boxes to represent)
  const products = [
    { color: '#8B4513', name: 'Coffee' },
    { color: '#FFD700', name: 'Chips' },
    { color: '#228B22', name: 'Tea' },
    { color: '#FF6347', name: 'Sauce' },
    { color: '#4169E1', name: 'Water' },
  ];

  return (
    <div className="relative w-full h-full bg-gradient-to-b from-[#fef5ed] to-[#fdf0e6]">
      <Confetti active={showConfetti} />
      
      {/* Header */}
      <div className={`pt-14 px-4 pb-2 transition-all duration-500 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="flex items-center gap-2 mb-0.5">
          <Gift className="w-4 h-4 text-accent" />
          <span className="text-xs font-semibold text-foreground">Today's Offer</span>
        </div>
        <p className="text-[10px] text-muted-foreground">Scratch & win exclusive discounts!</p>
      </div>

      {/* Scratch Card Section */}
      <div className={`px-4 flex justify-center transition-all duration-700 delay-200 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="relative">
          {/* Card glow effect */}
          <div className={`absolute -inset-3 bg-primary/30 rounded-2xl blur-2xl transition-all duration-700 ${
            isRevealed ? 'opacity-100 scale-110' : 'opacity-0'
          }`} />
          
          {/* Card container */}
          <div className={`relative bg-white rounded-2xl p-3 shadow-xl border border-gray-100 ${
            isRevealed ? 'animate-card-glow' : ''
          }`}>
            <div className="text-center mb-2">
              <h3 className="text-base font-bold text-gray-800 tracking-tight" style={{ fontFamily: 'serif' }}>
                Clay <span className="text-xs font-normal">Co.</span>
              </h3>
            </div>
            
            <ScratchCard
              width={220}
              height={120}
              couponCode="B20"
              discount="Flat 5% Off"
              brandName="Clay Co."
              giftText="Get Free Gift worth ₹399"
              onReveal={handleReveal}
              autoScratch={autoPlay}
            />

            <div className="mt-2 flex items-center justify-between text-[10px] text-gray-500">
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
      <div className={`px-4 mt-3 transition-all duration-700 delay-400 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-800">Order Summary</span>
          </div>
          
          {/* Product thumbnails row */}
          <div className="flex gap-1.5 mb-2 overflow-x-auto pb-1">
            {products.map((product, index) => (
              <div 
                key={index}
                className="w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center shadow-sm"
                style={{ backgroundColor: product.color + '20', border: `1px solid ${product.color}40` }}
              >
                <div 
                  className="w-6 h-6 rounded"
                  style={{ backgroundColor: product.color }}
                />
              </div>
            ))}
          </div>
          
          <div className="space-y-1 text-[10px]">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>₹1,299</span>
            </div>
            {isRevealed && (
              <div className="flex justify-between text-primary font-semibold animate-scale-in">
                <span>Coupon (B20)</span>
                <span>-₹65</span>
              </div>
            )}
            <div className="border-t border-gray-100 pt-1 flex justify-between font-bold text-gray-800 text-xs">
              <span>Total</span>
              <span>{isRevealed ? '₹1,234' : '₹1,299'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom home indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
        <div className="w-28 h-1 bg-gray-300 rounded-full" />
      </div>
    </div>
  );
};

export default ScreenContent;
