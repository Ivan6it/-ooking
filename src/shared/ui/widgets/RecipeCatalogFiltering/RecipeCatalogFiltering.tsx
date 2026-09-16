import styles from './RecipeCatalogFiltering.module.css';
import { DefaultButton } from '@/shared/ui/buttons/defaultButton';
import { Select } from '@/shared/ui/select';
import { CardFoodCatalog } from '@/shared/ui/widgets/CardFoodCatalog';
import type { FoodsState } from '@/store/foodsListSlice';
import type { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

type FilterItem = {
  name: string;
  id: string;
};

type FilterGroup = {
  title: string;
  items: FilterItem[];
};

type FilterData = {
  main: FilterGroup[];
  additional: Array<{
    kitchens?: { name: string; value: string }[];
    filters?: { name: string; value: string }[];
  }>;
};

export function RecipeCatalogFiltering() {
  const [kitchensData, setKitchensData] = useState<FilterData | null>(null);
  const [itemsValue, setItemsValues] = useState(15);
  const { foods }: FoodsState = useSelector<RootState, FoodsState>((state) => state.foodsList);
  const visibleFoods = foods.slice(0, itemsValue);
  useEffect(() => {
    const loadData = async () => {
      const res = await fetch('/api/filters');
      if (!res.ok) {
        throw new Error('Failed to fetch filters');
      }
      const data = await res.json();
      setKitchensData(data);
    };
    loadData();
  }, []);

  if (!kitchensData) {
    return (
      <div>
        {' '}
        <p>Загрузка фильтров...</p>{' '}
      </div>
    );
  }

  const { additional } = kitchensData;
  return (
    <div className={styles.recipeCatalogFiltering}>
      <div className={styles.recipeCatalogFiltering__filters}>
        <div className={styles.recipeCatalogFiltering__filters__filter}>
          <span className={styles.recipeCatalogFiltering__filters__filter__text}>
            Сортировать по:
          </span>
          <Select options={additional[0].kitchens || []} />
        </div>
        <div className={styles.recipeCatalogFiltering__filters__filter}>
          <span className={styles.recipeCatalogFiltering__filters__filter__text}>
            Сортировать по:
          </span>
          <Select options={additional[1].filters || []} />
        </div>
      </div>
      <div className={styles.recipeCatalogFiltering__catalog}>
        <div className={styles.recipeCatalogFiltering__catalog__recipes}>
          {visibleFoods.map((food, index) => (
            <CardFoodCatalog
              key={index}
              id={food.id}
              name={food.name}
              img={food.image}
              quantityLike={food.likes}
              imgAlt={food.imgAlt}
              time={food.prepTime}
            />
          ))}
        </div>
        {foods.length > itemsValue && (
          <DefaultButton
            handleClick={() => setItemsValues((prev) => prev + 6)}
            className={styles.recipeCatalogFiltering__catalog__button}
            text="Загрузить еще"
          />
        )}
      </div>
    </div>
  );
}
