import { motion } from 'framer-motion';

export default function SignatureProducts() {
  return (
    <section className="py-24 px-6 w-full bg-cream-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-cocoa-900 mb-4">
            Signature Indulgences
          </h2>
          <p className="text-cocoa-800 text-lg">Curated to satisfy the most serious cravings.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* We will map over real data here later. This is the skeleton. */}
          {[1, 2, 3].map((item) => (
            <motion.div 
              key={item}
              whileHover={{ y: -10 }}
              className="bg-cream-100 rounded-2xl p-6 flex flex-col items-center text-center cursor-pointer border border-cocoa-900/5 shadow-sm"
            >
              <div className="w-full aspect-square bg-cocoa-900/5 rounded-xl mb-6 relative overflow-hidden">
                 <div className="absolute inset-0 flex items-center justify-center text-cocoa-900/40 text-sm font-semibold">
                   Product Image {item}
                 </div>
              </div>
              <h3 className="font-display font-bold text-2xl text-cocoa-900 mb-2">Signature Item</h3>
              <p className="text-cocoa-800 text-sm">Rich, creamy, and loaded with flavor.</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}