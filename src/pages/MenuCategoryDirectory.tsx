import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { findMenuSection } from '../data/menu';

export default function MenuCategoryDirectory() {
  const { category } = useParams<{ category: string }>();
  const section = findMenuSection(category);
  const reduced = useReducedMotion();

  if (!section) return <Navigate to="/menu" replace />;

  return <main className="min-h-screen overflow-x-clip bg-night pt-24 text-cream sm:pt-28">
    <Helmet>
      <title>{`${section.name} | Mango's Menu`}</title>
      <meta name="description" content={`Explore Mango's ${section.name.toLowerCase()} menu.`} />
    </Helmet>

    <section className="relative isolate overflow-hidden px-5 pb-16 pt-8 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24 xl:px-16">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_88%_7%,rgba(255,185,0,.17),transparent_22%),radial-gradient(circle_at_4%_82%,rgba(49,135,92,.18),transparent_28%)]" />
      <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 opacity-[.07]" />
      <div className="relative mx-auto max-w-[1480px]">
        <header className="flex items-end justify-between gap-5 border-b border-white/15 pb-7 sm:pb-9">
          <div><Link to="/menu" className="group inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.14em] text-cream/65 transition-colors hover:text-mango focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mango focus-visible:ring-offset-4 focus-visible:ring-offset-night"><ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" /> All menu</Link><h1 className="display mt-5 text-[clamp(4.2rem,10vw,8.8rem)] leading-[.78] tracking-[-.09em] text-cream">{section.name}.</h1></div>
        </header>

        <div className={`mt-7 grid gap-4 sm:grid-cols-2 lg:mt-9 lg:gap-5 ${section.slug === 'bites' ? 'lg:grid-cols-3' : ''}`}>
          {section.collections.map((collection, index) => {
            const hasCollectionPage = (section.slug === 'beverages' || section.slug === 'desserts') && 'slug' in collection;
            const cardClass = 'group block overflow-hidden rounded-[1.7rem] border border-white/15 bg-white/[.06] shadow-[0_18px_30px_rgba(0,0,0,.16)]';
            const card = <><div className="relative h-[230px] overflow-hidden p-5 sm:h-[285px] sm:p-7" style={{ background: collection.surface }}><div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(255,231,160,.38),transparent_28%),linear-gradient(180deg,rgba(255,255,255,.12),transparent_58%)]" /><span aria-hidden="true" className="display absolute right-5 top-4 text-6xl leading-none text-cream/[.16]">0{index + 1}</span><span aria-hidden="true" className="absolute bottom-6 left-1/2 h-7 w-[58%] -translate-x-1/2 rounded-[100%] bg-night/35 blur-xl" /><img src={collection.image} alt={collection.name} loading="lazy" decoding="async" className="relative z-10 h-full w-full object-contain drop-shadow-[0_24px_20px_rgba(7,34,26,.26)] transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-[1.035]" /></div><div className="border-t border-white/15 px-5 py-5 sm:px-7 sm:py-6" style={{ background: collection.surface }}><h2 className="display text-[2rem] leading-[.86] tracking-[-.05em] text-cream sm:text-[2.25rem]">{collection.name}</h2><p className="mt-3 max-w-[35ch] text-sm leading-relaxed text-cream/75">{collection.description}</p>{hasCollectionPage && <span className="mt-4 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[.14em] text-mango">See all flavours <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>}</div></>;
            return <motion.div key={collection.name} initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .16 }} transition={{ delay: index * .07, duration: .48, ease: [0.16, 1, 0.3, 1] }}>{hasCollectionPage ? <Link to={`/menu/${section.slug}/${collection.slug}`} className={`${cardClass} transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mango focus-visible:ring-offset-4 focus-visible:ring-offset-night`}>{card}</Link> : <article className={cardClass}>{card}</article>}</motion.div>;
          })}
        </div>

        <div className="mt-10 border-t border-white/15 pt-7"><Link to="/menu" className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-cream transition-all hover:-translate-y-0.5 hover:border-mango hover:text-mango">Explore another category <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link></div>
      </div>
    </section>
  </main>;
}
