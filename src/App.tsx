import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Lenis from 'lenis';
import Home from './pages/Home';
import Layout from './components/layout/Layout';

const ScrollManager = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Reset scroll on route change
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
};

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollManager />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Future routes: /menu, /locations, /franchise */}
          </Routes>
        </Layout>
      </Router>
    </HelmetProvider>
  );
}