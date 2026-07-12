import '@/shared/styles/global.css';
import '@/shared/styles/variables.css';
import '@/shared/fonts/montserrat/index.css';
import { Header } from '@/shared/ui/layouts/Header';
import { Footer } from '@/shared/ui/layouts/Footer';
import { SectionFilters } from './shared/ui/widgets/SectionFilters';
import filters from '@/data/filters.json';

export function App() {
  //затычка

  return (
    <>
      <Header />
      <SectionFilters filtersGroup={filters} />
      <Footer />
    </>
  );
}

export default App;
