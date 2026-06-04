import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import './index.css';

// ابدأ دائمًا من أعلى الصفحة (الهيرو) عند التحديث أو الدخول أو فتح الرابط
if (typeof window !== 'undefined') {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }
  // أزل أي هاش في الرابط قد يسبب القفز لقسم آخر عند أول فتح
  if (window.location.hash) {
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  }
  const scrollTop = () => window.scrollTo(0, 0);
  window.addEventListener('load', scrollTop);
  // يغطي حالة استعادة الصفحة من ذاكرة المتصفح (back/forward cache)
  window.addEventListener('pageshow', scrollTop);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
