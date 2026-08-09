import { DefaultButton } from '../../buttons/defaultButton';
import styles from './ShoppingList.module.css';
import { ArrowFilterIcon, ShoppingListIcon } from '@/shared/ui/icons';
import users from '@/data/users.json';
import foods from '@/data/foods.json';
import { getIngredientCountText } from '@/shared/helpers/helpersFunction';
import type { Food } from '@/data/foods.json';

type ShoppingListProps = {
  handleclick: (
    recipe: Food,
    buyingredients: number[] | [],
    purchasedingredients: number[] | [],
  ) => void;
};

export function ShoppingList({ handleclick }: ShoppingListProps) {
  const user = users[0];
  return (
    <>
      {user.shoppinglist.length === 0 ? (
        <div className={styles.shoppingList}>
          <ShoppingListIcon className={styles.shoppingList__icon} />
          <h2 className={styles.shoppingList__heading}>У тебя еще не сформирован шоппинг-лист!</h2>
          <p className={styles.shoppingList__text}>
            Когда вы добавите ингредиенты в свой список покупок, вы увидете их здесь. Хороших
            покупок!
          </p>
          <DefaultButton className={styles.shoppingList__button} text="Посмотреть рецепты" />
        </div>
      ) : (
        <ul className={styles.shoppingList__itemList}>
          {user.shoppinglist.map((item, index) => {
            const recipe = foods.find((i) => i.id === item.id);
            if (!recipe) return null;
            const numIngredients = user.shoppinglist[index].buyingredients
              ? user.shoppinglist[index].buyingredients.length
              : 0;
            return (
              <li
                onClick={() =>
                  handleclick(recipe, item.buyingredients || [], item.purchasedingredients || [])
                }
                className={styles.shoppingList__itemList__item}>
                <img
                  className={styles.shoppingList__itemList__item__img}
                  src={recipe?.image}
                  alt={recipe?.imgAlt}
                />
                <div className={styles.shoppingList__itemList__item__container}>
                  <span className={styles.shoppingList__itemList__item__container__heading}>
                    {recipe?.name}
                  </span>
                  <span className={styles.shoppingList__itemList__item__container__text}>
                    Купить: {numIngredients} {getIngredientCountText(numIngredients)}
                  </span>
                </div>
                <ArrowFilterIcon size={30} className={styles.shoppingList__itemList__item__icon} />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
