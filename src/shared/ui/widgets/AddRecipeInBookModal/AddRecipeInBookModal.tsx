import { IconActive } from '../../iconActive';
import styles from './AddRecipeInBookModal.module.css';
import { useEffect, useState } from 'react';
import { CrossIcon } from '@/shared/ui/icons';
import { Select } from '../../select';
import { DefaultButton } from '../../buttons/defaultButton';
import { CreateBook } from '@/shared/ui/widgets/CreateBook';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '@/store/userSlice';
import type { AppDispatch } from '@/store';

type AddRecipeInBookModalProps = {
  closeModal: () => void;
  name: string;
  img: string;
  imgAlt: string;
  idRecipe: number;
};

export function AddRecipeInBookModal({
  closeModal,
  name,
  img,
  imgAlt,
  idRecipe,
}: AddRecipeInBookModalProps) {
  const [openModalCreateBook, setOpenModalCreateBook] = useState(false);
  const user = useSelector((state: any) => state.user.userData);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.marginRight = `${scrollBarWidth}px`;
    document.body.classList.add('no-scroll');

    return () => {
      document.body.classList.remove('no-scroll');
      document.body.style.overflow = '';
      document.body.style.marginRight = '';
    };
  }, [openModalCreateBook]);

  const options = user.cookbooks;

  const result = options.map((item: any) => ({
    name: item.name,
    value: item.id,
  }));

  const [selectBook, setSelectBook] = useState(result[0]?.value || '');

  useEffect(() => {
    if (user.cookbooks.length > 0 && !selectBook) {
      setSelectBook(user.cookbooks[0].id);
    }
  }, [user.cookbooks, selectBook]);

  function addRecipes() {
    const newCookbook = user.cookbooks.map((item: any) => {
      if (item.id === selectBook) {
        return { ...item, recipes: [...item.recipes, idRecipe] };
      }
      return item;
    });
    dispatch(
      updateUser({
        userData: {
          id: user.id,
          cookbooks: newCookbook,
        },
      }),
    );
    closeModal();
  }

  return (
    <>
      <div className={styles.addRecipeInBookModal__overlay}>
        <div className={styles.addRecipeInBookModal}>
          <IconActive
            handleClick={() => closeModal()}
            className={styles.addRecipeInBookModal__cross}
            svg={<CrossIcon />}
          />
          <h3 className={styles.addRecipeInBookModal__heading}>СОХРАНИТЬ РЕЦЕПТ</h3>
          <img
            loading="lazy"
            className={styles.addRecipeInBookModal__img}
            alt={imgAlt}
            src={img}></img>
          <span className={styles.addRecipeInBookModal__text}>{name}</span>
          {user.cookbooks.length === 0 ? (
            <div style={{ marginBottom: '15px' }}></div>
          ) : (
            <Select
              onChange={(value) => setSelectBook(value)}
              classOption={styles.addRecipeInBookModal__classOption}
              classList={styles.addRecipeInBookModal__classList}
              classValue={styles.addRecipeInBookModal__classValue}
              options={result}
              classSelect={styles.addRecipeInBookModal__classSelect}
            />
          )}
          <div className={styles.addRecipeInBookModal__buttons}>
            <DefaultButton
              handleClick={() => setOpenModalCreateBook((prev) => !prev)}
              className={styles.addRecipeInBookModal__buttons__create}
              text="Создать новую кулинарную книгу"
            />
            <DefaultButton
              className={styles.addRecipeInBookModal__buttons__add}
              text="Добавить в книгу"
              handleClick={() => addRecipes()}
            />
          </div>
        </div>
      </div>
      {openModalCreateBook && (
        <CreateBook closeModal={() => setOpenModalCreateBook((prev) => !prev)} />
      )}
    </>
  );
}
