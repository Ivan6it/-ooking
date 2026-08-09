import styles from './CookbooksItem.module.css';
import type { Cookbook } from '@/data/users.json';
import { getRecipesCountText } from '@/shared/helpers/helpersFunction';
import foods from '@/data/foods.json';
import { IconActive } from '../../iconActive';
import { Ellipsis } from '@/shared/ui/icons';
import type { Food } from '@/data/foods.json';
import { DefaultButton } from '@/shared/ui/buttons/defaultButton';
import { useState } from 'react';

interface CookbooksItemProps {
  data: Cookbook;
  handleClick?: (recipes: Food[], name: string) => void;
}

export function CookbooksItem({ data, handleClick }: CookbooksItemProps) {
  const [menuVisible, setMenuVisible] = useState(false);
  const recipes = foods.filter((item) => data.recipes.includes(item.id));
  let recipesList: Food[] = [];
  if (recipes.length > 3) {
    recipesList.push(...recipes.slice(0, 3));
  } else {
    recipesList.push(...recipes);
  }
  const name = data.name;
  return (
    <article className={styles.cookbooksItem}>
      {data.recipes.length < 1 && (
        <div onClick={() => handleClick?.(recipes, name)} className={styles.cookbooksItem__empty}>
          <span className={styles.cookbooksItem__empty__text}>Тут пока пусто</span>
        </div>
      )}
      {data.recipes.length === 1 && (
        <div onClick={() => handleClick?.(recipes, name)} className={styles.cookbooksItem__solo}>
          {recipesList.map((item) => (
            <img className={styles.cookbooksItem__solo__img} src={item.image} />
          ))}
        </div>
      )}
      {data.recipes.length === 2 && (
        <div onClick={() => handleClick?.(recipes, name)} className={styles.cookbooksItem__double}>
          {recipesList.map((item) => (
            <img src={item.image} className={styles.cookbooksItem__double__img} />
          ))}
        </div>
      )}
      {data.recipes.length > 2 && (
        <div onClick={() => handleClick?.(recipes, name)} className={styles.cookbooksItem__triple}>
          {recipesList.map((item) => (
            <div className={styles.cookbooksItem__triple__empty}>
              <img src={item.image} className={styles.cookbooksItem__triple__empty__img} />
            </div>
          ))}
        </div>
      )}
      <div className={styles.cookbooksItem__info}>
        <div className={styles.cookbooksItem__info__container}>
          <h3>{data.name}</h3>
          <IconActive handleClick={() => setMenuVisible((prev) => !prev)} svg={<Ellipsis />} />
          {menuVisible && (
            <div className={styles.cookbooksItem__info__container__buttons}>
              <DefaultButton
                className={styles.cookbooksItem__info__container__buttons__button}
                text="Изменить название"
              />
              <DefaultButton
                className={`${styles.cookbooksItem__info__container__buttons__button} ${styles.deleteButton}`}
                text="Удалить"
              />
            </div>
          )}
        </div>
        <span>
          {data.recipes.length} {getRecipesCountText(data.recipes.length)}
        </span>
      </div>
    </article>
  );
}
