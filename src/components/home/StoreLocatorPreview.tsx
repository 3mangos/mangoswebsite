import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react';

const featuredOutlets = [
  { city: 'Bangalore', area: 'Kalyan Nagar', address: '#426, 4th Main Rd, HRBR Layout', hours: '11:00 AM – 12:00 AM' },
  { city: 'Bangalore', area: 'Kalyan Nagar / HRBR', address: '2nd Block, Kalyan Nagar', hours: '11:00 AM – 12:00 AM' },
  { city: 'UAE', area: 'Dubai Flagship', address: 'Coming soon across major hubs', hours: '10:00 AM – 1:00 AM' },
];

export default function StoreLocatorPreview() {
  return (
    <section className="py-28 px-6 bg-cream-50 text-cocoa-900 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-mango-600 font-bold uppercase tracking-[0.2em] text-xs block mb-3">
              Global Presence
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold">
              Find Your Nearest Mango's
            </h2>
          </div>
          <p className="text-cocoa-800/70 max-w-sm mt-4 md:mt-0">
            15+ vibrant outlets spanning Bangalore and the UAE. Drop by for fresh daily batches.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredOutlets.map((outlet, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-cream-100 border border-cocoa-900/10 rounded-3xl p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-shadow"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="px-3 py-1 rounded-full bg-mango-500/20 text-mango-600 text-xs font-bold uppercase tracking-wider">
                    {outlet.city}
                  </span>
                  <MapPin className="w-5 h-5 text-mango-600" />
                </div>
                <h3 className="font-display font-bold text-2xl text-cocoa-900 mb-2">
                  {outlet.area}
                </h3>
                <p className="text-cocoa-800/80 text-sm mb-6 flex items-start gap-2">
                  {outlet.address}
                </p>
                <div className="space-y-2 text-xs text-cocoa-800/70 border-t border-cocoa-900/10 pt-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-mango-600" />
                    <span>{outlet.hours}</span>
                  </div>
                </div>
              </div>

              <button className="mt-8 w-full py-3 rounded-full bg-cocoa-900 text-cream-50 font-semibold text-sm hover:bg-mango-500 hover:text-cocoa-900 transition-colors flex items-center justify-center gap-2 cursor-pointer">
                <span>Get Directions</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}