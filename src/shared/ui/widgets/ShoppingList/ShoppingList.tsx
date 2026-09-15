import { DefaultButton } from '../../buttons/defaultButton';
import styles from './ShoppingList.module.css';
import { ArrowFilterIcon, ShoppingListIcon } from '@/shared/ui/icons';
import { getIngredientCountText } from '@/shared/helpers/helpersFunction';
import type { Food } from '@/types/foods';
import { Link } from 'react-router-dom';
import type { FoodsState } from '@/store/foodsListSlice';
import type { RootState, AppDispatch } from '@/store';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '@/store/userSlice';

type ShoppingListProps = {
  handleclick: (
    recipe: Food,
    buyingredients: number[] | [],
    purchasedingredients: number[] | [],
  ) => void;
};

export function ShoppingList({ handleclick }: ShoppingListProps) {
  const { foods }: FoodsState = useSelector<RootState, FoodsState>((state) => state.foodsList);
  const user = useSelector((state: any) => state.user.userData);
  const dispatch = useDispatch<AppDispatch>();

  function deleteRecipeShopList(id: number) {
    const newShopList = user.shoppinglist.filter((i: any) => i.id !== id);
    dispatch(
      updateUser({
        userData: {
          id: user.id,
          shoppinglist: [...newShopList],
        },
      }),
    );
  }

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
          <Link to={'/catalog'}>
            <DefaultButton className={styles.shoppingList__button} text="Посмотреть рецепты" />
          </Link>
        </div>
      ) : (
        <ul className={styles.shoppingList__itemList}>
          {user.shoppinglist.map((item: any, index: number) => {
            const recipe = foods.find((i) => i.id === item.id);
            if (!recipe) return null;
            const numIngredients = user.shoppinglist[index].buyingredients
              ? user.shoppinglist[index].buyingredients.length
              : 0;
            return (
              <li
                key={index}
                onClick={() =>
                  handleclick(recipe, item.buyingredients || [], item.purchasedingredients || [])
                }
                className={styles.shoppingList__itemList__item}>
                <img
                  loading="lazy"
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
                <div onClick={(e) => e.stopPropagation()}>
                  <DefaultButton
                    handleClick={() => deleteRecipeShopList(recipe.id)}
                    className={styles.shoppingList__itemList__item__button}
                    text="Удалить"
                  />
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
