import { RecipeBuilder } from '@/shared/ui/widgets/RecipeBuilder';
import { SectionCards } from '@/shared/ui/widgets/SectionCards';
import { Mailing } from '@/shared/ui/widgets/Mailing';
import styles from './HomePage.module.css';
import type { FoodsState } from '@/store/foodsListSlice';
import type { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useState, useRef, useEffect } from 'react';
import type { Food } from '@/types/foods';

export default function HomePage() {
  const { foods }: FoodsState = useSelector<RootState, FoodsState>((state) => state.foodsList);
  const [generateRecipes, setGenerateRecipes] = useState<Food[] | null>(null);
  const [recipesVisible, setRecipesVisible] = useState(8);
  const dateFoods = foods.toSorted((a, b) => b.date - a.date).slice(0, 8);
  const likeFoods = foods.toSorted((a, b) => b.likes - a.likes).slice(0, 8);
  const navigate = useNavigate();
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (generateRecipes !== null) {
      targetRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [generateRecipes]);

  return (
    <div className={styles.homePage}>
      <RecipeBuilder setGenerateRecipes={setGenerateRecipes} />
      <p className={styles.homePage__text}>
        Добро пожаловать на наш кулинарный сайт! Здесь собраны рецепты на любой вкус — от простых
        повседневных блюд до изысканных кулинарных шедевров. Мы делимся не только пошаговыми
        инструкциями, но и секретами, которые помогут раскрыть потенциал каждого ингредиента. Пусть
        готовка приносит вам радость, а блюда радуют близких!
      </p>
      {generateRecipes !== null && (
        <div ref={targetRef} style={{ position: 'relative', minHeight: '200px' }}>
          <SectionCards
            clickMore={() => setRecipesVisible((prev) => prev + 4)}
            ogrinicator={recipesVisible > generateRecipes.length ? true : 'none'}
            foods={generateRecipes.slice(0, recipesVisible)}
            heading="Наиболее подходящие рецепты"
          />
          {generateRecipes !== null && generateRecipes.length === 0 && (
            <div className={styles.homePage__overlay}>Нет подходящих рецептов</div>
          )}
        </div>
      )}
      <SectionCards
        clickMore={() => navigate('/catalog')}
        foods={dateFoods}
        heading="Новые рецепты"
      />
      <SectionCards
        clickMore={() => navigate('/catalog')}
        foods={likeFoods}
        heading="Популярные рецепты"
      />
      <SectionCards
        clickMore={() => navigate('/catalog')}
        foods={foods.slice(0, 8)}
        heading="Каталог рецептов"
      />
      <Mailing />
    </div>
  );
}
