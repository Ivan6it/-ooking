import { Input } from '@/shared/ui/input';
import { IconActive } from '../../iconActive';
import { IconOKey } from '../../icons';
import { DefaultButton } from '@/shared/ui/buttons/defaultButton';
import styles from './Mailing.module.css';
import { useState } from 'react';

export function Mailing({ small = false }) {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleMailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMail(e.target.value);
  };

  return (
    <div className={`${styles.mailing} ${small ? styles.mailing__small : ''}`}>
      <form className={`${styles.mailing__form} ${small ? styles.mailing__form__small : ''}`}>
        <h2
          className={`${styles.mailing__form__heading} ${small ? styles.mailing__form__heading__small : ''}`}>
          Каждую неделю подборка новых рецептов у вас на почте!
        </h2>
        {!small && (
          <Input
            classInput={`${styles.mailing__form__input} ${small ? styles.mailing__form__input__small : ''}`}
            type="text"
            id="name"
            value={name}
            placeholder="Ваше имя"
            onChange={handleNameChange}
          />
        )}
        <Input
          classInput={`${styles.mailing__form__input} ${small ? styles.mailing__form__input__small : ''}`}
          type="email"
          id="email"
          value={mail}
          placeholder="Ваш Email"
          onChange={handleMailChange}
        />
        <div
          className={`${styles.mailing__form__personal} ${small ? styles.mailing__form__personal__small : ''}`}>
          <IconActive className={styles.mailing__form__personal__button} svg={<IconOKey />} />
          <p
            className={`${styles.mailing__form__personal__text} ${small ? styles.mailing__form__personal__text__small : ''}`}>
            Я подтверждаю согласие на&nbsp;
            <a
              className={`${styles.mailing__form__personal__text__link} ${small ? styles.mailing__form__personal__text__link__small : ''}`}
              target="_blank"
              href="https://ru.wikipedia.org/wiki/Обработка_персональных_данных">
              обработку персональных данных
            </a>
          </p>
        </div>
        <DefaultButton
          className={`${styles.mailing__form__button} ${small ? styles.mailing__form__button__small : ''}`}
          text="Подписаться"
        />
      </form>
      <div>
        <img
          loading="lazy"
          className={`${styles.mailing__image} ${small ? styles.mailing__image__small : ''}`}
          src="/images/Для рассылки.png"
        />
      </div>
    </div>
  );
}
