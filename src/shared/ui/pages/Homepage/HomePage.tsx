import { RecipeBuilder } from '@/shared/ui/widgets/RecipeBuilder';
import { SectionCards } from '@/shared/ui/widgets/SectionCards';
import { Mailing } from '@/shared/ui/widgets/Mailing';
import styles from './HomePage.module.css';

export function HomePage() {
  return (
    <div className={styles.homePage}>
      <RecipeBuilder />
      <p className={styles.homePage__text}>
        Добро пожаловать на наш кулинарный сайт! Здесь собраны рецепты на любой вкус — от простых
        повседневных блюд до изысканных кулинарных шедевров. Мы делимся не только пошаговыми
        инструкциями, но и секретами, которые помогут раскрыть потенциал каждого ингредиента. Пусть
        готовка приносит вам радость, а блюда радуют близких!
      </p>
      <SectionCards heading="Новые рецепты" />
      <SectionCards heading="Популярные рецепты" />
      <SectionCards heading="Каталог рецептов" />
      <Mailing />
    </div>
  );
}
