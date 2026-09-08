import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowUpRight, MapPin } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ASSETS } from '../data/assets';
import { brandData } from '../data/brand';
import { locationRegions, type LocationRegionSlug } from '../data/locations';

function isLocationRegion(slug: string | undefined): slug is LocationRegionSlug {
  return Boolean(slug && slug in locationRegions);
}

export default function LocationDirectory() {
  const { region } = useParams<{ region: string }>();

  if (!isLocationRegion(region)) return <Navigate to="/" replace />;

  const city = locationRegions[region];
  const emailHref = `mailto:${brandData.customerSupportEmail}?subject=${encodeURIComponent(`Mango's ${city.name} outlet information`)}`;

  return <main className="min-h-screen overflow-hidden bg-cream pt-24 text-ink sm:pt-28">
    <Helmet>
      <title>{`${city.name} Outlets | Mango's`}</title>
      <meta name="description" content={`Find current Mango's outlet information for ${city.name}.`} />
    </Helmet>

    <section className="relative isolate overflow-hidden px-5 pb-16 pt-8 sm:px-8 sm:pb-20 lg:px-12 xl:px-16">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_84%_6%,rgba(255,185,0,.24),transparent_23%),radial-gradient(circle_at_8%_88%,rgba(127,170,104,.2),transparent_28%)]" />
      <div className="grain pointer-events-none absolute inset-0 opacity-[.05]" />
      <div className="relative mx-auto max-w-[1480px]">
        <Link to="/#visit" className="group inline-flex items-center gap-2 rounded-full border border-ink/15 bg-cream/70 px-4 py-2.5 text-sm font-bold shadow-[0_8px_20px_rgba(16,59,43,.08)] transition-all hover:-translate-y-0.5 hover:border-ink/35">
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" /> All locations
        </Link>

        <div className="mt-10 grid gap-8 lg:grid-cols-[.86fr_1.14fr] lg:items-end lg:gap-12">
          <div className="max-w-xl">
            <p className="eyebrow flex items-center gap-3 text-mango-deep"><span className="h-px w-8 bg-mango-deep/55" />Mango’s locations</p>
            <h1 className="display mt-5 text-[clamp(4rem,10vw,8.5rem)] leading-[.8] tracking-[-.08em]">{city.name}<br /><i className="font-light text-mango-deep">outlets.</i></h1>
            <p className="mt-7 max-w-[34ch] text-base leading-relaxed text-ink/70 sm:text-lg">{city.intro} Find the latest Mango’s outlet information for your next bright little break.</p>
          </div>

          <div className="relative min-h-[340px] overflow-hidden rounded-[2.5rem] border border-white/25 p-6 text-cream shadow-[0_24px_46px_rgba(16,59,43,.18)] sm:min-h-[390px] sm:p-9" style={{ background: city.surface }}>
            <div aria-hidden="true" className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/20" />
            <div aria-hidden="true" className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-white/[.07]" />
            <div aria-hidden="true" className="absolute right-[14%] top-[21%] h-3 w-3 rounded-full bg-[#ffe59b] shadow-[0_0_0_12px_rgba(255,229,155,.12),0_0_0_25px_rgba(255,229,155,.06)]" />
            <img src={ASSETS.brandMark} alt="" aria-hidden="true" className="absolute bottom-[-5%] right-[2%] h-[73%] w-[48%] object-contain opacity-90 drop-shadow-[0_20px_18px_rgba(0,0,0,.2)]" />
            <div className="relative flex h-full flex-col items-start">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-white/25 bg-white/[.1] backdrop-blur-sm"><MapPin size={21} /></span>
              <div className="mt-auto max-w-sm">
                <p className="eyebrow text-cream/70">Official outlet directory</p>
                <h2 className="display mt-3 text-4xl leading-[.88] sm:text-5xl">Find your<br />nearest <i className="font-light">Mango’s.</i></h2>
              </div>
            </div>
          </div>
        </div>

        <section className="relative mt-8 overflow-hidden rounded-[2rem] border border-ink/10 bg-white/45 p-6 shadow-[0_16px_36px_rgba(16,59,43,.08)] sm:mt-10 sm:p-9">
          <div aria-hidden="true" className="absolute inset-y-0 right-0 w-[34%] bg-[radial-gradient(circle_at_100%_50%,rgba(255,185,0,.23),transparent_64%)]" />
          <div className="relative grid gap-7 md:grid-cols-[1fr_auto] md:items-end">
            <div className="max-w-2xl"><p className="eyebrow text-mango-deep">Need current outlet details?</p><h2 className="display mt-3 text-4xl leading-[.88] sm:text-5xl">We’ll point you<br /><i className="font-light">to the right scoop.</i></h2><p className="mt-4 max-w-xl text-sm leading-relaxed text-ink/68">For the latest information on Mango’s locations in {city.name}, our team can help directly.</p></div>
            <a href={emailHref} className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-4 text-sm font-bold text-cream shadow-[inset_0_-2px_0_rgba(0,0,0,.16),0_10px_22px_rgba(16,59,43,.17)] transition-all hover:-translate-y-0.5 hover:bg-mango hover:text-ink">Ask about {city.name} <ArrowUpRight size={17} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></a>
          </div>
        </section>
      </div>
    </section>
  </main>;
}

