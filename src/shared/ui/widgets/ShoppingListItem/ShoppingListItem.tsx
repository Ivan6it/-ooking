import { DefaultButton } from '../../buttons/defaultButton';
import styles from './ShoppingListItem.module.css';
import type { Food } from '@/data/foods.json';
import { getIngredientCountText } from '@/shared/helpers/helpersFunction';
import { ShopList } from '@/shared/ui/widgets/ShopList';

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
  console.log(buyingredients);
  return (
    <div className={styles.shoppingListItem}>
      <div className={styles.shoppingListItem__recipe}>
        <img
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
            active={false}
            castomActive={false}
            onButton={false}
            baseItem={buyingredients}
          />
        </div>
        <div className={styles.shoppingListItem__ingredients__purchasedingredients}>
          <span className={styles.shoppingListItem__ingredients__purchasedingredients__text}>
            Куплено:
          </span>
          <ShopList
            color="rgba(181, 195, 201, 1)"
            className={styles.shoppingListItem__ingredients__purchasedingredients__list}
            onButton={false}
            baseItem={purchasedingredients}
            active={false}
            castomActive={true}
          />
        </div>
      </div>
    </div>
  );
}
