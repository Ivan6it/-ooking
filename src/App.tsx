import '@/shared/styles/global.css';
import '@/shared/styles/variables.css';
import '@/shared/fonts/montserrat/index.css';
import { Header } from '@/shared/ui/layouts/Header';
import { Footer } from '@/shared/ui/layouts/Footer';
import { RecipeCatalogPage } from '@/shared/ui/pages/RecipeCatalogPage';

export function App() {
  //затычка

  return (
    <>
      <Header />
      <RecipeCatalogPage />
      <Footer />
    </>
  );
}

export default App;
