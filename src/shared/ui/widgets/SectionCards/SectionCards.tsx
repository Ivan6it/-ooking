import { DefaultButton } from '@/shared/ui/buttons/defaultButton';
import foods from '@/data/foods.json';
import { CardFoodCatalog } from '@/shared/ui/widgets/CardFoodCatalog';
import styles from './SectionCards.module.css';

type SectionCardsProps = {
  heading: string;
  ogrinicator?: boolean | 'none';
  classNameHeading?: string;
  className?: string;
};

export function SectionCards({
  heading,
  ogrinicator = false,
  classNameHeading,
  className,
}: SectionCardsProps) {
  return (
    <div className={`${styles.sectionCards} ${className}`}>
      <h2 className={`${classNameHeading ? classNameHeading : styles.sectionCards__heading}`}>
        {heading}
      </h2>
      <div className={styles.sectionCards__cards}>
        {foods.map((food, i) => (
          <CardFoodCatalog
            key={i}
            name={food.name}
            img={food.image}
            quantityLike={food.likes}
            imgAlt={food.imgAlt}
            time={food.prepTime}
          />
        ))}
      </div>
      {ogrinicator === false && (
        <DefaultButton className={styles.sectionCards__button} text="Смотреть все рецепты" />
      )}
      {ogrinicator === 'none' && (
        <DefaultButton className={styles.directorySectionItemPage__button} text="Загрузить еще" />
      )}
    </div>
  );
}
