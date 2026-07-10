import '@/shared/styles/global.css';
import '@/shared/styles/variables.css';
import '@/shared/fonts/montserrat/index.css';
import { Header } from '@/shared/ui/layouts/Header';
import { Footer } from '@/shared/ui/layouts/Footer';
import { RecipeCarousel } from './shared/ui/widgets/RecipeCarousel';

export function App() {
  //затычка

  return (
    <>
      <Header />
      <RecipeCarousel />
      <Footer />
    </>
  );
}

export default App;
