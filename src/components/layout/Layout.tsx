import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import CustomCursor from '../common/CustomCursor';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-cream-50 text-cocoa-900 font-sans cursor-none">
      <CustomCursor />
      {/* Global Navigation */}
      <header className="fixed top-0 w-full z-50 bg-cocoa-900/95 backdrop-blur-md text-cream-50 py-4 px-6 md:px-12 border-b border-cream-50/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-mango-500 font-display font-bold text-2xl tracking-wide">
            MANGO'S
          </Link>
          <nav className="hidden md:flex gap-8 font-semibold text-sm">
            <Link to="/menu" className="hover:text-mango-500 transition-colors">Menu</Link>
            <Link to="/locations" className="hover:text-mango-500 transition-colors">Locations</Link>
            <Link to="/franchise" className="hover:text-mango-500 transition-colors">Franchise</Link>
          </nav>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="flex-grow w-full overflow-hidden">
        {children}
      </main>

      {/* Global Footer */}
      <footer className="bg-cocoa-900 text-cream-50 py-12 px-6 border-t border-mango-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-display font-bold text-mango-500">MANGO'S</div>
          <p className="text-sm text-cream-50/60">
            © {new Date().getFullYear()} Mango's Creamery. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}