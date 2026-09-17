import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, CupSoda, Grid2X2, IceCreamCone, Instagram, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ASSETS } from '../data/assets';
import mangosCinematicHero from '../assets/hero/mangos-cinematic-hero.mp4';
import mangosCinematicHeroSafari from '../assets/hero/mangos-cinematic-hero-safari.mp4';
import mangosCinematicHeroPoster from '../assets/hero/mangos-cinematic-hero-poster.png';

const ease = [0.16, 1, 0.3, 1] as const;
const products = [
  { name: 'DBC', note: 'Death by Chocolate', image: ASSETS.products.dbc, color: '#4f271d', word: 'DBC', background: 'linear-gradient(135deg,#2d1513 0%,#64301f 54%,#9a542c 100%)' },
  { name: 'Nutella Brownie Waffle', note: 'Nutella brownie waffle', image: ASSETS.products.nutellaBrownieWaffle, color: '#b96b23', word: 'SWIRL', background: 'linear-gradient(135deg,#5c2c1c 0%,#9a5528 54%,#d58a3b 100%)' },
  { name: 'Royal Falooda', note: 'Royal Falooda', image: ASSETS.products.royalFaloodaMenu, color: '#e58da3', word: 'ROYAL', background: 'linear-gradient(135deg,#f9c1d1 0%,#e98ea8 54%,#b95b79 100%)' },
  { name: 'Strawberry Chocolate', note: 'Strawberry chocolate', image: ASSETS.products.strawberryChocolateMenu, color: '#8b2721', word: 'BERRY', background: 'linear-gradient(135deg,#3b1718 0%,#86271f 54%,#d95533 100%)' },
];

function MagneticLink({ href, children, dark = true, className = '' }: { href: string; children: ReactNode; dark?: boolean; className?: string }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const reduced = useReducedMotion();
  function move(event: MouseEvent<HTMLAnchorElement>) {
    if (reduced || window.matchMedia('(pointer: coarse)').matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    setOffset({ x: (event.clientX - rect.left - rect.width / 2) * .16, y: (event.clientY - rect.top - rect.height / 2) * .2 });
  }
  return <motion.a href={href} onMouseMove={move} onMouseLeave={() => setOffset({ x: 0, y: 0 })} animate={offset} transition={{ type: 'spring', stiffness: 240, damping: 16 }} className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-4 text-sm font-bold shadow-[inset_0_-2px_0_rgba(0,0,0,.14),0_10px_24px_rgba(0,0,0,.12)] max-[360px]:px-4 max-[360px]:py-3 max-[360px]:text-[13px] ${dark ? 'bg-ink text-cream hover:text-ink' : 'border border-ink/20 bg-cream/70 text-ink hover:text-cream'} ${className}`}><span aria-hidden="true" className={`absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100 ${dark ? 'bg-mango' : 'bg-ink'}`} /><span className="relative">{children}</span><ArrowUpRight size={17} className="relative transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></motion.a>;
}


function OfficialWordmark({ className = '', alt = "Mango's" }: { className?: string; alt?: string }) {
  return <img src={ASSETS.logo} alt={alt} className={`block h-auto object-contain ${className}`} />;
}

function Intro() {
  const [show, setShow] = useState(true);
  useEffect(() => { const id = window.setTimeout(() => setShow(false), 1500); return () => window.clearTimeout(id); }, []);
  return <AnimatePresence>{show && <motion.div exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: .72, ease } }} className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-ink text-cream"><motion.div animate={{ scale: [1, 1.16, 1], opacity: [.26, .48, .26] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} className="absolute h-[52vmax] w-[52vmax] rounded-full bg-[radial-gradient(circle,#ffd75a_0%,#ffb900_35%,rgba(241,139,0,.12)_68%,transparent_72%)] blur-xl" /><div className="relative flex flex-col items-center"><motion.div initial={{ scale: .88, y: 16, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} transition={{ duration: .65, ease }}><OfficialWordmark className="w-[250px] md:w-[320px]" /></motion.div><motion.p initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: .35, duration: .65 }} className="mt-4 origin-left border-t border-mango pt-3 text-[10px] font-bold uppercase tracking-[.26em] text-mango">A little happy is loading</motion.p></div><div className="grain absolute inset-0 opacity-20" /></motion.div>}</AnimatePresence>;
}

function HeroCopy() {
  const reduced = useReducedMotion();

  return <div className="relative z-20 text-center">
    <h1 id="hero-title" className="display text-[clamp(3.35rem,14vw,5rem)] leading-[.81] tracking-[-.075em] text-cream [text-shadow:0_5px_28px_rgba(0,0,0,.28)] sm:text-[clamp(4.7rem,11.5vw,7.8rem)] lg:text-[clamp(5.7rem,7.1vw,8.8rem)]">
      <span className="block overflow-hidden pb-[.12em]"><motion.span initial={reduced ? false : { y: '112%' }} animate={{ y: 0 }} transition={{ delay: .15, duration: .78, ease }} className="block">Good desserts.</motion.span></span>
      <span className="block overflow-hidden pb-[.11em]"><motion.span initial={reduced ? false : { y: '112%' }} animate={{ y: 0 }} transition={{ delay: .25, duration: .78, ease }} className="block italic bg-gradient-to-r from-[#f3a90f] via-[#ffe29a] to-[#ffbf29] bg-clip-text text-transparent [text-shadow:none]">Good vibes.</motion.span></span>
    </h1>
    <motion.span aria-hidden="true" initial={reduced ? false : { scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ delay: .72, duration: .7, ease }} className="mx-auto mt-1 block h-px w-24 origin-center bg-gradient-to-r from-transparent via-[#ffd76e] to-transparent sm:w-32" />
    <motion.p initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .48, duration: .5, ease }} className="mx-auto mt-4 max-w-[32ch] text-[.98rem] leading-[1.52] text-cream/82 [text-shadow:0_3px_20px_rgba(0,0,0,.32)] sm:mt-5 sm:text-[1.08rem] lg:mt-7 lg:text-[1.13rem]">Everyday indulgence for ice creams, waffles, shakes and the moments worth making sweeter.</motion.p>
    <motion.div initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .58, duration: .5, ease }} className="mx-auto mt-6 grid max-w-[25rem] grid-cols-2 gap-3 sm:mt-7 sm:flex sm:justify-center lg:mt-8"><MagneticLink className="justify-center bg-mango px-4 text-ink hover:text-ink sm:px-6" href="https://wa.me/919945041870">Contact us</MagneticLink><MagneticLink className="justify-center border-[#ffe19a]/80 bg-[#0b3829]/90 px-4 text-cream shadow-[inset_0_1px_0_rgba(255,255,255,.16),0_10px_24px_rgba(0,0,0,.24)] hover:text-cream sm:px-6" href="#visit" dark={false}>Find a store</MagneticLink></motion.div>
  </div>;
}

function HeroArtwork() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoUnavailable, setVideoUnavailable] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Safari only permits autoplay for an inline, muted native video. Keep the
    // attributes on the element as well as the DOM properties for iOS Safari.
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', 'true');
  }, []);

  return <div className="absolute inset-0">
    <img src={mangosCinematicHeroPoster} alt="" aria-hidden="true" fetchPriority="high" decoding="async" className="absolute inset-0 h-full w-full object-cover object-[58%_center] lg:object-center" />
    {!videoUnavailable && <video ref={videoRef} autoPlay loop muted playsInline preload="auto" poster={mangosCinematicHeroPoster} onError={() => setVideoUnavailable(true)} aria-hidden="true" className="absolute inset-0 h-full w-full object-cover object-[58%_center] lg:object-center">
      <source src={mangosCinematicHeroSafari} type="video/mp4" />
      <source src={mangosCinematicHero} type="video/mp4" />
    </video>}
  </div>;
}

function HeroFeatureRail() {
  const reduced = useReducedMotion();
  const heroFeatures = [{ label: 'Ice creams', icon: IceCreamCone }, { label: 'Waffles', icon: Grid2X2 }, { label: 'Shakes', icon: CupSoda }];

  return <motion.nav aria-label="Explore Mango's favourites" initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .72, duration: .5, ease }} className="relative z-20 mx-auto mt-8 grid max-w-[27rem] grid-cols-3 divide-x divide-cream/25 border-t border-cream/25 pt-4 text-cream sm:mt-10 sm:pt-5">{heroFeatures.map(({ label, icon: Icon }) => <a key={label} href="#experience" className="group flex min-w-0 flex-col items-center gap-2 px-2 text-center first:pl-0 last:pr-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mango focus-visible:ring-offset-4 focus-visible:ring-offset-ink"><Icon size={20} strokeWidth={1.65} className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:text-mango" /><span className="text-[9px] font-black uppercase leading-[1.15] tracking-[-.02em] sm:text-[10px]">{label}</span></a>)}</motion.nav>;
}

function Hero() {
  return <section className="relative isolate flex min-h-[100svh] overflow-hidden bg-ink pb-9 pt-[6.25rem] sm:pt-[7rem] lg:min-h-[min(100svh,56rem)] lg:items-center lg:py-[7.5rem]" aria-labelledby="hero-title">
    <HeroArtwork />
    <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,29,21,.42)_0%,rgba(4,28,20,.15)_34%,rgba(4,25,18,.48)_100%)]" />
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(3,28,20,.64)_0%,rgba(5,31,23,.28)_36%,rgba(5,29,21,.05)_70%)]" />
    <div className="grain pointer-events-none absolute inset-0 opacity-[.075]" />

    <div className="relative z-10 mx-auto flex min-h-[calc(100svh-6.25rem)] w-full max-w-[1480px] flex-col items-center justify-center px-5 py-10 sm:min-h-[calc(100svh-7rem)] sm:px-8 sm:py-12 lg:min-h-0 lg:px-12 lg:py-0 xl:px-16">
      <div className="w-full max-w-[47rem]"><HeroCopy /></div>
      <div className="pt-7 sm:pt-9"><HeroFeatureRail /></div>
    </div>
  </section>;
}
function MangoMarquee() {
  const words = Array.from({ length: 4 }, () => 'Mango season is every season. ✦');
  const loop = (key: string) => <div className="mango-marquee-group">{words.map((text, index) => <span key={`${key}-${index}`} className="mango-marquee-item">{text}</span>)}</div>;

  return <section aria-label="Mango season is every season" className="overflow-hidden border-y border-mango/15 bg-ink py-4 text-mango md:py-5">
    <p className="sr-only">Mango season is every season.</p>
    <div aria-hidden="true" className="mango-marquee-viewport">
      <div className="mango-marquee-track">{loop('first')}{loop('second')}</div>
    </div>
  </section>;
}

function LiquidPortal() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.04 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const productY = useTransform(scrollYProgress, [0, .16, .46, .76, 1], ['18%', '9%', '-4%', '-17%', '-28%']);
  const productX = useTransform(scrollYProgress, [0, .55, 1], ['-4%', '12%', '16%']);
  const productScale = useTransform(scrollYProgress, [0, .2, .58, .84, 1], [.78, .94, 1.07, .9, .78]);
  const productRotate = useTransform(scrollYProgress, [0, .42, .78, 1], [-14, -3, 8, 17]);
  const juicyY = useTransform(scrollYProgress, [0, .22, .7, 1], ['0%', '-10%', '-36%', '-60%']);
  const juicyOpacity = useTransform(scrollYProgress, [0, .18, .7, 1], [1, 1, .56, .24]);
  const blobScale = useTransform(scrollYProgress, [0, .24, .68, 1], [.58, .9, 1.13, 1.55]);
  const blobRotate = useTransform(scrollYProgress, [0, 1], [-8, 12]);
  const menuY = useTransform(scrollYProgress, [.1, .26, .7, .86], ['130%', '0%', '0%', '-70%']);
  const menuOpacity = useTransform(scrollYProgress, [.1, .24, .72, .86], [0, 1, 1, 0]);
  const moodY = useTransform(scrollYProgress, [.18, .38, .78, .93], ['145%', '0%', '0%', '-55%']);
  const moodOpacity = useTransform(scrollYProgress, [.18, .36, .8, .94], [0, 1, 1, 0]);
  const wordScale = useTransform(scrollYProgress, [.2, .52, .85], [.88, 1, 1.09]);
  const captionOpacity = useTransform(scrollYProgress, [.35, .48, .8, .92], [0, 1, 1, 0]);
  const liveMotion = !reduced && inView;

  return <section id="portal" ref={ref} className="relative h-[250svh] bg-mango md:h-[220vh]">
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
      <motion.div style={{ opacity: menuOpacity, scale: wordScale }} className="absolute bottom-[22%] left-5 z-30 max-w-[20rem] origin-bottom-left will-change-transform max-[360px]:bottom-[21%] md:bottom-[27%] md:left-[5%] md:max-w-none">
        <p className="eyebrow mb-3">A full-sensory hello</p>
        <p className="display overflow-visible pb-2 text-[3.3rem] leading-[.93] md:text-[clamp(4.5rem,6vw,5.8rem)]"><motion.span style={{ y: menuY }} className="block whitespace-nowrap will-change-transform">Not a <i className="font-light">menu.</i></motion.span></p>
      </motion.div>
      <motion.div style={{ opacity: moodOpacity, scale: wordScale }} className="absolute bottom-[14%] left-5 z-30 max-w-[22rem] origin-bottom-left will-change-transform md:bottom-[11%] md:left-[5%] md:max-w-none">
        <p className="display overflow-visible pb-2 text-[3.45rem] leading-[.93] md:text-[clamp(5.2rem,7vw,7rem)]"><motion.span style={{ y: moodY }} className="block whitespace-nowrap bg-gradient-to-b from-ink to-ink/70 bg-clip-text text-transparent will-change-transform">A mood <i className="font-light">shift.</i></motion.span></p>
      </motion.div>
      <motion.div style={{ opacity: captionOpacity }} className="absolute bottom-9 left-5 z-30 flex max-w-[11rem] items-end gap-3 text-left text-[10px] font-bold uppercase tracking-[.17em] md:bottom-11 md:left-auto md:right-[9%] md:max-w-[15rem] md:text-right"><span className="h-px w-8 shrink-0 bg-ink/70" />Fruit-forward. Full feeling.</motion.div>
    </div>
  </section>;
}


function Story() {
  return <section id="story" className="relative overflow-hidden bg-[#f5eedf] px-5 py-16 text-ink sm:px-8 sm:py-20 md:px-10 md:py-24">
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_84%_11%,rgba(255,221,128,.3),transparent_19%),radial-gradient(circle_at_8%_83%,rgba(170,200,103,.12),transparent_26%),linear-gradient(145deg,#fffaf0_0%,#f7eddb_58%,#f0dfbf_100%)]" />
    <div aria-hidden="true" className="grain pointer-events-none absolute inset-0 opacity-[.045]" />

    <div className="relative mx-auto grid w-full max-w-7xl gap-9 sm:gap-10 lg:grid-cols-[minmax(0,.9fr)_minmax(18rem,.65fr)] lg:items-end lg:gap-24">
      <div className="max-w-[42rem]">
        <p className="eyebrow flex items-center gap-3 text-mango-deep"><span className="h-px w-8 bg-mango-deep/55" />A bag of mangoes. A big possibility.</p>
        <h2 className="display mt-4 text-[clamp(3.15rem,11.5vw,7rem)] leading-[.84] tracking-[-.075em] sm:mt-5">
          <span className="block pb-[.16em]">More than a</span>
          <span className="block pb-[.16em]">sweet stop.</span>
        </h2>
        <p className="mt-5 max-w-[37ch] text-sm leading-relaxed text-ink/72 sm:mt-6 sm:text-base lg:text-lg">It started in South India with a bag of mangoes and a big appetite for possibility. Today, that same bright energy is shared across South India and the UAE.</p>
      </div>

      <div className="border-t border-ink/15 pt-5 lg:mb-2 lg:pt-6">
        <p className="eyebrow text-ink/52">A bright beginning, still unfolding.</p>
        <div className="mt-5 flex items-center gap-3 text-mango-deep sm:gap-4">
          <span className="display text-[clamp(1.55rem,5vw,3.2rem)] leading-none tracking-[-.055em]">South India</span>
          <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-mango" />
          <span className="display text-[clamp(1.55rem,5vw,3.2rem)] leading-none tracking-[-.055em]">UAE</span>
        </div>
        <p className="mt-3 max-w-[29ch] text-xs leading-relaxed text-ink/62 sm:text-sm">One warm welcome, shared across two bright places.</p>
      </div>
    </div>
  </section>;
}

function ProductUniverse() {
  const [active, setActive] = useState(0);
  const current = products[active];

  return <section id="experience" className="overflow-hidden bg-night px-5 py-24 text-cream md:px-10 md:py-32">
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div><p className="eyebrow text-mango">The good stuff</p><h2 className="display mt-3 text-5xl leading-[.86] md:text-7xl">Find your<br /><span>favourite mood.</span></h2></div>
        <div className="max-w-sm md:ml-auto"><p className="text-sm leading-relaxed text-cream/65 md:text-right">A colourful little universe of ice creams, shakes, falooda and feel-good extras. Explore the range, then let the craving decide.</p><Link to="/menu" className="group mt-5 inline-flex items-center gap-2 rounded-full border border-mango/70 bg-mango px-5 py-3 text-sm font-black text-ink shadow-[inset_0_-2px_0_rgba(0,0,0,.13),0_8px_20px_rgba(0,0,0,.18)] transition-all hover:-translate-y-0.5 hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-4 focus-visible:ring-offset-night md:float-right">View full menu <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link></div>
      </div>
      <div className="mt-12 grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">{products.map((product, i) => <button key={product.name} onClick={() => setActive(i)} aria-pressed={i === active} className={`group flex items-center justify-between rounded-2xl border p-4 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mango focus-visible:ring-offset-2 focus-visible:ring-offset-night ${i === active ? 'border-mango bg-mango text-ink' : 'border-white/15 text-cream hover:border-white/50'}`}><span><span className="block text-[10px] font-bold uppercase tracking-[.16em] opacity-60">0{i + 1}</span><span className="mt-1 block text-sm font-bold md:text-base">{product.name}</span></span><ArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" size={18} /></button>)}</div>
        <motion.div layout className="relative min-h-[490px] overflow-hidden rounded-[2.2rem]" style={{ background: current.background, backgroundColor: current.color }}>
          <span className="display absolute right-[-.07em] top-3 text-[clamp(5rem,14vw,10rem)] leading-none text-ink/15">{current.word}</span><div className="grain absolute inset-0 opacity-20" />
          <motion.img key={current.name} initial={{ opacity: 0, scale: .78, rotate: -8 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 110, damping: 17 }} src={current.image} alt={current.name} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-contain p-5 drop-shadow-[0_28px_18px_rgba(0,0,0,.24)] md:p-9" />
          <div className="absolute inset-x-5 bottom-5 flex items-end justify-between text-ink"><div><p className="eyebrow">{current.note}</p><p className="display mt-1 text-3xl">{current.name}</p></div><span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-cream"><ArrowUpRight size={20} /></span></div>
        </motion.div>
      </div>
      <div className="mt-5 flex items-center gap-3 overflow-hidden whitespace-nowrap border-y border-white/15 py-4 text-[11px] font-bold uppercase tracking-[.19em] text-mango">{Array(7).fill('Creamy. Crunchy. Completely yours. ✦ ').map((t, i) => <span key={i}>{t}</span>)}</div>
    </div>
  </section>;
}

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
  const ritual = [
    { label: 'Pick', image: ASSETS.products.mangoCream, textTone: 'text-ink', background: 'radial-gradient(circle at 74% 19%,rgba(255,249,211,.7),transparent 24%),linear-gradient(135deg,#ffd763 0%,#ffb21b 58%,#e77f08 100%)', artClass: '-bottom-7 right-[-3%] h-[78%] w-[68%] md:-bottom-10 md:h-[90%] md:w-[76%]' },
    { label: 'Make', image: ASSETS.products.chocolateShakeCutout, textTone: 'text-cream', background: 'radial-gradient(circle at 76% 17%,rgba(255,195,104,.25),transparent 22%),linear-gradient(135deg,#1e0d0a 0%,#5e2516 56%,#9a4d25 100%)', artClass: '-bottom-3 right-[-1%] h-[79%] w-[67%] md:-bottom-4 md:h-[91%] md:w-[75%]' },
    { label: 'Pass', image: ASSETS.products.blueMojito, textTone: 'text-cream', background: 'radial-gradient(circle at 77% 18%,rgba(176,251,239,.34),transparent 22%),linear-gradient(135deg,#063e54 0%,#08718e 56%,#0c9bb2 100%)', artClass: '-bottom-6 right-[2%] h-[82%] w-[57%] md:-bottom-8 md:h-[96%] md:w-[62%]' },
  ];

  return <section ref={ref} className="relative overflow-hidden bg-cream px-5 py-24 text-ink md:px-10 md:py-32">
    <div className="grain pointer-events-none absolute inset-0 opacity-[.08]" />
    <div className="relative mx-auto max-w-7xl">
      <div className="grid gap-12 lg:grid-cols-[.95fr_1.05fr] lg:items-end">
        <div><p className="eyebrow text-mango-deep">The ritual</p><h2 className="display mt-3 text-5xl leading-[.85] md:text-7xl">Good moods,<br/><span>on repeat.</span></h2><p className="mt-6 max-w-sm text-sm leading-relaxed text-ink/70">Pick your craving. Make it yours. Pass the spoon. That’s the whole process.</p></div>
        <p className="justify-self-end border-l border-ink/15 pl-5 text-sm leading-relaxed text-ink/65 md:max-w-xs">Designed as a bright, shareable dessert ritual — built around the moment, not just the menu.</p>
      </div>
      <div className="mt-10 grid gap-3 md:grid-cols-3">
        {ritual.map((step, index) => <motion.article key={step.label} initial={reduced ? false : { opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ delay: index * .12, duration: .7, ease }} whileHover={reduced ? undefined : { y: -8, rotate: index === 1 ? 0 : index === 0 ? -1 : 1 }} style={{ background: step.background }} className={`group relative min-h-[244px] overflow-hidden rounded-[1.6rem] border border-white/20 p-5 shadow-[0_12px_0_rgba(16,59,43,.14),0_18px_32px_rgba(16,59,43,.14)] sm:min-h-[258px] sm:p-6 md:min-h-[292px] md:rounded-[2rem] md:shadow-[0_15px_0_rgba(16,59,43,.14),0_22px_42px_rgba(16,59,43,.16)]`}>
          <div aria-hidden="true" className="absolute -right-12 -top-16 h-48 w-48 rounded-full border border-white/20 bg-white/[.06]" /><div aria-hidden="true" className="absolute inset-x-5 bottom-[17%] h-px bg-white/20" />
          <span className={`relative z-10 text-[10px] font-black uppercase tracking-[.18em] ${step.textTone === 'text-cream' ? 'text-cream/65' : 'text-ink/60'}`}>0{index + 1}</span><h3 className={`display relative z-10 mt-1 text-5xl ${step.textTone}`}>{step.label}</h3>
          <span aria-hidden="true" className="absolute bottom-[10%] right-[11%] z-[1] h-8 w-[52%] rounded-[100%] bg-black/25 blur-lg" />
          <motion.img animate={liveMotion ? { y: [0, -8, 0], rotate: [index === 0 ? -7 : 7, index === 0 ? -3 : 3, index === 0 ? -7 : 7] } : undefined} transition={{ duration: 5.5 + index, repeat: Infinity, ease: 'easeInOut' }} src={step.image} alt="" aria-hidden="true" loading="lazy" decoding="async" className={`absolute z-[2] object-contain drop-shadow-[0_25px_20px_rgba(0,0,0,.3)] transition-transform duration-500 will-change-transform group-hover:scale-105 ${step.artClass}`} />
        </motion.article>)}
      </div>
      <div className="relative mt-14 overflow-hidden rounded-[2.6rem] bg-ink px-6 py-10 text-cream shadow-[0_22px_0_#f18b00] md:px-10 md:py-14">
        <div className="absolute -right-24 top-[-8rem] h-80 w-80 rounded-full bg-mango/45 blur-2xl md:blur-3xl" /><div className="grain pointer-events-none absolute inset-0 opacity-20" />
        <motion.p animate={liveMotion ? { x: ['0%', '-8%', '0%'] } : undefined} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }} aria-hidden="true" className="display pointer-events-none absolute bottom-[-.2em] left-0 whitespace-nowrap text-[20vw] leading-none text-cream/[.055] will-change-transform">MANGO LOVE</motion.p>
        <div className="relative grid gap-12 lg:grid-cols-[.82fr_1.18fr] lg:items-end"><div><p className="eyebrow text-mango">Mango love</p><h2 className="display mt-5 text-5xl leading-[.86] md:text-7xl">Made to<br/><span>pass around.</span></h2><p className="mt-6 max-w-sm text-sm leading-relaxed text-cream/65">One bright idea. Endless little happy moments. Explore the flavours, share the table and make the moment yours.</p></div><div className="border-t border-white/15">{faqs.map(([question, answer], index) => <button onClick={() => setOpen(open === index ? null : index)} key={question} className="group w-full border-b border-white/15 py-5 text-left"><span className="flex items-center justify-between gap-5 font-bold transition-colors group-hover:text-mango"><span>{question}</span><span aria-hidden="true" className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/20 text-mango">{open === index ? '−' : '+'}</span></span><AnimatePresence initial={false}>{open === index && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="max-w-lg overflow-hidden pt-3 text-sm leading-relaxed text-cream/65">{answer}</motion.p>}</AnimatePresence></button>)}</div></div>
      </div>
    </div>
  </section>;
}

function Locations() {
  const cities = [
    { name: 'South India', copy: 'The home of our mango story.', style: { background: 'radial-gradient(circle at 83% 17%,rgba(255,215,90,.24),transparent 24%),linear-gradient(135deg,#09281e 0%,#124a36 58%,#1d6547 100%)' }, textTone: 'text-cream', mutedTone: 'text-cream/65', accent: 'text-mango' },
    { name: 'UAE', copy: 'A growing Mango’s world, made for happy days.', style: { background: 'radial-gradient(circle at 82% 18%,rgba(255,246,195,.45),transparent 22%),linear-gradient(135deg,#cf790d 0%,#f2a409 55%,#ffd464 100%)' }, textTone: 'text-ink', mutedTone: 'text-ink/65', accent: 'text-ink' },
  ];

  return <section id="visit" className="relative overflow-hidden bg-vanilla px-5 py-24 md:px-10 md:py-32"><div className="grain absolute inset-0 opacity-10" /><div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><p className="eyebrow text-mango-deep">Find your little happy</p><h2 className="display mt-4 text-5xl leading-[.84] md:text-7xl">Two regions.<br /><span>One bright mood.</span></h2><p className="mt-6 max-w-sm text-sm leading-relaxed text-ink/70">Mango’s is bringing its dessert ritual to people across South India and the UAE.</p></div><div className="grid gap-4 md:grid-cols-2">{cities.map((city) => <article key={city.name} className="relative min-h-[218px] overflow-hidden rounded-[1.6rem] border border-white/20 p-5 shadow-[0_10px_0_rgba(16,59,43,.16),0_16px_28px_rgba(16,59,43,.1)] sm:min-h-[250px] sm:rounded-[1.8rem] sm:p-6 md:min-h-[285px] md:rounded-[2rem] md:p-7 md:shadow-[0_14px_0_rgba(16,59,43,.18),0_21px_34px_rgba(16,59,43,.12)]" style={city.style}><div aria-hidden="true" className="absolute -right-8 -top-12 h-36 w-36 rounded-full border border-white/20 sm:-right-10 sm:-top-14 sm:h-44 sm:w-44 md:-right-12 md:-top-16 md:h-48 md:w-48" /><div aria-hidden="true" className="absolute bottom-0 left-0 h-[44%] w-full bg-[linear-gradient(180deg,transparent,rgba(0,0,0,.17))]" /><MapPin size={20} className={`relative z-10 sm:h-6 sm:w-6 ${city.accent}`} /><div className="relative z-10 mt-9 sm:mt-12 md:mt-16"><p className={`display text-[2rem] leading-none sm:text-4xl ${city.textTone}`}>{city.name}</p><p className={`mt-2 max-w-[22ch] text-[13px] leading-relaxed sm:mt-3 sm:max-w-[18ch] sm:text-sm ${city.mutedTone}`}>{city.copy}</p></div><span className={`absolute bottom-5 left-5 z-10 text-[10px] font-black uppercase tracking-[.12em] sm:bottom-6 sm:left-6 sm:text-[11px] sm:tracking-[.14em] md:left-7 ${city.textTone}`}>Details coming soon</span></article>)}</div></div></section>;
}

// function Franchise() { return <section id="franchise" className="bg-mango px-5 py-24 text-ink md:px-10 md:py-32"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end"><motion.div initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .75, ease }}><p className="eyebrow">Bring the joy closer</p><h2 className="display mt-4 max-w-3xl text-5xl leading-[.86] md:text-8xl">Build the next<br /><i className="font-light">happy place.</i></h2><p className="mt-7 max-w-md text-base leading-relaxed md:text-lg">Mango's is inviting thoughtful, growth-minded franchise partners to bring a memorable dessert experience to more neighbourhoods.</p><div className="mt-8"><MagneticLink href="mailto:franchise@mangoscreamery.com">Become a franchise partner</MagneticLink></div></motion.div><motion.div initial={{ opacity: 0, scale: .94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: .7, ease }} className="rounded-[2rem] border border-ink/20 bg-cream/45 p-6 backdrop-blur-sm"><p className="eyebrow">The Mango's advantage</p><div className="mt-8 grid gap-6">{[['A brand people remember', 'A bright, recognisable identity made for repeat visits.'], ['Support that stays close', 'A collaborative relationship from set-up through launch.'], ['Room to grow', 'A focused opportunity for entrepreneurs who love hospitality.']].map(([title, description], i) => <div key={title} className="border-b border-ink/15 pb-5 last:border-0"><span className="text-xs font-bold">0{i + 1}</span><h3 className="mt-1 text-xl font-bold">{title}</h3><p className="mt-1 max-w-sm text-sm leading-relaxed opacity-75">{description}</p></div>)}</div></motion.div></div></section>; }

function Franchise() { 
  return (
    <section id="franchise" className="relative overflow-hidden bg-[#003d2d] px-4 py-12 text-cream md:px-10 md:py-20">
      <div className="mx-auto max-w-[1160px]">
        <div className="grid gap-5 md:grid-cols-2 md:gap-7">
          {[
            [ASSETS.franchise.campaignOne, "Mango's franchise investment opportunity"],
            [ASSETS.franchise.campaignTwo, "Why partner with Mango's"],
          ].map(([image, alt], index) => (
            <motion.div
              key={alt}
              initial={{ opacity: 0, y: 28, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.1, ease }}
              className="overflow-hidden rounded-[1.6rem] border-[3px] border-[#d2cc98] bg-[#fff7d6] shadow-[0_22px_60px_rgba(0,0,0,.28)]"
            >
              <img
                src={image}
                alt={alt}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full"
              />
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="mt-7 flex justify-center md:mt-9"
        >
          <MagneticLink
            href="https://wa.me/919945041870?text=Hi%20Mango%27s%2C%20I%27m%20interested%20in%20a%20franchise%20opportunity."
            className="bg-mango text-ink hover:text-ink"
          >
            Partner with Mango’s
          </MagneticLink>
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
  return <footer className="relative overflow-hidden bg-ink px-5 pb-8 pt-20 text-cream md:px-10 md:pt-28">
    <div aria-hidden="true" className="absolute -left-36 top-[-12rem] h-[38rem] w-[38rem] rounded-full bg-mango/18 blur-3xl" />
    <div aria-hidden="true" className="absolute -bottom-48 right-[-8rem] h-[32rem] w-[32rem] rounded-full bg-pink/16 blur-3xl" />
    <div className="grain pointer-events-none absolute inset-0 opacity-[.14]" />
    <div className="relative mx-auto max-w-7xl">
      <section className="relative overflow-hidden rounded-[2.7rem] border border-white/15 bg-white/[.05] px-6 py-10 shadow-[inset_0_1px_0_rgba(255,255,255,.12)] md:px-10 md:py-14">
        <div className="relative max-w-3xl"><p className="eyebrow text-mango">The last scoop</p><h2 className="display mt-5 text-5xl leading-[.84] tracking-[-.07em] md:text-8xl">A little happy<br /><span>goes a long way.</span></h2><p className="mt-6 max-w-md text-sm leading-relaxed text-cream/65">Meet us in the Mango’s universe — a place for one more spoon, one more sip, and the next good mood.</p><div className="mt-8"><MagneticLink href="#visit" dark={false}>Find your Mango's</MagneticLink></div></div>
      </section>
      <div className="mt-16 grid gap-12 md:grid-cols-[1.2fr_.8fr_.8fr]">
        <div className="relative w-[240px]"><div aria-hidden="true" className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(255,215,90,.72),rgba(255,185,0,.18)_42%,transparent_70%)] blur-xl" /><OfficialWordmark className="relative w-[240px]" alt="Mango's — Ice creams, waffles and shakes" /></div>
        <div><p className="eyebrow text-mango">Say hello</p><a href="mailto:hello@mangoscreamery.com" className="mt-4 block text-lg font-bold transition-colors hover:text-mango">hello@mangoscreamery.com</a><a href="mailto:franchise@mangoscreamery.com" className="mt-2 block text-sm text-cream/65 transition-colors hover:text-mango">franchise@mangoscreamery.com</a></div>
        <div><p className="eyebrow text-mango">Follow along</p><a href="https://www.instagram.com/mangoscreamery" target="_blank" rel="noreferrer" className="mt-4 flex items-center gap-2 text-lg font-bold transition-colors hover:text-mango"><Instagram size={18} /> Instagram <ArrowUpRight size={15} /></a><a href="#visit" className="mt-2 flex items-center gap-2 text-sm text-cream/65 transition-colors hover:text-mango"><MapPin size={16} /> Find your Mango's</a></div>
      </div>
      <div className="mt-16 flex flex-col justify-between gap-3 border-t border-white/15 pt-5 text-[11px] font-bold uppercase tracking-[.14em] text-cream/50 md:flex-row"><span>© {new Date().getFullYear()} Mango's. All rights reserved.</span><span>Ice creams · waffles · shakes</span></div>
    </div>
  </footer>;
}

export default function Home() { return <main id="top" className="overflow-x-clip"><Helmet><title>Mango's | Ice Creams, Waffles & Shakes</title><meta name="description" content="Mango's serves ice creams, waffles, shakes, sundaes, falooda and bright mango moments." /><meta property="og:title" content="Mango's | Ice Creams, Waffles & Shakes" /><meta property="og:description" content="Ice creams, waffles, shakes, sundaes, falooda and bright mango moments." /><meta property="og:site_name" content="Mango's" /><meta property="og:type" content="website" /></Helmet><Intro /><Hero /><MangoMarquee /><LiquidPortal /><Story /><ProductUniverse /><Experience /><SocialProof /><Locations /><Franchise /><Footer /><BackToTop /></main>; }
