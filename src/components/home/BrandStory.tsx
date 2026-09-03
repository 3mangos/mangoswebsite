import { motion } from 'framer-motion';

export default function BrandStory() {
  return (
    <section className="py-24 px-6 w-full bg-cocoa-900 text-cream-50">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="aspect-[4/5] bg-cream-50/10 rounded-2xl flex items-center justify-center"
        >
          <span className="text-cream-50/40 font-semibold tracking-widest uppercase">Story Image</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-mango-500 mb-6">
            The Mango's Story
          </h2>
          <p className="text-lg text-cream-100 mb-6 leading-relaxed">
            What started as a single café in Bangalore has grown into a destination for dessert lovers across the city. We believe in rich textures, bold flavors, and spaces designed for connection.
          </p>
          <button className="px-8 py-3 rounded-full border border-mango-500 text-mango-500 font-semibold hover:bg-mango-500 hover:text-cocoa-900 transition-colors">
            Discover Our Journey
          </button>
        </motion.div>
      </div>
    </section>
  );
}