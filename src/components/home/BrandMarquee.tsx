import { motion } from 'framer-motion';

export default function BrandMarquee() {
  return (
    <div className="w-full bg-mango-500 py-4 overflow-hidden border-y-2 border-cocoa-900 flex items-center">
      <motion.div 
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ 
          repeat: Infinity, 
          ease: "linear", 
          duration: 15 
        }}
      >
        {/* We duplicate the text array to create a seamless infinite scroll loop */}
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center">
            <span className="text-cocoa-900 font-display font-black uppercase text-2xl md:text-4xl tracking-widest mx-6">
              Made For Cravings
            </span>
            <span className="text-cream-50 text-2xl">✦</span>
            <span className="text-cocoa-900 font-display font-black uppercase text-2xl md:text-4xl tracking-widest mx-6">
              Built For Moments
            </span>
            <span className="text-cream-50 text-2xl">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}