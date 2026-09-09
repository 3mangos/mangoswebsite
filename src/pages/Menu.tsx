import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowUpRight, CupSoda, Grid2X2, IceCreamCone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { menuSections } from '../data/menu';

const icons = [CupSoda, Grid2X2, IceCreamCone] as const;

export default function Menu() {
  const reduced = useReducedMotion();

  return <main className="min-h-screen overflow-x-clip bg-cream pt-24 text-ink sm:pt-28">
    <Helmet>
      <title>Menu | Mango's</title>
      <meta name="description" content="Explore the Mango's menu: beverages, bites and desserts." />
    </Helmet>

    <section className="relative isolate overflow-hidden px-5 pb-16 pt-8 sm:px-8 sm:pb-20 lg:px-12 xl:px-16">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_82%_16%,rgba(255,185,0,.24),transparent_22%),radial-gradient(circle_at_2%_85%,rgba(44,108,72,.2),transparent_30%),linear-gradient(145deg,#fffaf0_0%,#f4ead8_100%)]" />
      <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 opacity-[.06]" />
      <div className="relative mx-auto max-w-[1480px]">
        <Link to="/#experience" className="group inline-flex items-center gap-2 rounded-full border border-ink/15 bg-cream/70 px-4 py-2.5 text-sm font-bold shadow-[0_8px_20px_rgba(16,59,43,.08)] transition-all hover:-translate-y-0.5 hover:border-ink/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mango-deep focus-visible:ring-offset-4">
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" /> Back to the good stuff
        </Link>

        <div className="mt-10 max-w-2xl">
          <p className="eyebrow flex items-center gap-3 text-mango-deep"><span className="h-px w-8 bg-mango-deep/55" />The full menu</p>
          <h1 className="display mt-5 text-[clamp(4rem,9vw,8rem)] leading-[.8] tracking-[-.08em]">Pick a mood.<br /><span className="text-mango-deep">Follow the craving.</span></h1>
          <p className="mt-7 max-w-[38ch] text-base leading-relaxed text-ink/70 sm:text-lg">Three easy ways into Mango’s. Pick a category to discover its collections.</p>
        </div>

        <div className="mt-10 grid gap-4 lg:mt-14 lg:grid-cols-3 lg:gap-5">
          {menuSections.map((section, index) => {
            const Icon = icons[index];
            const light = section.slug !== 'bites';
            return <motion.div key={section.slug} initial={reduced ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .18 }} transition={{ delay: index * .08, duration: .55, ease: [0.16, 1, 0.3, 1] }}>
              <Link to={`/menu/${section.slug}`} className="group relative block min-h-[260px] overflow-hidden rounded-[1.8rem] border border-white/25 p-6 shadow-[0_14px_0_rgba(16,59,43,.14),0_24px_36px_rgba(16,59,43,.1)] transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[0_18px_0_rgba(16,59,43,.15),0_32px_45px_rgba(16,59,43,.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mango-deep focus-visible:ring-offset-4 sm:min-h-[300px] sm:rounded-[2rem] sm:p-7" style={{ background: section.surface }}>
                <div aria-hidden="true" className="absolute -right-12 -top-16 h-56 w-56 rounded-full border border-white/15" />
                <span aria-hidden="true" className={`display absolute right-5 top-4 text-7xl leading-none ${light ? 'text-white/[.12]' : 'text-ink/[.13]'}`}>0{index + 1}</span>
                <div className={`relative grid h-10 w-10 place-items-center rounded-full ${light ? 'bg-mango text-ink' : 'bg-ink text-cream'}`}><Icon size={19} /></div>
                <div className="relative z-10 mt-9 max-w-[60%] sm:mt-12"><p className={`display text-4xl leading-[.84] tracking-[-.055em] sm:text-5xl ${light ? 'text-cream' : 'text-ink'}`}>{section.name}</p><p className={`mt-3 text-xs font-bold uppercase tracking-[.14em] ${light ? 'text-cream/65' : 'text-ink/62'}`}>{section.countLabel}</p></div>
                <img src={section.image} alt="" aria-hidden="true" loading="lazy" decoding="async" className={`pointer-events-none absolute -bottom-10 -right-3 h-[80%] w-[59%] object-contain drop-shadow-[0_26px_21px_rgba(0,0,0,.25)] transition-transform duration-500 group-hover:-translate-y-3 group-hover:scale-[1.045] ${section.slug === 'desserts' ? 'mix-blend-multiply' : ''}`} />
                <span className={`absolute bottom-6 left-6 z-10 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[.14em] sm:left-7 ${light ? 'text-cream' : 'text-ink'}`}>Explore collections <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
              </Link>
            </motion.div>;
          })}
        </div>
      </div>
    </section>

    <section className="relative overflow-hidden bg-night px-5 py-14 text-cream sm:px-8 sm:py-16 lg:px-12 xl:px-16">
      <div aria-hidden="true" className="absolute -right-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full border border-white/10" />
      <div className="relative mx-auto flex max-w-[1480px] flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow text-mango">Need a little direction?</p><h2 className="display mt-3 text-4xl leading-[.85] sm:text-6xl">Start anywhere.<br />It all gets good.</h2></div><Link to="/#visit" className="group inline-flex items-center justify-center gap-2 rounded-full bg-mango px-6 py-4 text-sm font-bold text-ink shadow-[inset_0_-2px_0_rgba(0,0,0,.13),0_10px_22px_rgba(0,0,0,.2)] transition-all hover:-translate-y-0.5 hover:bg-cream">Find us <ArrowUpRight size={17} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link></div>
    </section>
  </main>;
}
