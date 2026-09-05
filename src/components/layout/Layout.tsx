import { type ReactNode } from 'react';
import NavBar from './NavBar';




export default function Layout({ children }: { children: ReactNode }) {


  return <div className="min-h-screen overflow-x-clip bg-cream text-ink">
    <NavBar />
    {children}
  </div>;
}
