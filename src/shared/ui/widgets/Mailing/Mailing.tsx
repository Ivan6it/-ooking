import { Input } from '@/shared/ui/input';
import { IconActive } from '../../iconActive';
import { IconOKey } from '../../icons';
import { DefaultButton } from '@/shared/ui/buttons/defaultButton';
import styles from './Mailing.module.css';
import { useState } from 'react';

export function Mailing() {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleMailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMail(e.target.value);
  };

  return (
    <div className={styles.mailing}>
      <form className={styles.mailing__form}>
        <h2 className={styles.mailing__form__heading}>
          Каждую неделю подборка новых рецептов у вас на почте!
        </h2>
        <Input
          classInput={styles.mailing__form__input}
          type="text"
          id="name"
          value={name}
          placeholder="Ваше имя"
          onChange={handleNameChange}
        />
        <Input
          classInput={styles.mailing__form__input}
          type="email"
          id="email"
          value={mail}
          placeholder="Ваш Email"
          onChange={handleMailChange}
        />
        <div className={styles.mailing__form__personal}>
          <IconActive className={styles.mailing__form__personal__button} svg={<IconOKey />} />
          <p className={styles.mailing__form__personal__text}>
            Я подтверждаю согласие на
            <a
              className={styles.mailing__form__personal__text__link}
              target="_blank"
              href="https://ru.wikipedia.org/wiki/Обработка_персональных_данных">
              обработку персональных данных
            </a>
          </p>
        </div>
        <DefaultButton className={styles.mailing__form__button} text="Подписаться" />
      </form>
      <div>
        <img className={styles.mailing__image} src="src/images/Для рассылки.png" />
      </div>
    </div>
  );
}
