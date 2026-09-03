import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ASSETS } from '../../data/assets';

export default function SignatureStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  // --- FALOODA PHYSICS (0% to 50%) ---
  // Main product physics
  const faloodaY = useTransform(smoothProgress, [0, 0.45], [50, -50]);
  const faloodaRotate = useTransform(smoothProgress, [0, 0.45], [-3, 3]);
  const faloodaOpacity = useTransform(smoothProgress, [0, 0.35, 0.5], [1, 1, 0]);
  const faloodaScale = useTransform(smoothProgress, [0, 0.35, 0.5], [1, 1, 0.85]);
  
  // Parallax layers for Falooda
  const faloodaSplashY = useTransform(smoothProgress, [0, 0.45], [20, -80]); // Moves faster (background)
  const faloodaToppingsY = useTransform(smoothProgress, [0, 0.45], [80, -20]); // Moves slower (foreground)

  // --- WAFFLE PHYSICS (50% to 100%) ---
  // Main product physics
  const waffleY = useTransform(smoothProgress, [0.45, 0.95], [80, -30]);
  const waffleRotate = useTransform(smoothProgress, [0.45, 0.95], [4, -2]);
  const waffleOpacity = useTransform(smoothProgress, [0.45, 0.6, 1], [0, 1, 1]);
  const waffleScale = useTransform(smoothProgress, [0.45, 0.6, 1], [0.85, 1, 1]);
  
  // Parallax layers for Waffle
  const waffleDripY = useTransform(smoothProgress, [0.45, 0.95], [50, -60]); // Background drip
  const waffleCrumbsY = useTransform(smoothProgress, [0.45, 0.95], [120, -10]); // Foreground crumbs

  // --- TYPOGRAPHY ANIMATIONS ---
  const text1Y = useTransform(smoothProgress, [0, 0.45], [0, -60]);
  const text1Opacity = useTransform(smoothProgress, [0, 0.35, 0.45], [1, 1, 0]);
  
  const text2Y = useTransform(smoothProgress, [0.45, 0.7, 1], [60, 0, -20]);
  const text2Opacity = useTransform(smoothProgress, [0.45, 0.6, 1], [0, 1, 1]);

  return (
    <section ref={containerRef} className="relative w-full h-[200vh] bg-cream-50">
      
      {/* Sticky Container pinned for exactly 200vh */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Background Ambient Glows */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[35vw] h-[35vw] bg-mango-500/10 rounded-full blur-[90px] pointer-events-none"
          style={{ y: useTransform(smoothProgress, [0, 1], [0, 100]) }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-cocoa-900/5 rounded-full blur-[80px] pointer-events-none"
          style={{ y: useTransform(smoothProgress, [0, 1], [0, -100]) }}
        />

        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full relative z-10">
          
          {/* LEFT: Gravity-Defying Products (Stereoscopic 3D Layout) */}
          <div className="relative h-full flex items-center justify-center">
            
            {/* 1. Royal Falooda Layered Composition */}
            <motion.div 
              className="absolute w-full max-w-sm flex justify-center items-center"
              style={{ rotate: faloodaRotate, opacity: faloodaOpacity, scale: faloodaScale }}
            >
              {/* Background Splash Layer */}
              <motion.img 
                src={ASSETS.products.faloodaLayers.splash} 
                alt="Falooda Splash" 
                className="absolute w-[120%] h-auto object-contain z-10 drop-shadow-xl" 
                style={{ y: faloodaSplashY }} 
              />
              {/* Main Base Layer */}
              <motion.img 
                src={ASSETS.products.faloodaLayers.base} 
                alt="Royal Falooda" 
                className="relative w-full h-auto object-contain z-20 drop-shadow-2xl" 
                style={{ y: faloodaY }} 
              />
              {/* Foreground Toppings Layer */}
              <motion.img 
                src={ASSETS.products.faloodaLayers.toppings} 
                alt="Falooda Toppings" 
                className="absolute w-[80%] h-auto object-contain z-30 drop-shadow-xl bottom-10 left-10" 
                style={{ y: faloodaToppingsY }} 
              />
            </motion.div>

            {/* 2. Biscoff Waffle Layered Composition */}
            <motion.div 
              className="absolute w-full max-w-sm flex justify-center items-center"
              style={{ rotate: waffleRotate, opacity: waffleOpacity, scale: waffleScale }}
            >
              {/* Background Drip Layer */}
              <motion.img 
                src={ASSETS.products.waffleLayers.drip} 
                alt="Waffle Drip" 
                className="absolute w-[110%] h-auto object-contain z-10 drop-shadow-xl -top-10 -right-5" 
                style={{ y: waffleDripY }} 
              />
              {/* Main Base Layer */}
              <motion.img 
                src={ASSETS.products.waffleLayers.base} 
                alt="Biscoff Waffle" 
                className="relative w-full h-auto object-contain z-20 drop-shadow-2xl scale-105" 
                style={{ y: waffleY }} 
              />
              {/* Foreground Crumbs Layer */}
              <motion.img 
                src={ASSETS.products.waffleLayers.crumbs} 
                alt="Waffle Crumbs" 
                className="absolute w-[90%] h-auto object-contain z-30 drop-shadow-2xl -bottom-10 left-0" 
                style={{ y: waffleCrumbsY }} 
              />
            </motion.div>
          </div>

          {/* RIGHT: Storytelling Typography */}
          <div className="relative h-full flex flex-col justify-center">
            
            {/* Story 1 */}
            <motion.div 
              className="absolute w-full"
              style={{ y: text1Y, opacity: text1Opacity, pointerEvents: smoothProgress.get() > 0.45 ? 'none' : 'auto' }}
            >
              <span className="text-mango-600 font-bold uppercase tracking-widest text-xs mb-3 block">
                The Crown Jewel
              </span>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-cocoa-900 leading-tight mb-4">
                Royal <br/>
                <span className="italic font-light text-cocoa-800">Falooda.</span>
              </h2>
              <p className="text-cocoa-800/80 text-lg mb-6 max-w-md leading-relaxed">
                Layers of basil seeds, rose syrup, and fine vermicelli, crowned with our signature ice cream and a splash of roasted nuts. It doesn't just taste premium—it moves you.
              </p>
            </motion.div>

            {/* Story 2 */}
            <motion.div 
              className="absolute w-full"
              style={{ y: text2Y, opacity: text2Opacity, pointerEvents: smoothProgress.get() < 0.45 ? 'none' : 'auto' }}
            >
              <span className="text-mango-600 font-bold uppercase tracking-widest text-xs mb-3 block">
                Warm & Indulgent
              </span>
              <h2 className="text-4xl md:text-6xl font-display font-bold text-cocoa-900 leading-tight mb-4">
                Biscoff <br/>
                <span className="italic font-light text-cocoa-800">Waffle.</span>
              </h2>
              <p className="text-cocoa-800/80 text-lg mb-6 max-w-md leading-relaxed">
                Freshly baked, golden Belgian waffles layered with melting Biscoff spread and our premium vanilla scoop. A masterclass in texture and temperature.
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}