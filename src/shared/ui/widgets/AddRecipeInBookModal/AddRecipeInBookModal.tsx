import { IconActive } from '../../iconActive';
import styles from './AddRecipeInBookModal.module.css';
import { useEffect, useState } from 'react';
import { CrossIcon } from '@/shared/ui/icons';
import { Select } from '../../select';
import users from '@/data/users.json';
import { DefaultButton } from '../../buttons/defaultButton';
import { CreateBook } from '@/shared/ui/widgets/CreateBook';

type AddRecipeInBookModalProps = {
  closeModal: () => void;
  name: string;
  img: string;
  imgAlt: string;
};

export function AddRecipeInBookModal({ closeModal, name, img, imgAlt }: AddRecipeInBookModalProps) {
  const [openModalCreateBook, setOpenModalCreateBook] = useState(false);
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

  const options = users[0].cookbooks;
  const result = options.map((item) => ({
    name: item.name,
    value: item.id,
  }));

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
          <Select
            classOption={styles.addRecipeInBookModal__classOption}
            classList={styles.addRecipeInBookModal__classList}
            classValue={styles.addRecipeInBookModal__classValue}
            options={result}
            classSelect={styles.addRecipeInBookModal__classSelect}
          />
          <div className={styles.addRecipeInBookModal__buttons}>
            <DefaultButton
              handleClick={() => setOpenModalCreateBook((prev) => !prev)}
              className={styles.addRecipeInBookModal__buttons__create}
              text="Создать новую кулинарную книгу"
            />
            <DefaultButton
              className={styles.addRecipeInBookModal__buttons__add}
              text="Добавить в книгу"
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
