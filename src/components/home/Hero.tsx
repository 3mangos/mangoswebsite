import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ASSETS } from '../../data/assets';
import { Link } from 'react-router-dom';

// Stable layout positions for left, center, right slots
const POSITIONS = {
  left: {
    x: '-42%',
    y: '8%',
    scale: 0.72,
    rotate: -14,
    zIndex: 10,
    opacity: 0.65,
    filter: 'blur(1.5px)',
  },
  center: {
    x: '0%',
    y: '0%',
    scale: 1,
    rotate: 0,
    zIndex: 30,
    opacity: 1,
    filter: 'blur(0px)',
  },
  right: {
    x: '42%',
    y: '8%',
    scale: 0.72,
    rotate: 14,
    zIndex: 10,
    opacity: 0.65,
    filter: 'blur(1.5px)',
  },
};

function getSlot(
  productIndex: number,
  activeIndex: number,
  total: number
): 'left' | 'center' | 'right' {
  const diff = (productIndex - activeIndex + total) % total;
  if (diff === 0) return 'center';
  if (diff === 1) return 'right';
  return 'left';
}

export default function Hero() {
  const products = ASSETS.heroShowcase;
  const [activeIndex, setActiveIndex] = useState(0);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 20, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 20, damping: 18 });
  const parallaxX = useTransform(springX, [-1, 1], [-12, 12]);
  const parallaxY = useTransform(springY, [-1, 1], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 2);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Auto-rotate every 3.5 s
  const advance = useCallback(() => {
    setActiveIndex(i => (i + 1) % products.length);
  }, [products.length]);

  useEffect(() => {
    const timer = setInterval(advance, 3500);
    return () => clearInterval(timer);
  }, [advance]);

  const activeProduct = products[activeIndex];

  return (
    <section className="relative w-full h-[100svh] min-h-[800px] flex items-center justify-center overflow-hidden bg-[#160E0A]">

      {/* ── ANIMATED BACKGROUND GLOW ──────────────────────────────────────── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`glow-${activeIndex}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0 pointer-events-none z-0"
        >
          <div
            className="absolute top-1/4 right-1/3 w-[50vw] h-[50vw] rounded-full blur-[140px]"
            style={{ backgroundColor: `${activeProduct.accent}26` }}
          />
          <div
            className="absolute bottom-10 left-1/4 w-[35vw] h-[35vw] rounded-full blur-[120px]"
            style={{ backgroundColor: `${activeProduct.accent}18` }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── BRAND WATERMARK ───────────────────────────────────────────────── */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.025] pointer-events-none select-none z-0">
        <span className="font-display font-black text-[22vw] leading-none text-cream-50 uppercase tracking-tighter">
          MANGO'S
        </span>
      </div>

      {/* ── MAIN GRID ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 h-full pt-20">

        {/* LEFT: Brand Copy */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left z-20 lg:col-span-5">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-mango-500/10 border border-mango-500/20 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-mango-500 animate-pulse" />
            <span className="text-mango-500 font-sans tracking-wider uppercase text-xs font-bold">
              15 Outlets · Bangalore &amp; UAE
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-[5rem] font-display font-bold text-cream-50 leading-[1.02] mb-6 tracking-tight"
          >
            Made for <br />
            <span className="italic font-light text-mango-500">Happy Days.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-cream-100/70 text-lg md:text-xl font-sans max-w-md leading-relaxed mb-8"
          >
            From a single bag of mangoes to your favourite dessert destination. Rich ice creams, signature waffles, and shakes built for every craving.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Link
              to="/menu"
              className="px-8 py-4 bg-mango-500 text-cocoa-900 font-sans font-bold rounded-full hover:bg-mango-400 transition-all duration-300 shadow-lg text-center"
            >
              Explore Menu
            </Link>
            <Link
              to="/locations"
              className="px-8 py-4 bg-transparent border border-cream-50/20 text-cream-50 font-sans font-bold rounded-full hover:bg-cream-50 hover:text-cocoa-900 transition-colors duration-300 text-center"
            >
              Our Locations
            </Link>
          </motion.div>

          {/* Active product label */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`label-${activeIndex}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="mt-10 items-center gap-3 hidden lg:flex"
            >
              <span className="w-6 h-[2px] bg-mango-500 block" />
              <span className="text-mango-500 text-xs font-bold tracking-[0.2em] uppercase">
                {activeProduct.label}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Pagination dots */}
          <div className="mt-4 gap-2 hidden lg:flex">
            {products.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                  i === activeIndex
                    ? 'w-8 bg-mango-500'
                    : 'w-2 bg-cream-50/20 hover:bg-cream-50/40'
                }`}
                aria-label={`Show product ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: 3-Product Fan Carousel */}
        <div className="relative lg:col-span-7 w-full h-full flex items-center justify-center pointer-events-none">
          {/* Outer parallax wrapper */}
          <motion.div
            style={{ x: parallaxX, y: parallaxY }}
            className="relative w-[480px] h-[520px] flex items-center justify-center"
          >
            {products.map((product, i) => {
              const slot = getSlot(i, activeIndex, products.length);
              const pos = POSITIONS[slot];

              return (
                <motion.div
                  key={product.src}
                  animate={{
                    x: pos.x,
                    y: pos.y,
                    scale: pos.scale,
                    rotate: pos.rotate,
                    zIndex: pos.zIndex,
                    opacity: pos.opacity,
                    filter: pos.filter,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 70,
                    damping: 18,
                    mass: 1,
                  }}
                  className="absolute w-[320px] h-[360px] origin-bottom"
                >
                  {/* Card */}
                  <div
                    className="w-full h-full rounded-3xl overflow-hidden shadow-[0_40px_80px_-10px_rgba(0,0,0,0.85)] relative"
                    style={{
                      background: `radial-gradient(circle at 50% 120%, ${product.accent}22, #1A110D 70%)`,
                    }}
                  >
                    <img
                      src={product.src}
                      alt={product.label}
                      className="w-full h-full object-cover object-center scale-[1.06]"
                      draggable={false}
                    />
                    {/* Bottom gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-cocoa-900/60 via-transparent to-transparent" />
                  </div>

                  {/* Glowing halo behind the centered card only */}
                  {slot === 'center' && (
                    <motion.div
                      layoutId="card-halo"
                      className="absolute inset-0 -z-10 rounded-3xl blur-[50px] opacity-60"
                      style={{ backgroundColor: product.accent }}
                      transition={{ type: 'spring', stiffness: 60, damping: 15 }}
                    />
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* ── SCROLL HINT ───────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-cream-50/30 text-xs uppercase tracking-widest font-sans">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-mango-500/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}