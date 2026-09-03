import { useState, type ReactNode } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { ASSETS } from '../../data/assets';

export default function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const links = [['Story', '#story'], ['The good stuff', '#experience'], ['Franchise', '#franchise'], ['Visit us', '#visit']];
  return <div className="min-h-screen bg-cream text-ink overflow-x-hidden">
    <header className="fixed top-0 inset-x-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/30 bg-cream/80 px-4 py-2.5 shadow-[0_12px_35px_rgba(16,59,43,.10)] backdrop-blur-xl md:px-5">
        <a href="#top" aria-label="Mango's home"><img src={ASSETS.logo} alt="Mango's" className="h-9 w-auto object-contain md:h-11" /></a>
        <nav className="hidden items-center gap-6 text-sm font-bold md:flex">{links.map(([label, href]) => <a key={href} href={href} className="transition-colors hover:text-mango">{label}</a>)}</nav>
        <a href="#franchise" className="hidden items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-xs font-bold text-cream transition-transform hover:-translate-y-0.5 md:flex">Partner with us <ArrowUpRight size={14}/></a>
        <button className="grid h-10 w-10 place-items-center rounded-full bg-ink text-cream md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X size={19}/> : <Menu size={20}/>}</button>
      </div>
      {open && <div className="mx-auto mt-2 max-w-7xl rounded-3xl bg-ink p-5 text-cream shadow-xl md:hidden"><nav className="grid gap-1">{links.map(([label, href]) => <a key={href} onClick={() => setOpen(false)} href={href} className="rounded-xl px-3 py-3 text-lg font-bold hover:bg-white/10">{label}</a>)}</nav></div>}
    </header>
    {children}
  </div>;
}
