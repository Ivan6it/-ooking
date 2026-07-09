import { DefaultButton } from '@/shared/ui/buttons/defaultButton';
import foods from '@/data/foods.json';
import { CardFoodCatalog } from '@/shared/ui/widgets/CardFoodCatalog';
import styles from './SectionCards.module.css';

type SectionCardsProps = {
  heading: string;
};

export function SectionCards({ heading }: SectionCardsProps) {
  return (
    <div className={styles.sectionCards}>
      <h2 className={styles.sectionCards__heading}>{heading}</h2>
      <div className={styles.sectionCards__cards}>
        {foods.map((food) => (
          <CardFoodCatalog
            name={food.name}
            img={food.image}
            quantityLike={food.likes}
            imgAlt={food.imgAlt}
            time={food.prepTime}
          />
        ))}
      </div>
      <DefaultButton className={styles.sectionCards__button} text="Смотреть все рецепты" />
    </div>
  );
}
