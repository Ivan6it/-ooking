import styles from './RecipeCatalogFiltering.module.css';
import { DefaultButton } from '@/shared/ui/buttons/defaultButton';
import { Select } from '@/shared/ui/select';
import kitchensData from '@/data/filters.json';
import foods from '@/data/foods.json';
import { CardFoodCatalog } from '@/shared/ui/widgets/CardFoodCatalog';

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
  const { additional } = kitchensData as FilterData;
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
          {foods.map((food) => (
            <CardFoodCatalog
              id={food.id}
              name={food.name}
              img={food.image}
              quantityLike={food.likes}
              imgAlt={food.imgAlt}
              time={food.prepTime}
            />
          ))}
        </div>
        <DefaultButton
          className={styles.recipeCatalogFiltering__catalog__button}
          text="Загрузить еще"
        />
      </div>
    </div>
  );
}
