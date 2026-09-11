import styles from './CookbooksItem.module.css';
import type { Cookbook } from '@/types/users';
import { getRecipesCountText } from '@/shared/helpers/helpersFunction';
import { IconActive } from '../../iconActive';
import { Ellipsis } from '@/shared/ui/icons';
import { DefaultButton } from '@/shared/ui/buttons/defaultButton';
import { useState, useEffect, useRef } from 'react';
import type { FoodsState } from '@/store/foodsListSlice';
import type { RootState, AppDispatch } from '@/store';
import { useSelector, useDispatch } from 'react-redux';
import type { Food } from '@/types/foods';
import { updateUser } from '@/store/userSlice';

interface CookbooksItemProps {
  data: Cookbook;
  handleClick?: (recipes: Food[], name: string) => void;
}

export function CookbooksItem({ data, handleClick }: CookbooksItemProps) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [renameMenuVisible, setRenameMenuVisible] = useState(false);
  const [nameBook, setNameBook] = useState('');
  const [error, setError] = useState('');
  const { foods }: FoodsState = useSelector<RootState, FoodsState>((state) => state.foodsList);

  const user = useSelector((state: any) => state.user.userData);
  const dispatch = useDispatch<AppDispatch>();

  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setMenuVisible(false);
      }
    }

    if (menuVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuVisible]);

  function renameBook() {
    setError('');
    setRenameMenuVisible(true);
  }

  function deleteBook() {
    const newBooksList = user.cookbooks.filter((item: any) => item.name !== data.name);
    dispatch(
      updateUser({
        userData: {
          id: user.id,
          cookbooks: [...newBooksList],
        },
      }),
    );
    setMenuVisible(false);
  }

  function confirmRename() {
    setError('');
    const newNameBook = nameBook.trim();
    if (newNameBook.length < 2) {
      setError('Минимум 2 символа');
    } else if (!/^[a-zA-Zа-яА-ЯёЁ0-9 ]+$/.test(newNameBook)) {
      setError('Недопустимые символы');
    } else if (user.cookbooks.some((item: any) => item.name === newNameBook)) {
      setError('Такое имя уже существует');
    } else {
      const rename = user.cookbooks.map((item: any) => {
        if (item.name === data.name) {
          return { ...item, name: newNameBook };
        }
        return item;
      });
      dispatch(
        updateUser({
          userData: {
            id: user.id,
            cookbooks: [...rename],
          },
        }),
      );
      setMenuVisible(false);
    }
  }

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
          {recipesList.map((item, index) => (
            <img
              key={index}
              loading="lazy"
              className={styles.cookbooksItem__solo__img}
              src={item.image}
            />
          ))}
        </div>
      )}
      {data.recipes.length === 2 && (
        <div onClick={() => handleClick?.(recipes, name)} className={styles.cookbooksItem__double}>
          {recipesList.map((item, index) => (
            <img
              key={index}
              loading="lazy"
              src={item.image}
              className={styles.cookbooksItem__double__img}
            />
          ))}
        </div>
      )}
      {data.recipes.length > 2 && (
        <div onClick={() => handleClick?.(recipes, name)} className={styles.cookbooksItem__triple}>
          {recipesList.map((item, index) => (
            <div key={index} className={styles.cookbooksItem__triple__empty}>
              <img
                loading="lazy"
                src={item.image}
                className={styles.cookbooksItem__triple__empty__img}
              />
            </div>
          ))}
        </div>
      )}
      <div className={styles.cookbooksItem__info}>
        <div className={styles.cookbooksItem__info__container}>
          <h3>{data.name}</h3>
          <IconActive
            handleClick={() => {
              setRenameMenuVisible(false);
              setMenuVisible((prev) => !prev);
            }}
            svg={<Ellipsis />}
          />
          {menuVisible && (
            <div ref={selectRef} className={styles.cookbooksItem__info__container__buttons}>
              {renameMenuVisible && (
                <div className={styles.cookbooksItem__info__container__buttons__container}>
                  <input
                    onChange={(e) => setNameBook(e.target.value)}
                    className={styles.cookbooksItem__info__container__buttons__container__input}
                    type={'text'}></input>
                  <DefaultButton
                    handleClick={() => confirmRename()}
                    className={styles.cookbooksItem__info__container__buttons__container__button}
                    text="Подтвердить"></DefaultButton>
                  {error && (
                    <p className={styles.cookbooksItem__info__container__buttons__container__error}>
                      {error}
                    </p>
                  )}
                </div>
              )}
              {!renameMenuVisible && (
                <DefaultButton
                  className={styles.cookbooksItem__info__container__buttons__button}
                  text="Изменить название"
                  handleClick={() => renameBook()}
                />
              )}
              <DefaultButton
                className={`${styles.cookbooksItem__info__container__buttons__button} ${styles.deleteButton}`}
                text="Удалить"
                handleClick={() => deleteBook()}
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
