import { RecipeBuilder } from '@/shared/ui/widgets/RecipeBuilder';
import { SectionCards } from '@/shared/ui/widgets/SectionCards';
import { Mailing } from '@/shared/ui/widgets/Mailing';
import styles from './HomePage.module.css';
import foods from '@/data/foods.json';

async function loadFoods() {
  try {
    const response = await fetch('/api/foods');
    if (!response.ok) {
      throw new Error(`Сервер вернул ошибку: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Не удалось загрузить продукты:', error);
  }
}
loadFoods().then((foods) => {
  console.log(foods);
});

export default function HomePage() {
  return (
    <div className={styles.homePage}>
      <RecipeBuilder />
      <p className={styles.homePage__text}>
        Добро пожаловать на наш кулинарный сайт! Здесь собраны рецепты на любой вкус — от простых
        повседневных блюд до изысканных кулинарных шедевров. Мы делимся не только пошаговыми
        инструкциями, но и секретами, которые помогут раскрыть потенциал каждого ингредиента. Пусть
        готовка приносит вам радость, а блюда радуют близких!
      </p>
      <SectionCards foods={foods} heading="Новые рецепты" />
      <SectionCards foods={foods} heading="Популярные рецепты" />
      <SectionCards foods={foods} heading="Каталог рецептов" />
      <Mailing />
    </div>
  );
}
