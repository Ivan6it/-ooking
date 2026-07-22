import { DefaultButton } from '@/shared/ui/buttons/defaultButton';
import foods from '@/data/foods.json';
import { CardFoodCatalog } from '@/shared/ui/widgets/CardFoodCatalog';
import styles from './SectionCards.module.css';

type SectionCardsProps = {
  heading: string;
  ogrinicatorOff?: boolean;
  classNameHeading?: string;
};

export function SectionCards({
  heading,
  ogrinicatorOff = false,
  classNameHeading,
}: SectionCardsProps) {
  return (
    <div className={styles.sectionCards}>
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
      {!ogrinicatorOff && (
        <DefaultButton className={styles.sectionCards__button} text="Смотреть все рецепты" />
      )}
    </div>
  );
}
