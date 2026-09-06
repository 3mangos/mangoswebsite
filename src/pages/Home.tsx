import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { AnimatePresence, motion, useInView, useMotionValue, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Instagram, MapPin } from 'lucide-react';
import { ASSETS } from '../data/assets';

const ease = [0.16, 1, 0.3, 1] as const;
const products = [
  { name: 'Mango Cream', note: 'Fruit-forward', image: ASSETS.products.mangoCream, color: '#ffb900', word: 'SUNNY' },
  { name: 'Belgian Chocolate', note: 'Velvety shake', image: ASSETS.products.chocolateShake, color: '#6d3621', word: 'RICH' },
  { name: 'Biscoff Sundae', note: 'Spoon-worthy', image: ASSETS.products.biscoffSundae, color: '#dc8b3f', word: 'CRUNCH' },
  { name: 'Blue Lime Boba', note: 'Sip something wild', image: ASSETS.products.blueMojito, color: '#147ed1', word: 'COOL' },
];

function MagneticLink({ href, children, dark = true }: { href: string; children: ReactNode; dark?: boolean }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const reduced = useReducedMotion();
  function move(event: MouseEvent<HTMLAnchorElement>) {
    if (reduced || window.matchMedia('(pointer: coarse)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setOffset({ x: (event.clientX - rect.left - rect.width / 2) * .16, y: (event.clientY - rect.top - rect.height / 2) * .2 });
  }
  return <motion.a href={href} onMouseMove={move} onMouseLeave={() => setOffset({ x: 0, y: 0 })} animate={offset} transition={{ type: 'spring', stiffness: 240, damping: 16 }} className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-4 text-sm font-bold shadow-[inset_0_-2px_0_rgba(0,0,0,.14),0_10px_24px_rgba(0,0,0,.12)] max-[360px]:px-4 max-[360px]:py-3 max-[360px]:text-[13px] ${dark ? 'bg-ink text-cream hover:text-ink' : 'border border-ink/20 bg-cream/70 text-ink hover:text-cream'}`}><span aria-hidden="true" className={`absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 ${dark ? 'bg-mango' : 'bg-ink'}`} /><span className="relative">{children}</span><ArrowUpRight size={17} className="relative transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></motion.a>;
}


function OfficialWordmark({ className = '', alt = "Mango's" }: { className?: string; alt?: string }) {
  return <img src={ASSETS.logo} alt={alt} className={`block h-auto object-contain ${className}`} />;
}

function Intro() {
  const [show, setShow] = useState(true);
  useEffect(() => { const id = window.setTimeout(() => setShow(false), 1500); return () => window.clearTimeout(id); }, []);
  return <AnimatePresence>{show && <motion.div exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: .72, ease } }} className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-ink text-cream"><motion.div animate={{ scale: [1, 1.16, 1], opacity: [.26, .48, .26] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} className="absolute h-[52vmax] w-[52vmax] rounded-full bg-[radial-gradient(circle,#ffd75a_0%,#ffb900_35%,rgba(241,139,0,.12)_68%,transparent_72%)] blur-xl" /><div className="relative flex flex-col items-center"><motion.div initial={{ scale: .88, y: 16, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} transition={{ duration: .65, ease }}><OfficialWordmark className="w-[250px] md:w-[320px]" /></motion.div><motion.p initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: .35, duration: .65 }} className="mt-4 origin-left border-t border-mango pt-3 text-[10px] font-bold uppercase tracking-[.26em] text-mango">A little happy is loading</motion.p></div><div className="grain absolute inset-0 opacity-20" /></motion.div>}</AnimatePresence>;
}

function Hero() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.15 });
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const productX = useTransform(pointerX, (value) => value * -0.45);
  const productY = useTransform(pointerY, (value) => value * -0.35);
  const leafX = useTransform(pointerX, (value) => value * 0.28);

  function move(event: MouseEvent<HTMLElement>) {
    if (!reduced && !window.matchMedia('(pointer: coarse)').matches) {
      pointerX.set((event.clientX / window.innerWidth - .5) * 24);
      pointerY.set((event.clientY / window.innerHeight - .5) * 24);
    }
  }

  const liveMotion = !reduced && inView;
  return <section ref={ref} onMouseMove={move} className="relative isolate min-h-[100svh] overflow-x-clip bg-vanilla px-5 pb-7 pt-24 text-ink max-[360px]:px-4 max-[360px]:pt-[5.55rem] md:px-10 md:pb-8 md:pt-24">
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.1, ease }} aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_76%_28%,rgba(255,185,0,.17),transparent_23%),radial-gradient(circle_at_16%_88%,rgba(255,215,90,.2),transparent_27%),linear-gradient(145deg,#fffaf0_0%,#f8efdE_55%,#f2e3ca_100%)]" />
    <div aria-hidden="true" className="absolute right-[-15rem] top-[-13rem] h-[38rem] w-[38rem] rounded-full border border-mango/20 opacity-55" />
    <div className="grain pointer-events-none absolute inset-0 opacity-[.045]" />
    <div className="relative mx-auto w-full max-w-7xl md:min-h-[calc(100svh-8rem)]">
      <motion.div initial={{ opacity: 0, y: -18, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: .16, duration: .72, ease }} className="relative z-30"><OfficialWordmark className="w-[205px] max-[360px]:w-[184px] md:w-[300px]" /></motion.div>
      <div className="relative z-10 mt-4 md:mt-0">
        <h1 className="display relative z-30 max-w-[8ch] text-[2.95rem] leading-[.88] tracking-[-.075em] text-ink max-[360px]:text-[2.7rem] md:mt-8 md:max-w-[10ch] md:text-[clamp(4.3rem,5.8vw,7.2rem)]">
          <span className="block overflow-hidden pb-2"><motion.span initial={{ y: '116%' }} animate={{ y: 0 }} transition={{ delay: .64, duration: .82, ease }} className="block md:whitespace-nowrap">A little</motion.span></span>
          <span className="block overflow-hidden pb-2"><motion.span initial={{ y: '116%' }} animate={{ y: 0 }} transition={{ delay: .75, duration: .82, ease }} className="block text-mango-deep md:whitespace-nowrap"><i className="font-light">happy</i> goes</motion.span></span>
          <span className="block overflow-hidden pb-3 md:pb-5"><motion.span initial={{ y: '116%' }} animate={{ y: 0 }} transition={{ delay: .86, duration: .82, ease }} className="block md:whitespace-nowrap">a long way.</motion.span></span>
        </h1>

        <div className="relative mt-5 h-[225px] max-[360px]:h-[195px] md:absolute md:right-[-2%] md:top-[-3.5rem] md:mt-0 md:h-[470px] md:w-[61%]">
          <motion.div initial={{ opacity: 0, scale: .92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .2, duration: .9, ease }} aria-hidden="true" className="absolute inset-x-[3%] bottom-[4%] top-[6%] rounded-t-[48%] rounded-b-[3.4rem] bg-[radial-gradient(circle_at_74%_19%,rgba(255,221,130,.42),transparent_15%),radial-gradient(circle_at_39%_72%,rgba(105,163,83,.25),transparent_31%),linear-gradient(145deg,#1b4935_0%,#08261d_78%)] shadow-[0_30px_65px_rgba(16,59,43,.22),inset_0_1px_0_rgba(255,255,255,.1)] md:inset-x-auto md:-right-[16%] md:left-[-2%] md:bottom-[2%] md:top-[4%] md:rounded-l-[18rem] md:rounded-r-none" />
          <motion.div initial={{ opacity: 0, y: 76, scale: .94 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 60, damping: 18, delay: .28 }} aria-hidden="true" className="absolute inset-x-[10%] bottom-[7%] h-[29%] rounded-[50%] bg-[linear-gradient(180deg,#ffebbd_0%,#f6c56d_41%,#d57d25_100%)] shadow-[inset_0_14px_22px_rgba(255,255,255,.34),0_14px_28px_rgba(0,0,0,.2)] will-change-transform md:inset-x-[13%] md:bottom-[6%] md:h-[25%]" />
          <div aria-hidden="true" className="absolute inset-x-[14%] bottom-[7%] h-[25%] rounded-[50%] opacity-[.14] md:inset-x-[17%] md:bottom-[6%] md:h-[21%]" style={{ backgroundImage: 'linear-gradient(rgba(255,250,240,.74) 1px, transparent 1px), linear-gradient(90deg, rgba(255,250,240,.74) 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
          <motion.div animate={liveMotion ? { opacity: [.18, .42, .18], scale: [1, 1.1, 1] } : undefined} transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }} aria-hidden="true" className="absolute left-1/2 top-[20%] h-[44%] w-[56%] -translate-x-1/2 rounded-full bg-mango/25 blur-2xl will-change-transform" />
          <motion.div style={{ x: leafX }} className="absolute right-[15%] top-[11%] z-20"><motion.span initial={{ opacity: 0, y: -38, rotate: -25 }} animate={{ opacity: 1, y: 0, rotate: -10 }} transition={{ type: 'spring', stiffness: 68, damping: 18, delay: .56 }} className="block h-10 w-7 rounded-[100%_0_100%_0] bg-[#78a84e] shadow-[inset_3px_3px_5px_rgba(255,255,255,.27),0_12px_16px_rgba(0,0,0,.25)] will-change-transform md:h-20 md:w-14" /></motion.div>
          <motion.div style={{ x: productX, y: productY }} className="absolute bottom-[-3%] left-1/2 z-30 h-[118%] w-[115%] max-w-[690px] -translate-x-1/2 md:bottom-[-5%] md:h-[115%] md:w-[112%]">
            <motion.div initial={{ opacity: 0, y: -140, rotate: -8, scale: .9 }} animate={{ opacity: 1, y: 0, rotate: -3, scale: 1 }} transition={{ type: 'spring', stiffness: 55, damping: 16, delay: .4 }} className="h-full w-full will-change-transform"><motion.img animate={liveMotion ? { y: [0, -5, 0] } : undefined} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1.3 }} src={ASSETS.products.mangoCream} alt="Mango Cream dessert" className="h-full w-full object-contain drop-shadow-[0_38px_27px_rgba(0,0,0,.48)] will-change-transform" /></motion.div>
          </motion.div>
          <motion.div animate={liveMotion ? { scaleX: [1, 1.08, 1], opacity: [.38, .6, .38] } : undefined} transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }} aria-hidden="true" className="absolute bottom-[11%] left-1/2 z-20 h-7 w-[48%] -translate-x-1/2 rounded-[100%] bg-black/42 blur-xl will-change-transform md:bottom-[9%] md:h-12" />
        </div>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: .55, ease }} className="relative z-30 mt-5 max-w-sm md:mt-8"><p className="text-sm leading-relaxed text-ink/68">Made for happy days — one bright scoop, sip and shared moment at a time.</p><div className="mt-5 flex flex-wrap gap-2.5 md:mt-7 md:gap-3"><MagneticLink href="#experience">Explore Menu</MagneticLink><MagneticLink href="#visit" dark={false}>Find Us</MagneticLink></div></motion.div>
        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.18, duration: .5, ease }} className="relative z-30 mt-5 flex items-center gap-3 text-[9px] font-bold uppercase tracking-[.2em] text-mango-deep md:mt-7 md:text-[10px]"><span className="h-px w-8 bg-mango-deep/60" />Ice creams · waffles · shakes</motion.p>
      </div>
    </div>
  </section>;
}

function MangoMarquee() {
  return <section className="overflow-hidden border-y border-mango/15 bg-ink py-4 text-mango md:py-5"><div className="flex w-max animate-[marquee_22s_linear_infinite] whitespace-nowrap text-[.72rem] font-black uppercase tracking-[.08em] will-change-transform md:text-3xl md:tracking-[-.04em]">{Array(8).fill('Mango season is every season. ✦ ').map((text, index) => <span key={index} className="mx-4">{text}</span>)}</div></section>;
}

function LiquidPortal() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.04 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const productY = useTransform(scrollYProgress, [0, .16, .46, .76, 1], ['18%', '9%', '-4%', '-19%', '-35%']);
  const productX = useTransform(scrollYProgress, [0, .55, 1], ['-4%', '12%', '16%']);
  const productScale = useTransform(scrollYProgress, [0, .2, .58, .84, 1], [.78, .94, 1.07, .86, .68]);
  const productRotate = useTransform(scrollYProgress, [0, .42, .78, 1], [-14, -3, 8, 17]);
  const juicyY = useTransform(scrollYProgress, [0, .22, .7, 1], ['0%', '-10%', '-36%', '-60%']);
  const juicyOpacity = useTransform(scrollYProgress, [0, .18, .66, .86], [1, 1, .4, 0]);
  const blobScale = useTransform(scrollYProgress, [0, .24, .68, 1], [.58, .9, 1.13, 1.55]);
  const blobRotate = useTransform(scrollYProgress, [0, 1], [-8, 12]);
  const menuY = useTransform(scrollYProgress, [.1, .26, .7, .86], ['130%', '0%', '0%', '-70%']);
  const menuOpacity = useTransform(scrollYProgress, [.1, .24, .72, .86], [0, 1, 1, 0]);
  const moodY = useTransform(scrollYProgress, [.18, .38, .78, .93], ['145%', '0%', '0%', '-55%']);
  const moodOpacity = useTransform(scrollYProgress, [.18, .36, .8, .94], [0, 1, 1, 0]);
  const wordScale = useTransform(scrollYProgress, [.2, .52, .85], [.88, 1, 1.09]);
  const captionOpacity = useTransform(scrollYProgress, [.35, .48, .8, .92], [0, 1, 1, 0]);
  const exitY = useTransform(scrollYProgress, [.78, 1], ['112%', '0%']);
  const exitOpacity = useTransform(scrollYProgress, [.8, .96], [0, 1]);
  const liveMotion = !reduced && inView;

  return <section id="portal" ref={ref} className="relative h-[310svh] bg-mango md:h-[280vh]">
    <div className="sticky top-0 isolate h-[100svh] overflow-hidden bg-mango text-ink">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_17%,rgba(255,250,240,.55),transparent_18%),radial-gradient(circle_at_14%_82%,rgba(241,139,0,.32),transparent_34%),linear-gradient(135deg,#ffbd13_0%,#ffb900_48%,#f39b08_100%)]" />
      <div className="grain pointer-events-none absolute inset-0 opacity-[.07]" />
      <motion.div style={{ scale: blobScale, rotate: blobRotate }} className="absolute left-1/2 top-1/2 h-[68vmax] w-[68vmax] -translate-x-1/2 -translate-y-1/2 rounded-[46%_54%_61%_39%/42%_55%_45%_58%] bg-[#ffd75a] shadow-[inset_18px_16px_35px_rgba(255,255,255,.23),inset_-28px_-30px_44px_rgba(241,139,0,.16)] will-change-transform" />
      <motion.p style={{ y: juicyY, opacity: juicyOpacity }} className="display pointer-events-none absolute left-1/2 top-[18%] z-[1] w-max -translate-x-1/2 text-[27vw] leading-none will-change-transform md:top-[12%] md:text-[24vw]">JUICY</motion.p>
      <div className="absolute left-5 top-28 z-20 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.2em] md:left-[8%] md:top-[16%]"><span className="h-px w-9 bg-ink/65" />01 / 03 · slow good moods</div>
      <motion.div style={{ x: productX, y: productY, scale: productScale, rotate: productRotate }} className="pointer-events-none absolute inset-0 z-10 mx-auto h-full w-[min(94vw,680px)] will-change-transform md:w-[min(72vw,680px)]">
        <span aria-hidden="true" className="absolute bottom-[21%] left-1/2 h-14 w-[54%] -translate-x-1/2 rounded-[100%] bg-ink/20 blur-xl md:h-20 md:blur-2xl" />
        <motion.img animate={liveMotion ? { y: [0, -6, 0] } : undefined} transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }} src={ASSETS.products.mangoCream} alt="Mango's Mango Cream" className="relative h-full w-full object-contain md:drop-shadow-[0_42px_25px_rgba(0,0,0,.22)]" />
      </motion.div>
      <motion.div animate={liveMotion ? { rotate: [-13, 16, -13], y: [0, -9, 0] } : undefined} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} className="absolute right-[8%] top-[24%] z-20 h-16 w-11 rounded-[100%_0_100%_0] bg-[#5b9d47] shadow-[inset_3px_3px_5px_rgba(255,255,255,.35),0_10px_14px_rgba(0,0,0,.12)] will-change-transform md:right-[12%] md:top-[17%] md:h-32 md:w-20" />
      <motion.span animate={liveMotion ? { y: [0, 14, 0], scale: [1, .84, 1] } : undefined} transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }} className="absolute left-[14%] top-[42%] z-20 h-5 w-5 rounded-full bg-[#fff0a5] shadow-[inset_2px_2px_4px_rgba(255,255,255,.85),0_8px_11px_rgba(0,0,0,.12)] will-change-transform md:left-[18%] md:top-[32%] md:h-7 md:w-7" />
      <motion.span animate={liveMotion ? { y: [0, -10, 0], x: [0, 7, 0] } : undefined} transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }} className="absolute bottom-[29%] right-[15%] z-20 h-3 w-3 rounded-full bg-mango-deep shadow-[inset_2px_2px_3px_rgba(255,255,255,.65),0_8px_11px_rgba(0,0,0,.14)] will-change-transform md:h-5 md:w-5" />
      <motion.div style={{ opacity: menuOpacity, scale: wordScale }} className="absolute bottom-[28%] left-5 z-30 max-w-[20rem] origin-bottom-left will-change-transform md:bottom-[26%] md:left-[5%] md:max-w-none">
        <p className="eyebrow mb-3">A full-sensory hello</p>
        <p className="display overflow-hidden text-[3.55rem] leading-[.78] md:text-[clamp(4.5rem,6vw,5.8rem)]"><motion.span style={{ y: menuY }} className="block whitespace-nowrap will-change-transform">Not a <i className="font-light">menu.</i></motion.span></p>
      </motion.div>
      <motion.div style={{ opacity: moodOpacity, scale: wordScale }} className="absolute bottom-[14%] left-5 z-30 max-w-[22rem] origin-bottom-left will-change-transform md:bottom-[11%] md:left-[5%] md:max-w-none">
        <p className="display overflow-hidden text-[3.7rem] leading-[.78] md:text-[clamp(5.2rem,7vw,7rem)]"><motion.span style={{ y: moodY }} className="block whitespace-nowrap bg-gradient-to-b from-ink to-ink/70 bg-clip-text text-transparent will-change-transform">A mood <i className="font-light">shift.</i></motion.span></p>
      </motion.div>
      <motion.div style={{ opacity: captionOpacity }} className="absolute bottom-9 left-5 z-30 flex max-w-[11rem] items-end gap-3 text-left text-[10px] font-bold uppercase tracking-[.17em] md:bottom-11 md:left-auto md:right-[9%] md:max-w-[15rem] md:text-right"><span className="h-px w-8 shrink-0 bg-ink/70" />Fruit-forward. Full feeling.</motion.div>
      <motion.div style={{ opacity: captionOpacity }} className="absolute right-[7%] top-[40%] z-20 hidden md:block"><motion.img animate={liveMotion ? { y: [0, -8, 0], rotate: [-4, 3, -4] } : undefined} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} src={ASSETS.products.mangoMojito} alt="Mango boba mojito" loading="lazy" decoding="async" className="h-64 w-40 object-contain drop-shadow-[0_26px_18px_rgba(0,0,0,.2)] will-change-transform lg:h-80 lg:w-52" /></motion.div>
      <motion.div style={{ y: exitY, opacity: exitOpacity }} className="absolute inset-x-0 bottom-0 z-40 flex h-[62%] items-end rounded-t-[3.2rem] bg-vanilla px-5 pb-10 text-ink shadow-[0_-18px_34px_rgba(16,59,43,.16)] will-change-transform md:h-[68%] md:rounded-t-[4rem] md:px-[9%] md:pb-16">
        <div aria-hidden="true" className="absolute inset-x-5 top-10 border-t border-dashed border-ink/20 md:inset-x-[9%] md:top-16" />
        <img src={ASSETS.brandMark} alt="" aria-hidden="true" loading="lazy" decoding="async" className="absolute right-[9%] top-14 hidden h-48 w-52 rotate-[-8deg] object-contain md:block" />
        <div className="relative max-w-[34rem]">
          <p className="eyebrow text-mango-deep">Next chapter</p>
          <h2 className="display mt-3 max-w-[9ch] text-[clamp(2.9rem,12vw,4.3rem)] leading-[.9] tracking-[-.065em] md:max-w-none md:text-[clamp(4rem,6vw,6rem)]">A bag of mangoes.<br /><i className="font-light text-mango-deep">A big possibility.</i></h2>
          <p className="mt-5 max-w-[35ch] text-sm leading-relaxed text-ink/68">From Kerala to Bangalore, then into every bright little moment that followed.</p>
        </div>
      </motion.div>
    </div>
  </section>;
}


function Story() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.08 });
  const route = ['Kerala', 'Bangalore', 'UAE'];

  return <section ref={ref} id="story" className="relative z-20 mt-0 overflow-hidden bg-vanilla px-5 py-24 text-ink md:rounded-t-[3.25rem] md:px-10 md:py-32 md:shadow-[0_-22px_45px_rgba(16,59,43,.13)]">
    <motion.p
      initial={{ x: '-14%' }}
      whileInView={{ x: '-3%' }}
      viewport={{ once: true, amount: .35 }}
      transition={{ duration: 1.4, ease }}
      aria-hidden="true"
      className="display pointer-events-none absolute left-0 top-7 whitespace-nowrap text-[17vw] leading-none text-ink/[.055]"
    >KERALA · BANGALORE · UAE</motion.p>
    <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.04fr_.96fr] lg:items-center">
      <motion.div
        initial={false}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: .3 }}
        transition={{ duration: 1.1, ease }}
        className="relative min-h-[470px] overflow-hidden rounded-[2.6rem] bg-ink p-5 text-cream shadow-[0_22px_0_#ffb900] md:min-h-[560px] md:p-8"
      >
        <div className="grain absolute inset-0 opacity-20" />
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-mango blur-2xl opacity-80 md:blur-3xl" />
        <div className="absolute -bottom-36 -left-24 h-80 w-80 rounded-full bg-pink blur-2xl opacity-70 md:blur-3xl" />
        <motion.div
          animate={reduced || !inView ? undefined : { rotate: [-5, 5, -5], y: [0, -8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute right-[8%] top-[8%] h-24 w-16 rounded-[100%_0_100%_0] bg-[#5b9d47] opacity-90 md:h-36 md:w-24"
        />
        <div className="absolute inset-x-9 top-1/2 h-px -translate-y-1/2 border-t border-dashed border-mango/80" />
        <div className="relative z-10 flex h-full min-h-[430px] flex-col justify-between md:min-h-[490px]">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[.18em] text-mango">
            <span>Origin route</span><span>16 · then now</span>
          </div>
          <div className="relative flex items-center justify-center">
            <motion.div
              initial={reduced ? false : { scale: .45, rotate: -10, opacity: 0 }}
              whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 85, damping: 17, delay: .2 }}
              className="relative z-10 grid h-52 w-52 place-items-center rounded-[45%_55%_54%_46%/48%_44%_56%_52%] bg-cream p-5 shadow-[0_24px_36px_rgba(0,0,0,.32)] md:h-64 md:w-64 md:p-7"
            >
              <img src={ASSETS.brandMark} alt="Mango's runner carrying mangoes" className="h-full w-full object-contain" />
            </motion.div>
            <motion.img
              initial={reduced ? false : { opacity: 0, x: 70, y: 40, rotate: 18 }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: 8 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 75, damping: 15, delay: .35 }}
              src={ASSETS.products.mangoMojito}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="absolute -right-3 -bottom-14 z-20 h-52 w-32 object-contain drop-shadow-[0_24px_18px_rgba(0,0,0,.38)] md:right-4 md:h-72 md:w-44"
            />
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            {route.map((place, index) => <motion.div key={place} initial={reduced ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: .18 * index, ease }} className="relative rounded-2xl border border-white/15 bg-white/[.07] px-2 py-3 backdrop-blur-sm"><span className="block text-[9px] font-bold uppercase tracking-[.15em] text-mango">0{index + 1}</span><span className="mt-1 block text-xs font-bold md:text-sm">{place}</span></motion.div>)}
          </div>
        </div>
      </motion.div>
      <motion.div initial={reduced ? false : { opacity: 0, x: 42 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .4 }} transition={{ duration: .85, ease }}>
        <p className="eyebrow text-mango-deep">The Mango's story</p>
        <h2 className="display mt-4 text-5xl leading-[.86] md:text-7xl">More than a<br /><i className="font-light text-mango-deep">sweet stop.</i></h2>
        <p className="mt-7 max-w-lg text-base font-medium leading-relaxed text-ink/78">It started with a 16-year-old travelling from Kerala to Bangalore with a bag of mangoes and a big appetite for possibility. Today, that same bright energy is shared across Bangalore and the UAE.</p>
        <div className="mt-10 grid grid-cols-2 gap-3 border-t border-ink/15 pt-6">
          <div><p className="display text-4xl text-mango-deep">Fresh</p><p className="mt-1 text-[10px] font-bold uppercase tracking-[.17em] text-ink/55">beginnings</p></div>
          <div><p className="display text-4xl text-mango-deep">Full</p><p className="mt-1 text-[10px] font-bold uppercase tracking-[.17em] text-ink/55">of flavour</p></div>
        </div>
      </motion.div>
    </div>
  </section>;
}

function ProductUniverse() { const [active, setActive] = useState(0); const current = products[active]; return <section id="experience" className="overflow-hidden bg-night px-5 py-24 text-cream md:px-10 md:py-32"><div className="mx-auto max-w-7xl"><div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><div><p className="eyebrow text-mango">The good stuff</p><h2 className="display mt-3 text-5xl leading-[.86] md:text-7xl">Find your<br /><i className="font-light text-mango">favourite mood.</i></h2></div><p className="max-w-sm text-sm leading-relaxed text-cream/65">A colourful little universe of ice creams, shakes, falooda and feel-good extras. Explore the range, then let the craving decide.</p></div><div className="mt-12 grid gap-5 lg:grid-cols-[.8fr_1.2fr]"><div className="grid grid-cols-2 gap-3 lg:grid-cols-1">{products.map((product, i) => <button key={product.name} onClick={() => setActive(i)} className={`group flex items-center justify-between rounded-2xl border p-4 text-left transition-all ${i === active ? 'border-mango bg-mango text-ink' : 'border-white/15 text-cream hover:border-white/50'}`}><span><span className="block text-[10px] font-bold uppercase tracking-[.16em] opacity-60">0{i + 1}</span><span className="mt-1 block text-sm font-bold md:text-base">{product.name}</span></span><ArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={18} /></button>)}</div><motion.div layout className="relative min-h-[490px] overflow-hidden rounded-[2.2rem]" style={{ backgroundColor: current.color }}><span className="display absolute right-[-.07em] top-3 text-[clamp(5rem,14vw,10rem)] leading-none text-ink/15">{current.word}</span><div className="grain absolute inset-0 opacity-20" /><motion.img key={current.name} initial={{ opacity: 0, scale: .78, rotate: -8 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 110, damping: 17 }} src={current.image} alt={current.name} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-contain p-5 drop-shadow-[0_28px_18px_rgba(0,0,0,.24)] md:p-9" /><div className="absolute inset-x-5 bottom-5 flex items-end justify-between text-ink"><div><p className="eyebrow">{current.note}</p><p className="display mt-1 text-3xl">{current.name}</p></div><span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-cream"><ArrowUpRight size={20} /></span></div></motion.div></div><div className="mt-5 flex items-center gap-3 overflow-hidden whitespace-nowrap border-y border-white/15 py-4 text-[11px] font-bold uppercase tracking-[.19em] text-mango">{Array(7).fill('Creamy. Crunchy. Completely yours. ✦ ').map((t, i) => <span key={i}>{t}</span>)}</div></div></section>; }

function Experience() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { amount: 0.08 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const productY = useTransform(scrollYProgress, [0, .25, .72, 1], ['16%', '3%', '-8%', '-24%']);
  const productScale = useTransform(scrollYProgress, [0, .3, .68, 1], [.74, .95, 1.07, .82]);
  const productRotate = useTransform(scrollYProgress, [0, .55, 1], [-10, -2, 9]);
  const noteY = useTransform(scrollYProgress, [.28, .48, .84, 1], ['90%', '0%', '0%', '-45%']);
  const noteOpacity = useTransform(scrollYProgress, [.28, .46, .87, 1], [0, 1, 1, 0]);
  const curtainY = useTransform(scrollYProgress, [.75, 1], ['105%', '0%']);
  const liveMotion = !reduced && inView;

  return <section ref={ref} id="flavour" className="relative h-[230svh] overflow-clip bg-pink text-cream md:h-[210vh]">
    <div className="sticky top-0 isolate h-[100svh] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_18%,rgba(255,219,136,.35),transparent_16%),radial-gradient(circle_at_12%_83%,rgba(101,39,32,.5),transparent_30%),linear-gradient(145deg,#ef617b_0%,#d94767_49%,#a83f54_100%)]" />
      <div className="grain pointer-events-none absolute inset-0 opacity-[.08]" />
      <motion.p animate={liveMotion ? { x: ['0%', '-6%', '0%'] } : undefined} transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }} aria-hidden="true" className="display pointer-events-none absolute -right-[10%] top-[7%] whitespace-nowrap text-[25vw] leading-none text-cream/[.12] will-change-transform">FLAVOUR</motion.p>
      <div className="absolute inset-x-0 top-36 mx-auto h-[calc(100%-9rem)] max-w-7xl px-5 pt-28 md:px-10 md:pt-32">
        <div className="relative z-30 max-w-[19rem] md:max-w-[35rem]">
          <p className="eyebrow flex items-center gap-3 text-cream/80"><span className="h-px w-8 bg-cream/55" />Make it a moment</p>
          <h2 className="display mt-4 text-[clamp(3.55rem,12vw,7.8rem)] leading-[.83] tracking-[-.075em]">
            <span className="block overflow-hidden pb-2"><motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ delay: .12, duration: .72, ease }} className="block">Big flavour.</motion.span></span>
            <span className="block overflow-hidden"><motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ delay: .22, duration: .72, ease }} className="block"><i className="font-light text-[#ffe0a2]">Zero boring.</i></motion.span></span>
          </h2>
        </div>

        <motion.div style={{ y: productY, scale: productScale, rotate: productRotate }} className="pointer-events-none absolute left-1/2 top-[28%] z-20 h-[52%] w-[100%] max-w-[620px] -translate-x-1/2 will-change-transform md:left-[67%] md:top-[14%] md:h-[76%] md:w-[54%]">
          <div aria-hidden="true" className="absolute left-1/2 top-[18%] h-[62%] w-[74%] -translate-x-1/2 rounded-[49%_51%_43%_57%/50%_42%_58%_50%] bg-[radial-gradient(circle_at_36%_22%,rgba(255,228,175,.72),transparent_17%),linear-gradient(145deg,#6a3529_0%,#351c1a_100%)] shadow-[inset_18px_18px_28px_rgba(255,255,255,.1),inset_-20px_-24px_32px_rgba(0,0,0,.35)]" />
          <span aria-hidden="true" className="absolute bottom-[11%] left-1/2 h-12 w-[58%] -translate-x-1/2 rounded-[100%] bg-[#4a1720]/55 blur-xl" />
          <motion.img animate={liveMotion ? { y: [0, -9, 0] } : undefined} transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }} src={ASSETS.products.dryfruitbowl} alt="Strawberry chocolate dessert" loading="lazy" decoding="async" className="relative z-10 h-full w-full object-contain drop-shadow-[0_32px_26px_rgba(54,14,20,.5)] will-change-transform" />
          <span aria-hidden="true" className="absolute right-[13%] top-[17%] z-20 h-5 w-5 rounded-full bg-[#ffe0a2] shadow-[inset_2px_2px_3px_rgba(255,255,255,.8),0_8px_14px_rgba(0,0,0,.2)]" />
        </motion.div>

        <motion.div style={{ y: noteY, opacity: noteOpacity }} className="absolute bottom-[14%] left-5 z-30 max-w-[15rem] will-change-transform md:bottom-[19%] md:left-10 md:max-w-sm">
          <p className="text-base font-medium leading-relaxed text-cream/88 md:text-lg">A table full of favourites, an extra spoon, and no reason to rush it.</p>
          <div className="mt-5 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.18em] text-[#ffe0a2]"><span className="h-8 w-px bg-[#ffe0a2]/65" />Strawberry · chocolate · joy</div>
        </motion.div>
      </div>
      <motion.div style={{ y: curtainY }} className="absolute inset-x-0 bottom-0 z-40 flex h-[37%] items-end bg-ink px-5 pb-9 text-cream shadow-[0_-20px_38px_rgba(65,19,29,.25)] will-change-transform md:h-[34%] md:px-10 md:pb-12">
        <div className="mx-auto flex w-full max-w-7xl items-end justify-between gap-5"><div><p className="eyebrow text-mango">The ritual continues</p><p className="display mt-2 max-w-[10ch] text-4xl leading-[.86] md:max-w-none md:text-6xl">One more spoon.<br /><i className="font-light text-mango">Make it yours.</i></p></div><ArrowUpRight className="mb-1 shrink-0 text-mango md:h-9 md:w-9" /></div>
      </motion.div>
    </div>
  </section>;
}

function SocialProof() {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.08 });
  const liveMotion = !reduced && inView;
  const faqs = [['What makes Mango’s different?', 'A vivid dessert ritual: real fruit energy, playful flavour, and a space made for sharing good moods.'], ['What can I discover?', 'Ice creams, waffles, shakes, sundaes, falooda, boba mojitos and seasonal mango moments.'], ['Want to partner with Mango’s?', 'Use the franchise enquiry at the end of this page and the team will be in touch.']];
  const ritual = [{ label: 'Pick', image: ASSETS.products.mangoCream, tone: 'bg-mango' }, { label: 'Make', image: ASSETS.products.chocolateShake, tone: 'bg-[#754028]' }, { label: 'Pass', image: ASSETS.products.blueMojito, tone: 'bg-[#167bd4]' }];

  return <section ref={ref} className="relative overflow-hidden bg-cream px-5 py-24 text-ink md:px-10 md:py-32">
    <div className="grain pointer-events-none absolute inset-0 opacity-[.08]" />
    <div className="relative mx-auto max-w-7xl">
      <div className="grid gap-12 lg:grid-cols-[.95fr_1.05fr] lg:items-end">
        <div><p className="eyebrow text-mango-deep">The ritual</p><h2 className="display mt-3 text-5xl leading-[.85] md:text-7xl">Good moods,<br/><i className="font-light text-mango-deep">on repeat.</i></h2><p className="mt-6 max-w-sm text-sm leading-relaxed text-ink/70">Pick your craving. Make it yours. Pass the spoon. That’s the whole process.</p></div>
        <p className="justify-self-end border-l border-ink/15 pl-5 text-sm leading-relaxed text-ink/65 md:max-w-xs">Designed as a bright, shareable dessert ritual — built around the moment, not just the menu.</p>
      </div>
      <div className="mt-10 grid gap-3 md:grid-cols-3">
        {ritual.map((step, index) => <motion.article key={step.label} initial={reduced ? false : { opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ delay: index * .12, duration: .7, ease }} whileHover={reduced ? undefined : { y: -10, rotate: index === 1 ? 0 : index === 0 ? -1 : 1 }} className={`group relative min-h-[270px] overflow-hidden rounded-[2rem] ${step.tone} p-6 shadow-[0_13px_0_rgba(16,59,43,.14)]`}>
          <span className="relative z-10 text-[10px] font-black uppercase tracking-[.18em] text-ink/60">0{index + 1}</span><h3 className="display relative z-10 mt-1 text-5xl text-ink">{step.label}</h3>
          <motion.img animate={liveMotion ? { y: [0, -9, 0], rotate: [index === 0 ? -8 : 8, index === 0 ? -3 : 3, index === 0 ? -8 : 8] } : undefined} transition={{ duration: 5.5 + index, repeat: Infinity, ease: 'easeInOut' }} src={step.image} alt="" aria-hidden="true" loading="lazy" decoding="async" className="absolute -bottom-12 right-[-2%] h-[88%] w-[70%] object-contain drop-shadow-[0_25px_20px_rgba(0,0,0,.28)] transition-transform duration-500 will-change-transform group-hover:scale-110" />
          <span aria-hidden="true" className="absolute bottom-5 left-6 h-9 w-9 rounded-full border border-ink/25 bg-cream/25 shadow-[inset_3px_3px_4px_rgba(255,255,255,.25)]" />
        </motion.article>)}
      </div>
      <div className="relative mt-14 overflow-hidden rounded-[2.6rem] bg-ink px-6 py-10 text-cream shadow-[0_22px_0_#f18b00] md:px-10 md:py-14">
        <div className="absolute -right-24 top-[-8rem] h-80 w-80 rounded-full bg-mango/45 blur-2xl md:blur-3xl" /><div className="grain pointer-events-none absolute inset-0 opacity-20" />
        <motion.p animate={liveMotion ? { x: ['0%', '-8%', '0%'] } : undefined} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }} aria-hidden="true" className="display pointer-events-none absolute bottom-[-.2em] left-0 whitespace-nowrap text-[20vw] leading-none text-cream/[.055] will-change-transform">MANGO LOVE</motion.p>
        <div className="relative grid gap-12 lg:grid-cols-[.82fr_1.18fr] lg:items-end"><div><p className="eyebrow text-mango">Mango love</p><h2 className="display mt-5 text-5xl leading-[.86] md:text-7xl">Made to<br/><i className="font-light">pass around.</i></h2><p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/65">One bright idea. Endless little happy moments. Explore the flavours, share the table and make the moment yours.</p></div><div className="border-t border-white/15">{faqs.map(([question, answer], index) => <button onClick={() => setOpen(open === index ? null : index)} key={question} className="group w-full border-b border-white/15 py-5 text-left"><span className="flex items-center justify-between gap-5 font-bold transition-colors group-hover:text-mango"><span>{question}</span><span aria-hidden="true" className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/20 text-mango">{open === index ? '−' : '+'}</span></span><AnimatePresence initial={false}>{open === index && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="max-w-lg overflow-hidden pt-3 text-sm leading-relaxed text-cream/65">{answer}</motion.p>}</AnimatePresence></button>)}</div></div>
      </div>
    </div>
  </section>;
}

function Locations() { return <section id="visit" className="relative overflow-hidden bg-vanilla px-5 py-24 md:px-10 md:py-32"><div className="grain absolute inset-0 opacity-10"/><div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><p className="eyebrow text-mango-deep">Find your little happy</p><h2 className="display mt-4 text-5xl leading-[.84] md:text-7xl">Two cities.<br/><i className="font-light">One bright mood.</i></h2><p className="mt-6 max-w-sm text-sm leading-relaxed text-ink/70">Mango’s is bringing its dessert ritual to people across Bangalore and the UAE.</p></div><div className="grid gap-4 md:grid-cols-2"><motion.div whileHover={{rotate:-1,y:-6}} className="relative overflow-hidden rounded-[2rem] bg-ink p-7 text-cream shadow-[0_14px_0_#ffb900]"><MapPin className="text-mango"/><p className="display mt-16 text-4xl">Bangalore</p><p className="mt-3 text-sm text-cream/60">The city where our mango story began.</p></motion.div><motion.div whileHover={{rotate:1,y:-6}} className="relative overflow-hidden rounded-[2rem] bg-mango p-7 text-ink shadow-[0_14px_0_#103b2b]"><MapPin className="text-ink"/><p className="display mt-16 text-4xl">UAE</p><p className="mt-3 text-sm text-ink/65">A growing Mango’s world, made for happy days.</p></motion.div></div></div></section>; }

// function Franchise() { return <section id="franchise" className="bg-mango px-5 py-24 text-ink md:px-10 md:py-32"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end"><motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .75, ease }}><p className="eyebrow">Bring the joy closer</p><h2 className="display mt-4 max-w-3xl text-5xl leading-[.86] md:text-8xl">Build the next<br /><i className="font-light">happy place.</i></h2><p className="mt-7 max-w-md text-base leading-relaxed md:text-lg">Mango's is inviting thoughtful, growth-minded franchise partners to bring a memorable dessert experience to more neighbourhoods.</p><div className="mt-8"><MagneticLink href="mailto:franchise@mangoscreamery.com">Become a franchise partner</MagneticLink></div></motion.div><motion.div initial={{ opacity: 0, scale: .94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: .7, ease }} className="rounded-[2rem] border border-ink/20 bg-cream/45 p-6 backdrop-blur-sm"><p className="eyebrow">The Mango's advantage</p><div className="mt-8 grid gap-6">{[['A brand people remember', 'A bright, recognisable identity made for repeat visits.'], ['Support that stays close', 'A collaborative relationship from set-up through launch.'], ['Room to grow', 'A focused opportunity for entrepreneurs who love hospitality.']].map(([title, description], i) => <div key={title} className="border-b border-ink/15 pb-5 last:border-0"><span className="text-xs font-bold">0{i + 1}</span><h3 className="mt-1 text-xl font-bold">{title}</h3><p className="mt-1 max-w-sm text-sm leading-relaxed opacity-75">{description}</p></div>)}</div></motion.div></div></section>; }

function Franchise() { 
  return (
    <section id="franchise" className="relative overflow-hidden bg-[#003d2d] px-4 py-12 text-cream md:px-10 md:py-20">
      <div className="mx-auto max-w-[760px]">
        
        {/* Left Side: Editorial Franchise Reference Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          whileInView={{ opacity: 1, scale: 1 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8, ease }} 
          className="relative overflow-hidden rounded-[1.6rem] border-[3px] border-[#d2cc98] bg-[#003d2d] shadow-[0_22px_60px_rgba(0,0,0,.28)]"
        >
          <img 
            src={ASSETS.franchiseReference} 
            alt="Mango's Franchise Experience" 
            loading="lazy"
            decoding="async"
            className="block h-auto w-full" 
          />
        </motion.div>

        {/* Right Side: Content & Advantage list */}
        <motion.div className="hidden" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .75, ease }}>
          <p className="eyebrow text-ink/70">Bring the joy closer</p>
          <h2 className="display mt-4 text-5xl leading-[.88] md:text-7xl text-ink">
            Build the next<br /><i className="font-light">happy place.</i>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed md:text-lg text-ink/80 font-medium">
            Mango's is inviting thoughtful, growth-minded franchise partners to bring a memorable dessert experience to more neighbourhoods.
          </p>
          <div className="mt-8">
            <MagneticLink href="mailto:franchise@mangoscreamery.com">Become a franchise partner</MagneticLink>
          </div>

          <div className="mt-12 rounded-[2rem] border border-ink/20 bg-cream/50 p-6 backdrop-blur-sm">
            <p className="eyebrow mb-4">The Mango's advantage</p>
            <div className="grid gap-6">
              {[
                ['A brand people remember', 'A bright, recognisable identity made for repeat visits.'], 
                ['Support that stays close', 'A collaborative relationship from set-up through launch.'], 
                ['Room to grow', 'A focused opportunity for entrepreneurs who love hospitality.']
              ].map(([title, description], i) => (
                <div key={title} className="border-b border-ink/15 pb-4 last:border-0 last:pb-0">
                  <span className="text-xs font-bold text-mango-deep">0{i + 1}</span>
                  <h3 className="mt-0.5 text-lg font-bold">{title}</h3>
                  <p className="mt-0.5 text-sm leading-relaxed opacity-75">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  ); 
}
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let frame = 0;
    let previous = false;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const next = window.scrollY > 800;
        if (next !== previous) {
          previous = next;
          setShow(next);
        }
        frame = 0;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
  return <AnimatePresence>{show && <motion.button initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 26 }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Back to top" className="group fixed bottom-4 right-3 z-40 grid h-24 w-16 place-items-end justify-items-center pb-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-mango md:bottom-5 md:right-5"><span aria-hidden="true" className="absolute top-0 h-8 w-px origin-top bg-gradient-to-b from-cream via-mango to-mango" /><motion.span animate={{ rotate: [-5, 5, -5], y: [0, 2, 0] }} whileHover={{ rotate: 9, scale: 1.08 }} transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }} className="relative grid h-12 w-11 place-items-center rounded-[48%_52%_58%_42%/40%_46%_54%_60%] border border-[#f7d275]/70 bg-[radial-gradient(circle_at_33%_22%,#fff0a5,transparent_14%),linear-gradient(135deg,#87a94c_2%,#ffb900_53%,#ef7d00_100%)] text-lg text-ink shadow-[inset_5px_5px_8px_rgba(255,255,255,.42),inset_-6px_-8px_10px_rgba(125,75,0,.24),0_10px_20px_rgba(0,0,0,.3)]"><span className="-mt-0.5">↑</span><span className="absolute -top-2 h-4 w-2 rotate-[-28deg] rounded-[100%_0_100%_0] bg-[#4d8d44] shadow-[inset_1px_1px_2px_rgba(255,255,255,.45)]" /></motion.span></motion.button>}</AnimatePresence>;
}

function Footer() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.08 });
  const liveMotion = !reduced && inView;

  return <footer ref={ref} className="relative overflow-hidden bg-ink px-5 pb-8 pt-20 text-cream md:px-10 md:pt-28">
    <div aria-hidden="true" className="absolute -left-36 top-[-12rem] h-[38rem] w-[38rem] rounded-full bg-mango/18 blur-3xl" />
    <div aria-hidden="true" className="absolute -bottom-48 right-[-8rem] h-[32rem] w-[32rem] rounded-full bg-pink/16 blur-3xl" />
    <div className="grain pointer-events-none absolute inset-0 opacity-[.14]" />
    <div className="relative mx-auto max-w-7xl">
      <section className="relative overflow-hidden rounded-[2.7rem] border border-white/15 bg-white/[.05] px-6 py-10 shadow-[inset_0_1px_0_rgba(255,255,255,.12)] md:px-10 md:py-14">
        <motion.img animate={liveMotion ? { y: [0, -9, 0], rotate: [-2, 2, -2] } : undefined} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} src={ASSETS.products.mangoMojito} alt="" aria-hidden="true" loading="lazy" decoding="async" className="pointer-events-none absolute -right-6 bottom-[-4rem] h-64 w-44 object-contain opacity-80 drop-shadow-[0_25px_22px_rgba(0,0,0,.5)] will-change-transform md:right-[7%] md:h-80 md:w-56" />
        <div className="relative max-w-3xl"><p className="eyebrow text-mango">The last scoop</p><h2 className="display mt-5 text-5xl leading-[.84] tracking-[-.07em] md:text-8xl">A little happy<br /><i className="font-light text-mango">goes a long way.</i></h2><p className="mt-6 max-w-md text-sm leading-relaxed text-cream/65">Meet us in the Mango’s universe — a place for one more spoon, one more sip, and the next good mood.</p><div className="mt-8"><MagneticLink href="#visit" dark={false}>Find your Mango's</MagneticLink></div></div>
      </section>
      <div className="mt-16 grid gap-12 md:grid-cols-[1.2fr_.8fr_.8fr]">
        <div className="relative w-[240px]"><div aria-hidden="true" className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(255,215,90,.72),rgba(255,185,0,.18)_42%,transparent_70%)] blur-xl" /><OfficialWordmark className="relative w-[240px]" alt="Mango's — Ice creams, waffles and shakes" /></div>
        <div><p className="eyebrow text-mango">Say hello</p><a href="mailto:hello@mangoscreamery.com" className="mt-4 block text-lg font-bold transition-colors hover:text-mango">hello@mangoscreamery.com</a><a href="mailto:franchise@mangoscreamery.com" className="mt-2 block text-sm text-cream/65 transition-colors hover:text-mango">franchise@mangoscreamery.com</a></div>
        <div><p className="eyebrow text-mango">Follow along</p><a href="#top" className="mt-4 flex items-center gap-2 text-lg font-bold transition-colors hover:text-mango"><Instagram size={18} /> Instagram <ArrowUpRight size={15} /></a><a href="#visit" className="mt-2 flex items-center gap-2 text-sm text-cream/65 transition-colors hover:text-mango"><MapPin size={16} /> Find your Mango's</a></div>
      </div>
      <div className="mt-16 flex flex-col justify-between gap-3 border-t border-white/15 pt-5 text-[11px] font-bold uppercase tracking-[.14em] text-cream/50 md:flex-row"><span>© {new Date().getFullYear()} Mango's. All rights reserved.</span><span>Ice creams · waffles · shakes</span></div>
    </div>
  </footer>;
}

export default function Home() { return <main id="top" className="overflow-x-clip"><Helmet><title>Mango's | Ice Creams, Waffles & Shakes</title><meta name="description" content="Mango's serves ice creams, waffles, shakes, sundaes, falooda and bright mango moments." /><meta property="og:title" content="Mango's | Ice Creams, Waffles & Shakes" /><meta property="og:description" content="Ice creams, waffles, shakes, sundaes, falooda and bright mango moments." /><meta property="og:site_name" content="Mango's" /><meta property="og:type" content="website" /></Helmet><Intro /><Hero /><MangoMarquee /><LiquidPortal /><Story /><ProductUniverse /><Experience /><SocialProof /><Locations /><Franchise /><Footer /><BackToTop /></main>; }
