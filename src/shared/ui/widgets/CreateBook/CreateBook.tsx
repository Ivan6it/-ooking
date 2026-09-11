import styles from './CreateBook.module.css';
import { Input } from '@/shared/ui/input';
import { useState, useEffect } from 'react';
import { DefaultButton } from '../../buttons/defaultButton';
import { CrossIcon } from '@/shared/ui/icons';
import { IconActive } from '../../iconActive';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '@/store/userSlice';
import type { AppDispatch } from '@/store';

type CreateBookProps = {
  closeModal: () => void;
};

export function CreateBook({ closeModal }: CreateBookProps) {
  const [bookName, setBookName] = useState('');
  const [error, setError] = useState('');

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
  }, []);

  const user = useSelector((state: any) => state.user.userData);
  const dispatch = useDispatch<AppDispatch>();

  function createBook() {
    setError('');
    const newNameBookList = bookName.trim();
    if (user.cookbooks.some((name: any) => name.name === newNameBookList)) {
      setError('Название книги не должно совпадать с уже имеющимимся');
    } else if (newNameBookList.length < 2) {
      setError('Название должно содержать не менее 2 символов');
    } else if (/^[a-zA-Zа-яА-ЯёЁ0-9 ]+$/.test(newNameBookList)) {
      const newCookBooks = { name: newNameBookList, recipes: [], id: Date.now() };
      setError('');
      dispatch(
        updateUser({
          userData: {
            id: user.id,
            cookbooks: [...user.cookbooks, newCookBooks],
          },
        }),
      );
      closeModal();
    } else {
      setError('Можно использовать только буквы и цифры');
    }
  }

  return (
    <div className={styles.createBook__overlay}>
      <div className={styles.createBook}>
        <span>
          Создайте новую
          <br />
          кулинарную книгу
        </span>
        <div className={styles.createBook__container}>
          <div className={styles.createBook__container__container__img}>
            <img loading="lazy" src="/images/CreateBookImg__1.png" />
          </div>
          <div className={styles.createBook__container__container__img}>
            <img loading="lazy" src="/images/CreateBookImg__2.png" />
          </div>
          <div className={styles.createBook__container__container__img}>
            <img loading="lazy" src="/images/CreateBookImg__3.png" />
          </div>
        </div>
        <Input
          error={error}
          classError={styles.createBook__error}
          placeholder="Напишите заголовок"
          classInput={styles.createBook__input}
          onChange={(e) => {
            setBookName(e.target.value);
          }}
          value={bookName}
          type="text"
        />
        <div className={styles.createBook__buttons}>
          <DefaultButton
            handleClick={() => closeModal()}
            className={styles.createBook__buttons__buttonClose}
            text="Закрыть"
          />
          <DefaultButton
            handleClick={() => createBook()}
            className={styles.createBook__buttons__buttonCreate}
            text="Создать"
          />
        </div>
        <IconActive
          handleClick={() => closeModal()}
          className={styles.createBook__cross}
          svg={<CrossIcon />}
        />
      </div>
    </div>
  );
}
