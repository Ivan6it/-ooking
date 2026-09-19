import styles from './ShopList.module.css';
import { RadioIcon } from '@/shared/ui/icons';
import { useState } from 'react';
import { DefaultButton } from '@/shared/ui/buttons/defaultButton';
import { useSelector, useDispatch } from 'react-redux';
import { openAuthModal, updateUser } from '@/store/userSlice';
import type { AppDispatch, RootState } from '@/store';
import type { Shoppinglist } from '@/types/users';

type Product = {
  step: number[];
  [name: string]: string | number[];
};

type ShopListProps = {
  baseItem: Product[];
  onButton?: boolean;
  className?: string;
  color?: string;
  active?: boolean;
  castomActive?: boolean;
  id: number;
  onIngredientClick?: (index: number) => void;
  indexes?: number[];
};

export function ShopList({
  baseItem,
  onButton = true,
  className = '',
  color = '#67bb5a',
  active = true,
  castomActive,
  id,
  onIngredientClick,
  indexes,
}: ShopListProps) {
  const [listItems, setListItems] = useState<number[]>([]);

  const userState = useSelector((state: RootState) =>
    'id' in state.user.userData ? state.user.userData.id : undefined,
  );
  const userShopList = useSelector((state: RootState) =>
    'shoppinglist' in state.user.userData ? state.user.userData.shoppinglist : undefined,
  );
  const beRecipeShopList = userShopList
    ? userShopList.some((i: Shoppinglist) => i.id === id)
    : null;

  const hasData = !!userState;
  const dispatch = useDispatch<AppDispatch>();

  function clickAdd() {
    if (!hasData) {
      dispatch(openAuthModal());
    } else {
      if (!userShopList) {
        return;
      }
      dispatch(
        updateUser({
          userData: {
            id: userState,
            shoppinglist: [
              ...userShopList,
              {
                id: id,
                buyingredients: listItems,
                purchasedingredients: [],
              },
            ],
          },
        }),
      );
      setListItems([]);
    }
  }

  function clickAddAll() {
    if (!hasData) {
      dispatch(openAuthModal());
    } else {
      if (!userShopList) {
        return;
      }
      const allItems = baseItem.map((_, index) => index);
      dispatch(
        updateUser({
          userData: {
            id: userState,
            shoppinglist: [
              ...userShopList,
              {
                id: id,
                buyingredients: allItems,
                purchasedingredients: [],
              },
            ],
          },
        }),
      );
    }
  }

  function handleClickItem(index: number) {
    const actualIndex = indexes ? indexes[index] : index;

    if (onIngredientClick) {
      onIngredientClick(actualIndex);
      return;
    }

    if (listItems.includes(index)) {
      setListItems(listItems.filter((item) => item !== index));
    } else {
      setListItems([...listItems, index]);
    }
  }
  return (
    <>
      <ul className={styles.shopList__list}>
        {baseItem.map((item, index) => {
          const ingredient = Object.entries(item);
          return (
            <li
              onClick={() => handleClickItem(index)}
              className={`${styles.shopList} ${className}`}
              key={ingredient[0][0]}>
              <RadioIcon color={color} active={active ? listItems.includes(index) : castomActive} />
              <div className={styles.shopList__text}>
                <span>{ingredient[0][0]}</span>
                <span>{ingredient[0][1]}</span>
              </div>
            </li>
          );
        })}
      </ul>
      {onButton && (
        <div className={styles.buttons}>
          <DefaultButton
            disabled={beRecipeShopList || !hasData}
            handleClick={() => clickAdd()}
            className={styles.button__add}
            text="Добавить в шоппинг-лист"
          />
          <DefaultButton
            disabled={beRecipeShopList || !hasData}
            handleClick={() => clickAddAll()}
            className={styles.button__addAll}
            text="Добавить все"
          />
        </div>
      )}
    </>
  );
}
