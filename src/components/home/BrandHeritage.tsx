import { motion } from 'framer-motion';

export default function BrandHeritage() {
  return (
    <section className="py-28 px-6 bg-cream-50 text-cocoa-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Editorial Text */}
        <div className="lg:col-span-6">
          <span className="text-mango-600 font-bold uppercase tracking-[0.2em] text-xs block mb-4">
            How It All Started
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-8">
            A 16-year-old kid, <br/>
            <span className="italic font-light text-cocoa-800">a bus to Bangalore,</span> <br/>
            and a bag of mangoes.
          </h2>
          <p className="text-cocoa-800/80 text-lg leading-relaxed mb-6">
            When our founder left home in Kerala with nothing but curiosity and a big dream, those mangoes became the symbol of everything that followed. 
          </p>
          <p className="text-cocoa-800/80 text-lg leading-relaxed mb-8">
            Today, that ambition has blossomed into <strong className="text-cocoa-900 font-semibold">15 outlets across Bangalore and the UAE</strong>, serving everyday joy through our signature ice creams, thick shakes, and warm waffles.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-cocoa-900/10">
            <div>
              <p className="font-display font-bold text-4xl text-mango-600 mb-1">15+</p>
              <p className="text-sm text-cocoa-800/70 uppercase tracking-wider font-semibold">Active Outlets</p>
            </div>
            <div>
              <p className="font-display font-bold text-4xl text-mango-600 mb-1">2+</p>
              <p className="text-sm text-cocoa-800/70 uppercase tracking-wider font-semibold">Countries (India & UAE)</p>
            </div>
          </div>
        </div>

        {/* Right Visual Card */}
        <div className="lg:col-span-6 relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-cocoa-900 flex items-center justify-center p-8 text-center"
          >
            {/* Ambient Lighting inside card */}
            <div className="absolute inset-0 bg-gradient-to-t from-cocoa-900 via-cocoa-800 to-transparent opacity-90" />
            
            <div className="relative z-10 max-w-md">
              <span className="text-mango-500 font-display text-7xl font-bold block mb-4">“</span>
              <p className="text-cream-50 font-display text-2xl md:text-3xl italic leading-relaxed mb-6">
                A place you love to come back to. Made for happy days.
              </p>
              <div className="w-12 h-1 bg-mango-500 mx-auto rounded-full" />
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}