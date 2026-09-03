import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ASSETS } from '../../data/assets';

const categories = [
  { id: 'sundaes', name: 'Signature Sundaes', desc: 'Loaded with hot fudge, nuts, and layers of rich cocoa.', tag: 'Most Popular' },
  { id: 'shakes', name: 'Thick Shakes', desc: 'Blended with real fruit and premium dairy for ultimate creaminess.', tag: 'Bestseller' },
  { id: 'waffles', name: 'Belgian Waffles', desc: 'Golden, crispy on the outside, fluffy inside with Biscoff & Nutella.', tag: 'Freshly Baked' },
  { id: 'falooda', name: 'Royal Falooda', desc: 'Traditional rose syrup, basil seeds, vermicelli, and ice cream crowns.', tag: 'Heritage' },
];

export default function CategoryExplorer() {
  const [activeTab, setActiveTab] = useState(categories[0].id);
  const currentCategory = categories.find(c => c.id === activeTab) || categories[0];

  // 3D Mouse Parallax Setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 25, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 25, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Layer Parallax Multipliers
  const bgMoveX = useTransform(springX, [-1, 1], [-5, 5]);
  const bgMoveY = useTransform(springY, [-1, 1], [-5, 5]);
  const baseMoveX = useTransform(springX, [-1, 1], [-15, 15]);
  const baseMoveY = useTransform(springY, [-1, 1], [-15, 15]);
  const fgMoveX = useTransform(springX, [-1, 1], [-30, 30]);
  const fgMoveY = useTransform(springY, [-1, 1], [-30, 30]);

  return (
    <section className="py-28 px-6 bg-cocoa-900 text-cream-50 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-mango-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-mango-500 font-bold uppercase tracking-[0.2em] text-xs block mb-3">
            Crafted for Cravings
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Explore Our Universe of Indulgence
          </h2>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => {
            const isActive = cat.id === activeTab;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`relative px-6 py-3 rounded-full font-sans font-semibold text-sm transition-all duration-300 cursor-pointer ${
                  isActive ? 'text-cocoa-900' : 'text-cream-50/70 hover:text-cream-50 bg-cream-50/5'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-mango-500 rounded-full z-0 shadow-lg"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Category Showcase Card */}
        <div className="bg-cocoa-800/60 border border-cream-50/10 rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-mango-500/20 text-mango-400 font-bold text-xs uppercase tracking-wider mb-4">
                  {currentCategory.tag}
                </span>
                <h3 className="text-3xl md:text-5xl font-display font-bold mb-6 text-cream-50">
                  {currentCategory.name}
                </h3>
                <p className="text-cream-100/80 text-lg leading-relaxed mb-8">
                  {currentCategory.desc}
                </p>
                <button className="px-8 py-3.5 bg-mango-500 text-cocoa-900 font-bold rounded-full hover:bg-mango-400 transition-colors shadow-md cursor-pointer">
                  View Full Menu
                </button>
              </div>

              {/* Visual Preview Box (3D Compositing Stage) */}
              <div className="relative aspect-video lg:aspect-square rounded-2xl bg-gradient-to-br from-cocoa-900 to-[#2A1A14] border border-cream-50/10 flex items-center justify-center overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-mango-500/10 blur-[50px]" />
                
                {/* 3D Master Container */}
                <div className="relative w-[300px] h-[300px] flex items-center justify-center">
                  {activeTab === 'sundaes' && (
                    <>
                      <motion.img src={ASSETS.heroComposition.cup} style={{ x: baseMoveX, y: baseMoveY }} className="absolute w-full h-auto object-contain drop-shadow-2xl z-20" alt="Sundae" />
                      <motion.img src={ASSETS.heroComposition.drip} style={{ x: fgMoveX, y: fgMoveY }} className="absolute w-[60%] top-[0%] right-[0%] z-30 drop-shadow-xl" alt="Drip" />
                    </>
                  )}
                  {activeTab === 'shakes' && (
                    <>
                      {/* Temporary mock layers for shakes */}
                      <motion.div style={{ x: bgMoveX, y: bgMoveY }} className="absolute w-[80%] h-[80%] rounded-full bg-mango-500/20 blur-2xl z-10" />
                      <motion.img src={ASSETS.heroComposition.cup} style={{ x: baseMoveX, y: baseMoveY }} className="absolute w-full h-auto object-contain drop-shadow-2xl z-20 scale-110" alt="Shake" />
                      <motion.img src={ASSETS.heroComposition.crumbs} style={{ x: fgMoveX, y: fgMoveY }} className="absolute w-[50%] -top-5 -right-5 z-30 drop-shadow-xl" alt="Crumbs" />
                    </>
                  )}
                  {activeTab === 'waffles' && (
                    <>
                      <motion.img src={ASSETS.products.waffleLayers.drip} style={{ x: bgMoveX, y: bgMoveY }} className="absolute w-[110%] h-auto object-contain drop-shadow-lg z-10 -top-5 -right-5" alt="Waffle Drip" />
                      <motion.img src={ASSETS.products.waffleLayers.base} style={{ x: baseMoveX, y: baseMoveY }} className="absolute w-full h-auto object-contain drop-shadow-2xl z-20" alt="Waffle" />
                      <motion.img src={ASSETS.products.waffleLayers.crumbs} style={{ x: fgMoveX, y: fgMoveY }} className="absolute w-[90%] -bottom-5 left-0 z-30 drop-shadow-xl" alt="Waffle Crumbs" />
                    </>
                  )}
                  {activeTab === 'falooda' && (
                    <>
                      <motion.img src={ASSETS.products.faloodaLayers.splash} style={{ x: bgMoveX, y: bgMoveY }} className="absolute w-[120%] h-auto object-contain drop-shadow-lg z-10" alt="Falooda Splash" />
                      <motion.img src={ASSETS.products.faloodaLayers.base} style={{ x: baseMoveX, y: baseMoveY }} className="absolute w-[90%] h-auto object-contain drop-shadow-2xl z-20" alt="Falooda" />
                      <motion.img src={ASSETS.products.faloodaLayers.toppings} style={{ x: fgMoveX, y: fgMoveY }} className="absolute w-[80%] bottom-0 left-0 z-30 drop-shadow-xl" alt="Falooda Toppings" />
                    </>
                  )}
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}