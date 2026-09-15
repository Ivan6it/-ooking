import { DefaultButton } from '../../buttons/defaultButton';
import styles from './ShoppingListItem.module.css';
import type { Food } from '@/types/foods';
import { getIngredientCountText } from '@/shared/helpers/helpersFunction';
import { ShopList } from '@/shared/ui/widgets/ShopList';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch } from '@/store';
import { updateUser } from '@/store/userSlice';

type Shoppinglist = {
  recipe: Food;
  buyingredients: number[] | [];
  purchasedingredients: number[] | [];
};

type ShoppingListItemProps = {
  data: Shoppinglist;
  handleBack: () => void;
};

export function ShoppingListItem({ data, handleBack }: ShoppingListItemProps) {
  const buyingredients = data.buyingredients.map((i) => data.recipe.ingredients[i]);
  const purchasedingredients = data.purchasedingredients.map((i) => data.recipe.ingredients[i]);
  const navigate = useNavigate();
  const userState = useSelector((state: any) => state.user.userData.id);
  const userShopList = useSelector((state: any) => state.user.userData.shoppinglist);

  const dispatch = useDispatch<AppDispatch>();

  function handleMoveIngredient(index: number) {
    const newShoppingList = userShopList.map((item: any) => {
      if (item.id !== data.recipe.id) {
        return item;
      }
      const isBuying = item.buyingredients.includes(index);
      return {
        ...item,
        buyingredients: isBuying
          ? item.buyingredients.filter((i: any) => i !== index)
          : [...item.buyingredients, index],
        purchasedingredients: isBuying
          ? [...item.purchasedingredients, index]
          : item.purchasedingredients.filter((i: any) => i !== index),
      };
    });

    dispatch(
      updateUser({
        userData: {
          id: userState,
          shoppinglist: newShoppingList,
        },
      }),
    );
  }

  return (
    <div className={styles.shoppingListItem}>
      <div className={styles.shoppingListItem__recipe}>
        <img
          loading="lazy"
          className={styles.shoppingListItem__recipe__img}
          src={data.recipe.image}
          alt={data.recipe.imgAlt}
        />
        <div className={styles.shoppingListItem__recipe__info}>
          <div className={styles.shoppingListItem__recipe__info__container}>
            <span className={styles.shoppingListItem__recipe__info__container__heading}>
              {data.recipe.name}
            </span>
            <span className={styles.shoppingListItem__recipe__info__container__text}>
              Купить: {data.buyingredients.length}{' '}
              {getIngredientCountText(data.buyingredients.length)}
            </span>
          </div>
          <div className={styles.shoppingListItem__recipe__info__buttons}>
            <DefaultButton
              handleClick={() => navigate(`/catalog/${data.recipe.id}`)}
              className={styles.shoppingListItem__recipe__info__buttons__button}
              text="Перейти к рецепту"
            />
            <DefaultButton
              handleClick={() => handleBack()}
              className={`${styles.shoppingListItem__recipe__info__buttons__button} ${styles.button__back}`}
              text="Назад"
            />
          </div>
        </div>
      </div>
      <div className={styles.shoppingListItem__ingredients}>
        <div className={styles.shoppingListItem__ingredients__buyingredients}>
          <span className={styles.shoppingListItem__ingredients__buyingredients__text}>
            Купить:
          </span>
          <ShopList
            id={data.recipe.id}
            active={false}
            castomActive={false}
            onButton={false}
            baseItem={buyingredients}
            indexes={data.buyingredients}
            onIngredientClick={handleMoveIngredient}
          />
        </div>
        <div className={styles.shoppingListItem__ingredients__purchasedingredients}>
          <span className={styles.shoppingListItem__ingredients__purchasedingredients__text}>
            Куплено:
          </span>
          <ShopList
            id={data.recipe.id}
            color="rgba(181, 195, 201, 1)"
            className={styles.shoppingListItem__ingredients__purchasedingredients__list}
            onButton={false}
            baseItem={purchasedingredients}
            indexes={data.purchasedingredients}
            active={false}
            castomActive={true}
            onIngredientClick={handleMoveIngredient}
          />
        </div>
      </div>
    </div>
  );
}
