import styles from './RecipeCatalogPage.module.css';
import { RecipeCarousel } from '@/shared/ui/widgets/RecipeCarousel';
import { RecipeCatalogFiltering } from '@/shared/ui/widgets/RecipeCatalogFiltering';
import { SectionFilters } from '@/shared/ui/widgets/SectionFilters';
import filters from '@/data/filters.json';
import { Mailing } from '@/shared/ui/widgets/Mailing';

export function RecipeCatalogPage() {
  return (
    <div className={styles.recipeCatalogPage}>
      <p className={styles.recipeCatalogPage__heading}>
        Главная / <span>Каталог рецептов</span>
      </p>
      <RecipeCarousel />
      <div className={styles.recipeCatalogPage__main}>
        <div className={styles.recipeCatalogPage__main__filters}>
          <SectionFilters filtersGroup={filters.main} />
          <Mailing small />
        </div>
        <RecipeCatalogFiltering />
      </div>
    </div>
  );
}
