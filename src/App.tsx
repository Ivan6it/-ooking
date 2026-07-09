import '@/shared/styles/global.css';
import '@/shared/styles/variables.css';
import '@/shared/fonts/montserrat/index.css';
import { Header } from '@/shared/ui/layouts/Header';
import { Footer } from '@/shared/ui/layouts/Footer';
import { SectionCards } from './shared/ui/widgets/SectionCards';
import { Mailing } from '@/shared/ui/widgets/Mailing';
import { RecipeBuilder } from '@/shared/ui/widgets/RecipeBuilder';

export function App() {
  //затычка

  return (
    <>
      <Header />
      <RecipeBuilder />
      <SectionCards heading="Новые рецепты" />
      <Mailing />
      <Footer />
    </>
  );
}

export default App;
