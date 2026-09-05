import { type ReactNode } from 'react';
import NavBar from './NavBar';




export default function Layout({ children }: { children: ReactNode }) {


  return <div className="min-h-screen bg-cream text-ink overflow-x-hidden">
    <NavBar />
    {children}
  </div>;
}
