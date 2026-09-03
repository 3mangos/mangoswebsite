import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useLenis } from 'lenis/react'; // Requires 'lenis/react' if using the hook, otherwise we use window.scrollTo

export default function MangoBackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 800) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0, rotate: -45 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0, rotate: 45 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          onClick={scrollToTop}
          whileHover={{ 
            scale: 1.1, 
            rotate: 15, // Subtle tilt of the mango shape
            transition: { type: "spring", stiffness: 400, damping: 10 } 
          }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-mango-500 shape-mango flex items-center justify-center shadow-xl cursor-pointer hover:bg-mango-400 group"
          aria-label="Back to top"
        >
          {/* We counter-rotate the icon so it stays upright despite the mango shape rotating 45deg in CSS */}
          <ArrowUp className="text-cocoa-900 w-6 h-6 -rotate-45 group-hover:-translate-y-1 transition-transform duration-300" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}