import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppFloat from '@/components/layout/WhatsAppFloat';
import './Layout.css';

export default function Layout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const mainPad = isHome ? 'pt-0' : 'pt-[72px] md:pt-[80px]';

  return (
    <div className="app-shell flex min-h-screen flex-col bg-luxury-page">
      <Navbar />
      <main className={`flex-1 bg-luxury-page ${mainPad}`}>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
