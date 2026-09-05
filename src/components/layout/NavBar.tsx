import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { ASSETS } from '../../data/assets';

// Navigation links pointing to sections on the Home page
const NAV_LINKS = [
  { label: 'Story', href: '#story' },
  { label: 'The Menu', href: '#experience' },
  { label: 'Locations', href: '#visit' },
  { label: 'Franchise', href: '#franchise' },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll to toggle background transparency
  useEffect(() => {
    let frame = 0;
    let previous = window.scrollY > 40;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const next = window.scrollY > 40;
        if (next !== previous) {
          previous = next;
          setScrolled(next);
        }
        frame = 0;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Motion variants for drawer animation
  const drawerVariants = {
    hidden: { height: 0, opacity: 0, transition: { duration: 0.2 } },
    visible: { height: 'auto', opacity: 1, transition: { type: 'spring', stiffness: 80, damping: 15 } },
  };

  return (
    <>
      <header className="pointer-events-none fixed top-0 inset-x-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
        <div className={`pointer-events-auto mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500 md:px-5 ${scrolled ? 'border-white/45 bg-cream/95 shadow-[0_14px_38px_rgba(16,59,43,.18)] md:backdrop-blur-2xl' : 'border-ink/10 bg-cream/88 shadow-[0_10px_28px_rgba(16,59,43,.08)] md:bg-cream/68 md:backdrop-blur-xl'}`}>
          
          {/* Official Mascot Logo */}
          <a href="#top" aria-label="Mango's home" onClick={() => setOpen(false)}>
            <img 
              src={ASSETS.brandMark} 
              alt="Mango's" 
              className="h-12 w-auto object-contain transition-transform duration-500 hover:-rotate-6 hover:scale-110 md:h-14" 
            />
          </a>

          {/* Desktop navigation */}
          <nav aria-label="Primary navigation" className="hidden items-center gap-1 rounded-full border border-ink/10 bg-ink/[.035] p-1 text-sm font-bold md:flex">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="group relative rounded-full px-3 py-2 transition-colors hover:bg-mango hover:text-ink"
              >
                {label}
                <span aria-hidden="true" className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-[65%_35%_65%_35%] bg-ink opacity-0 transition-all duration-300 group-hover:bottom-1 group-hover:opacity-100" />
              </a>
            ))}
          </nav>

          {/* CTA button */}
          <a
            href="#franchise"
            className="hidden items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-xs font-bold text-cream shadow-[inset_0_-3px_0_rgba(0,0,0,.2)] transition-all hover:-translate-y-1 hover:bg-mango hover:text-ink md:flex"
          >
            Partner with us <ArrowUpRight size={14} />
          </a>

          {/* Mobile menu toggle */}
          <button
            className="grid h-11 w-11 place-items-center rounded-full bg-ink text-cream md:hidden shadow-md active:scale-95 transition-transform"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={drawerVariants}
            className="fixed inset-x-3 top-[5rem] z-40 mx-auto max-w-7xl overflow-hidden rounded-3xl bg-ink text-cream shadow-xl md:inset-x-6 md:hidden"
          >
            <nav id="mobile-navigation" aria-label="Mobile navigation" className="grid gap-1 p-5">
              {NAV_LINKS.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-4 text-xl font-bold hover:bg-white/10 transition-colors"
                >
                  {label}
                </a>
              ))}
              <a
                href="#franchise"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-between rounded-2xl bg-mango px-4 py-4 text-xl font-bold text-ink"
              >
                Partner with us <ArrowUpRight size={24} />
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
