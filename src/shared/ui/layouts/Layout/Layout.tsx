import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Suspense } from 'react';

export function Layout() {
  const location = useLocation();
  return (
    <>
      <Header />
      <main>
        <Suspense key={location.pathname} fallback={<p>Загрузка...</p>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <ScrollRestoration />
    </>
  );
}
