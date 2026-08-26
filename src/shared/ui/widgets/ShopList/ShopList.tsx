import styles from './ShopList.module.css';
import { RadioIcon } from '@/shared/ui/icons';
import { useState } from 'react';
import { DefaultButton } from '@/shared/ui/buttons/defaultButton';

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
};

export function ShopList({
  baseItem,
  onButton = true,
  className = '',
  color = '#67bb5a',
  active = true,
  castomActive,
}: ShopListProps) {
  const [listItems, setListItems] = useState<[string, string][]>([]);

  const items = listItems.map((i) => i[0]);
  function handleClickItem(name: [string, string]) {
    if (listItems.length > 0) {
      if (items.includes(name[0])) {
        setListItems(listItems.filter((item) => item[0] !== name[0]));
      } else {
        setListItems([...listItems, name]);
      }
    } else {
      setListItems([...listItems, name]);
    }
  }
  return (
    <>
      <ul className={styles.shopList__list}>
        {baseItem.map((item) => {
          const ingredient = Object.entries(item);
          return (
            <li
              onClick={() => handleClickItem(ingredient[0] as [string, string])}
              className={`${styles.shopList} ${className}`}
              key={ingredient[0][0]}>
              <RadioIcon
                color={color}
                active={active ? items.includes(ingredient[0][0]) : castomActive}
              />
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
          <DefaultButton className={styles.button__add} text="Добавить в шоппинг-лист" />
          <DefaultButton className={styles.button__addAll} text="Добавить все" />
        </div>
      )}
    </>
  );
}
