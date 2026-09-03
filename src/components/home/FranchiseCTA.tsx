import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function FranchiseCTA() {
  return (
    <section className="w-full py-24 bg-cocoa-900 text-cream-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
        
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Bangalore roots.<br/>
            <span className="text-mango-500">Bigger ambitions.</span>
          </h2>
          <p className="text-cream-100/80 font-sans text-lg mb-8 max-w-md">
            Mango's isn't just a café; it's a rapidly expanding premium brand. With a proven compact store model and comprehensive setup support, we are looking for ambitious partners to scale with us.
          </p>
          
          <ul className="space-y-4 mb-10 text-cream-100 font-sans">
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-mango-500" />
              Proven High-ROI Concept
            </li>
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-mango-500" />
              End-to-End Setup & Training
            </li>
            <li className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-mango-500" />
              Ongoing Marketing Support
            </li>
          </ul>

          <Link to="/franchise" className="inline-block px-8 py-4 bg-transparent border-2 border-mango-500 text-mango-500 font-semibold rounded-full hover:bg-mango-500 hover:text-cocoa-900 transition-colors duration-300">
            Explore Franchise Opportunity
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative h-[500px] rounded-2xl overflow-hidden"
        >
          <img 
            src="/assets/images/store-ambience-placeholder.jpg" 
            alt="Mango's Store Ambience"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}