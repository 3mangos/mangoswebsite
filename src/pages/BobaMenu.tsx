import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { findMenuCollection } from '../data/menu';

export default function BeverageCollection() {
  const { category, collection } = useParams<{ category: string; collection: string }>();
  const reduced = useReducedMotion();
  const activeCollection = findMenuCollection(category, collection);
  const parentName = category === 'desserts' ? 'Desserts' : 'Beverages';

  if (!activeCollection) return <Navigate to="/menu" replace />;

  return <main className="min-h-screen overflow-x-clip bg-night pt-24 text-cream sm:pt-28">
    <Helmet>
      <title>{`${activeCollection.name} | Mango's Menu`}</title>
      <meta name="description" content={activeCollection.description} />
    </Helmet>

    <section className="relative isolate overflow-hidden px-5 pb-16 pt-8 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24 xl:px-16">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_88%_7%,rgba(255,185,0,.17),transparent_22%),radial-gradient(circle_at_4%_82%,rgba(49,135,92,.18),transparent_28%)]" />
      <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 opacity-[.07]" />
      <div className="relative mx-auto max-w-[1480px]">
        <header className="flex items-end justify-between gap-5 border-b border-white/15 pb-7 sm:pb-9"><div><Link to={`/menu/${category}`} className="group inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.14em] text-cream/65 transition-colors hover:text-mango focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mango focus-visible:ring-offset-4 focus-visible:ring-offset-night"><ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" /> {parentName}</Link><h1 className="display mt-5 text-[clamp(3.7rem,10vw,8.8rem)] leading-[.78] tracking-[-.09em] text-cream">{activeCollection.name}.</h1></div></header>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:mt-9 lg:grid-cols-3 lg:gap-5">
          {activeCollection.products.map((product, index) => <motion.article key={product.name} initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .16 }} transition={{ delay: index * .07, duration: .48, ease: [0.16, 1, 0.3, 1] }} className="group overflow-hidden rounded-[1.7rem] border border-white/15 bg-white/[.06] shadow-[0_18px_30px_rgba(0,0,0,.16)]">
            <div className="relative h-[275px] overflow-hidden p-5 sm:h-[320px] sm:p-7" style={{ background: product.surface }}><div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_70%_18%,rgba(255,232,165,.42),transparent_28%),linear-gradient(180deg,rgba(255,255,255,.12),transparent_58%)]" /><div aria-hidden="true" className="absolute bottom-7 left-1/2 h-8 w-[58%] -translate-x-1/2 rounded-[100%] bg-night/35 blur-xl" /><span aria-hidden="true" className="display absolute right-5 top-4 text-6xl leading-none text-cream/[.18]">0{index + 1}</span><img src={product.image} alt={product.name} loading={index < 2 ? 'eager' : 'lazy'} fetchPriority={index < 2 ? 'high' : 'auto'} decoding="async" className="relative z-10 mx-auto h-full w-full object-contain object-center drop-shadow-[0_20px_18px_rgba(7,34,26,.24)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-[1.035]" /></div>
            <div className="border-t border-white/15 px-5 py-5 sm:px-7 sm:py-6" style={{ background: product.surface }}><h2 className="display text-[2rem] leading-[.86] tracking-[-.05em] text-cream sm:text-[2.25rem]">{product.name}</h2><p className="mt-3 text-sm leading-relaxed text-cream/75">{product.description}</p></div>
          </motion.article>)}
        </div>
      </div>
    </section>
  </main>;
}
