import styles from './RecipeCatalogPage.module.css';
import { RecipeCarousel } from '@/shared/ui/widgets/RecipeCarousel';
import { RecipeCatalogFiltering } from '@/shared/ui/widgets/RecipeCatalogFiltering';
import { SectionFilters } from '@/shared/ui/widgets/SectionFilters';
import { Mailing } from '@/shared/ui/widgets/Mailing';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { FoodsState } from '@/store/foodsListSlice';
import type { RootState } from '@/store';
import type { FilterGroup } from '@/types/filters';
import type { Food } from '@/types/foods';

interface FiltersData {
  main?: FilterGroup[];
}

export default function RecipeCatalogPage() {
  const [filters, setFilters] = useState<FiltersData>({});
  const [sortKitchen, setSortKitchen] = useState<string | null>(null);
  const [dopSort, setDopSort] = useState<string>('date');
  const [filterKitchen, setFilterKitchen] = useState('none');
  const [filtersRecipes, setFiltersRecipes] = useState<Record<string, string>>({});
  const [appliedFilters, setAppliedFilters] = useState<Record<string, string>>({});
  const { foods }: FoodsState = useSelector<RootState, FoodsState>((state) => state.foodsList);
  const foodsFilters = foodsFilteredKitchen(filterKitchen);
  function foodsFilteredKitchen(filterKitchen: string) {
    if (filterKitchen === 'none') {
      return foods;
    }
    return foods.filter((recipe) => recipe.productTags.includes(filterKitchen));
  }
  function recipesFiltered() {
    setAppliedFilters(filtersRecipes);
  }
  const filteredRecipes = foodsFilters.filter((recipe) => {
    const filters = Object.values(appliedFilters);
    if (filters.length === 0) {
      return true;
    }
    let score = 0;
    recipe.productTags.map((item) => {
      if (filters.includes(item)) {
        score++;
      }
    });
    return score === filters.length;
  });
  function sortedDop(item: string | null, recipes: Food[]) {
    if (item === 'date') {
      return [...recipes].sort((a, b) => b.date - a.date);
    } else if (item === 'like' || item === 'favourites') {
      return [...recipes].sort((a, b) => b.likes - a.likes);
    } else {
      return [...recipes].sort(
        (a, b) => Number(b.energy.replace(/\D/g, '')) - Number(a.energy.replace(/\D/g, '')),
      );
    }
  }
  function sortedKitchen(filter: string, recipes: Food[]) {
    const upRecipes = [];
    const downRecipes = [];
    for (let i = 0; i < recipes.length; i++) {
      if (recipes[i].productTags.includes(filter)) {
        upRecipes.push(recipes[i]);
      } else {
        downRecipes.push(recipes[i]);
      }
    }
    return [...upRecipes, ...downRecipes];
  }
  const sortDop = sortedDop(dopSort, filteredRecipes);
  const kitchenSorted = sortKitchen === null ? sortDop : sortedKitchen(sortKitchen, sortDop);
  useEffect(() => {
    const loadData = async () => {
      const res = await fetch('/api/filters');
      if (!res.ok) {
        throw new Error('Failed to fetch filters');
      }
      const data = await res.json();
      setFilters(data);
    };
    loadData();
  }, []);

  return (
    <div className={styles.recipeCatalogPage}>
      <p className={styles.recipeCatalogPage__heading}>
        <Link to={'/'} className={styles.recipeCatalogPage__heading__link}>
          Главная
        </Link>{' '}
        / <span>Каталог рецептов</span>
      </p>
      <RecipeCarousel setFilterKitchen={setFilterKitchen} />
      <div className={styles.recipeCatalogPage__main}>
        <div className={styles.recipeCatalogPage__main__filters}>
          <SectionFilters
            recipesFiltered={recipesFiltered}
            setFiltersRecipes={setFiltersRecipes}
            filtersGroup={filters.main || []}
          />
          <Mailing small />
        </div>
        <RecipeCatalogFiltering
          foods={kitchenSorted}
          setDopSort={setDopSort}
          setKitchen={setSortKitchen}
        />
      </div>
    </div>
  );
}
