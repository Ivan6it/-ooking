import '@/shared/styles/global.css';
import '@/shared/styles/variables.css';
import '@/shared/fonts/montserrat/index.css';
import { Header } from '@/shared/ui/layouts/Header';
import { Footer } from '@/shared/ui/layouts/Footer';
import { DirectorySectionPage } from '@/shared/ui/pages/DirectorySectionPage';

export function App() {
  return (
    <>
      <Header />
      <DirectorySectionPage />
      <Footer />
    </>
  );
}

export default App;
