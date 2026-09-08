import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { ASSETS } from '../../data/assets';

// Navigation links pointing to sections on the Home page
const NAV_LINKS = [
  { label: 'Story', href: '/#story' },
  { label: 'The Menu', href: '/#experience' },
  { label: 'Locations', href: '/#visit' },
  { label: 'Franchise', href: '/#franchise' },
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
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
        <div className={`pointer-events-auto mx-auto flex max-w-[1320px] items-center justify-between rounded-[1.7rem] border px-3 py-2 transition-[background-color,box-shadow,transform] duration-500 sm:rounded-[2.15rem] sm:px-4 sm:py-2.5 lg:px-6 ${scrolled ? 'border-white/55 bg-cream/[.97] shadow-[0_12px_30px_rgba(16,59,43,.16)] backdrop-blur-2xl' : 'border-ink/10 bg-cream/[.94] shadow-[0_9px_24px_rgba(16,59,43,.08)] backdrop-blur-xl'}`}>
          
          {/* Official Mango's lockup */}
          <a href="/#top" aria-label="Mango's home" onClick={() => setOpen(false)} className="shrink-0">
            <img 
              src={ASSETS.logo}
              alt="Mango's — Ice creams, waffles and shakes"
              className="h-10 w-[122px] object-contain object-left transition-transform duration-500 hover:-rotate-2 hover:scale-[1.025] sm:h-12 sm:w-[154px] lg:h-14 lg:w-[184px]"
            />
          </a>

          {/* Desktop navigation */}
          <nav aria-label="Primary navigation" className="hidden items-center gap-[clamp(1.2rem,2.2vw,2.8rem)] text-[13px] font-bold text-ink lg:flex">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="group relative py-2 transition-colors hover:text-mango-deep"
              >
                {label}
                <span aria-hidden="true" className="absolute -bottom-0.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-[65%_35%_65%_35%] bg-mango opacity-0 transition-all duration-300 group-hover:bottom-0 group-hover:opacity-100" />
              </a>
            ))}
          </nav>

          {/* CTA button */}
          <a
            href="/#franchise"
            className="hidden items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[13px] font-bold text-cream shadow-[inset_0_-3px_0_rgba(0,0,0,.18)] transition-all hover:-translate-y-0.5 hover:bg-mango hover:text-ink lg:flex"
          >
            Partner with us <ArrowUpRight size={14} />
          </a>

          {/* Mobile menu toggle */}
          <button
            className="grid h-11 w-11 place-items-center rounded-full bg-ink text-cream shadow-md transition-transform active:scale-95 lg:hidden"
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
            className="fixed inset-x-3 top-[4.75rem] z-40 mx-auto max-w-[1320px] overflow-hidden rounded-3xl bg-ink text-cream shadow-xl sm:inset-x-6 lg:hidden"
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
                href="/#franchise"
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
