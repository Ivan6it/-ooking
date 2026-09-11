import { DefaultButton } from '@/shared/ui/buttons/defaultButton';
import styles from './LikeSection.module.css';
import { SectionCards } from '@/shared/ui/widgets/SectionCards';
import type { FoodsState } from '@/store/foodsListSlice';
import type { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

export function LikeSection() {
  const { foods }: FoodsState = useSelector<RootState, FoodsState>((state) => state.foodsList);
  const userLiked = useSelector((state: any) => state.user.userData.liked);
  const visibleRecipes = foods.filter((item) => userLiked.find((i: number) => i === item.id));
  const navigate = useNavigate();

  return (
    <div>
      {visibleRecipes.length > 0 && (
        <SectionCards foods={visibleRecipes} className={styles.likeSection} ogrinicator={true} />
      )}
      {visibleRecipes.length === 0 && (
        <div className={styles.likeSection__notItem}>
          <img
            loading="lazy"
            className={styles.likeSection__notItem__img}
            src="/images/LikeNotItem.png"
          />
          <div className={styles.likeSection__notItem__text}>
            <h2>Похоже, тебе еще ничего не понравилось!</h2>
            <p>
              Если тебе понравился рецепт, просто нажмите на сердечко,
              <br />
              чтобы сохранить его на потом! Он будет ждать тебя прямо здесь.
            </p>
          </div>
          <DefaultButton
            handleClick={() => navigate('/catalog')}
            className={styles.likeSection__notItem__button}
            text="Посмотреть рецепты"
          />
        </div>
      )}
    </div>
  );
}
