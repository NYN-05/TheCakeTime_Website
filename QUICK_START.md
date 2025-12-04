# Quick Start Guide - Advanced UI Features

## 🚀 Getting Started in 5 Minutes

### Step 1: View the Showcase
Visit `/features` page to see all components in action.

### Step 2: Import Components You Need
```tsx
// Pick what you need from these files:
import { MagneticButton, SpotlightCard } from '../components/AdvancedVisualEffects'
import { FlavorWheelSelector } from '../components/InteractiveComponents'
import { FlipCard, LiquidButton } from '../components/MicroAnimations'
import { ScratchCard, SpinWheel } from '../components/EngagementFeatures'
import { LiveStockIndicator, TrendingBadge } from '../components/PerformanceIndicators'
```

### Step 3: Use in Your Components
```tsx
export default function MyPage() {
  return (
    <div>
      {/* Magnetic call-to-action button */}
      <MagneticButton onClick={() => {}}>
        Shop Now
      </MagneticButton>

      {/* Product card with spotlight effect */}
      <SpotlightCard>
        <div className="p-6">
          <TrendingBadge isTrending={true} />
          <h3>Chocolate Cake</h3>
          <LiveStockIndicator stock={3} />
        </div>
      </SpotlightCard>

      {/* Interactive spin wheel */}
      <SpinWheel
        prizes={["10% OFF", "Free Delivery", "20% OFF"]}
        onWin={(prize) => alert(`Won: ${prize}`)}
      />
    </div>
  )
}
```

---

## 🎯 Top 10 Most Useful Components

### 1. **MagneticButton** - Buttons that follow cursor
**Use for**: CTAs, important actions
```tsx
<MagneticButton onClick={() => {}}>Add to Cart</MagneticButton>
```

### 2. **SpotlightCard** - Mouse-following gradient spotlight
**Use for**: Product cards, featured items
```tsx
<SpotlightCard>
  <ProductCard />
</SpotlightCard>
```

### 3. **TrendingBadge** - Animated fire badge
**Use for**: Popular products, hot items
```tsx
<TrendingBadge isTrending={true} />
```

### 4. **LiveStockIndicator** - Real-time stock alerts
**Use for**: Creating urgency, inventory display
```tsx
<LiveStockIndicator stock={3} />
```

### 5. **SocialProofPopup** - "Someone just ordered..." notifications
**Use for**: Building trust, showing activity
```tsx
<SocialProofPopup />
```

### 6. **ScratchCard** - Scratch-to-reveal coupons
**Use for**: Gamification, discount reveals
```tsx
<ScratchCard couponCode="SAVE20" />
```

### 7. **SpinWheel** - Lucky wheel for prizes
**Use for**: Engagement, prize selection
```tsx
<SpinWheel prizes={["10% OFF"]} onWin={(p) => {}} />
```

### 8. **FlipCard** - 3D card flip animation
**Use for**: Nutritional info, product details
```tsx
<FlipCard front={<Front />} back={<Back />} />
```

### 9. **ProgressRing** - Circular progress indicator
**Use for**: Order tracking, loading states
```tsx
<ProgressRing progress={75} />
```

### 10. **AIRecommendationQuiz** - Interactive quiz
**Use for**: Product recommendations, engagement
```tsx
<AIRecommendationQuiz onComplete={(rec) => {}} />
```

---

## 💡 Common Use Cases

### Use Case 1: Enhanced Product Cards
```tsx
<SpotlightCard>
  <div className="product-card relative">
    <TrendingBadge isTrending={true} />
    <img src="/cake.jpg" alt="Cake" />
    <h3>Chocolate Delight</h3>
    <LiveStockIndicator stock={4} />
    <MagneticButton onClick={addToCart}>
      Add to Cart
    </MagneticButton>
  </div>
</SpotlightCard>
```

### Use Case 2: Gamified Promotions
```tsx
<div className="promotion-section">
  <h2>Spin to Win!</h2>
  <SpinWheel
    prizes={["10% OFF", "Free Delivery", "20% OFF", "Free Cake"]}
    onWin={(prize) => {
      applyDiscount(prize);
      showToast(`You won ${prize}!`);
    }}
  />
</div>
```

### Use Case 3: Mobile-Optimized Gallery
```tsx
<DoubleTapLike onLike={() => addToFavorites()}>
  <SwipeGallery images={productImages} />
</DoubleTapLike>
```

### Use Case 4: Smart Product Finder
```tsx
const [showQuiz, setShowQuiz] = useState(true);
const [recommendation, setRecommendation] = useState("");

{showQuiz ? (
  <AIRecommendationQuiz
    onComplete={(rec) => {
      setRecommendation(rec);
      setShowQuiz(false);
    }}
  />
) : (
  <AIRecommendationResult
    recommendation={recommendation}
    onReset={() => setShowQuiz(true)}
  />
)}
```

### Use Case 5: Urgency & FOMO
```tsx
<div className="product-page">
  <CountdownTimer targetDate={offerEndDate} />
  <UrgencyBanner stock={3} expiresIn={45} />
  <LiveStockIndicator stock={3} />
  <SocialProofPopup /> {/* Global component */}
</div>
```

---

## 🎨 Styling Tips

### Customize Colors
Most components accept className prop:
```tsx
<MagneticButton className="bg-blue-500 hover:bg-blue-600">
  Custom Colors
</MagneticButton>
```

### Adjust Animation Speed
Modify transition durations:
```tsx
<motion.div
  animate={{ ... }}
  transition={{ duration: 0.3 }} // Adjust here
>
```

### Theme Integration
Use with your color system:
```tsx
<SpotlightCard className="bg-gradient-to-r from-primary-500 to-secondary-500">
```

---

## 📱 Mobile Best Practices

### 1. Always Test Touch Interactions
```tsx
// Good: Works on mobile
<DoubleTapLike onLike={() => {}}>
  <ProductImage />
</DoubleTapLike>

// Also good: Swipe gesture
<SwipeGallery images={images} />
```

### 2. Use Bottom Sheets for Forms
```tsx
<BottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
  <FilterForm />
</BottomSheet>
```

### 3. Add Haptic Feedback
```tsx
const { triggerHaptic } = useHapticFeedback();

<button onClick={() => {
  triggerHaptic('medium');
  handleAction();
}}>
```

---

## ⚡ Performance Tips

### 1. Lazy Load Heavy Components
```tsx
import dynamic from 'next/dynamic';

const SpinWheel = dynamic(() => 
  import('../components/EngagementFeatures').then(mod => mod.SpinWheel),
  { ssr: false }
);
```

### 2. Use AnimatePresence for Exit Animations
```tsx
<AnimatePresence>
  {isVisible && <Modal />}
</AnimatePresence>
```

### 3. Optimize Images
Always use Next.js Image component:
```tsx
import Image from 'next/image';

<DistortionImage
  src="/optimized-image.jpg"
  alt="..."
/>
```

---

## 🐛 Troubleshooting

### Issue: Voice Search Not Working
**Solution**: Voice API requires HTTPS. Test on deployed site.

### Issue: Shake Detection Not Triggering
**Solution**: Device motion requires user permission. Prompt on first use.

### Issue: Animations Lagging
**Solution**: Reduce stiffness in spring animations:
```tsx
transition={{ type: "spring", stiffness: 200, damping: 25 }}
```

### Issue: Mobile Gestures Not Working
**Solution**: Ensure touch-action CSS is not blocking:
```css
.swipeable {
  touch-action: pan-y; /* Allow vertical scroll */
}
```

---

## 📚 Learn More

- Full Documentation: `ADVANCED_FEATURES_GUIDE.md`
- Live Demo: Visit `/features` page
- Framer Motion Docs: https://www.framer.com/motion/

---

## 🎉 Quick Wins

Start with these for immediate impact:

1. Add `<SocialProofPopup />` to `_app.tsx` (global)
2. Wrap CTAs with `<MagneticButton>`
3. Add `<TrendingBadge />` to popular products
4. Use `<LiveStockIndicator />` for urgency
5. Replace regular cards with `<SpotlightCard>`

**That's it! You're ready to use all advanced features.** 🚀
