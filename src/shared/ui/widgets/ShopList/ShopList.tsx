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
};

export function ShopList({ baseItem }: ShopListProps) {
  console.log(baseItem[0]);
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
      <ul>
        {baseItem.map((item, index) => {
          const ingredient = Object.entries(item);
          return (
            <li
              onClick={() => handleClickItem(ingredient[0] as [string, string])}
              className={`${styles.shopList} ${index + 1 === baseItem.length ? styles.shopList__text__lastItem : ''}`}
              key={ingredient[0][0]}>
              <RadioIcon active={items.includes(ingredient[0][0])} />
              <div className={styles.shopList__text}>
                <span>{ingredient[0][0]}</span>
                <span>{ingredient[0][1]}</span>
              </div>
            </li>
          );
        })}
      </ul>
      <div className={styles.buttons}>
        <DefaultButton className={styles.button__add} text="Добавить в шоппинг-лист" />
        <DefaultButton className={styles.button__addAll} text="Добавить все" />
      </div>
    </>
  );
}
