import { Input } from '@/shared/ui/input';
import { IconActive } from '../../iconActive';
import { IconOKey } from '../../icons';
import { DefaultButton } from '@/shared/ui/buttons/defaultButton';
import styles from './Mailing.module.css';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '@/store/userSlice';
import type { AppDispatch, RootState } from '@/store';

export function Mailing({ small = false }) {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [error, setError] = useState('');
  const [errorName, setErrorName] = useState('');
  const [errorMail, setErrorMail] = useState('');
  const [agreementForm, setAgreementForm] = useState(false);

  const userAgreement = useSelector((state: RootState) =>
    'agreement' in state.user.userData ? state.user.userData.agreement : undefined,
  );
  const userId = useSelector((state: RootState) =>
    'id' in state.user.userData ? state.user.userData.id : undefined,
  );
  const dispatch = useDispatch<AppDispatch>();
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleMailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMail(e.target.value);
  };

  function validateFormFieldsName(value: string): boolean {
    const namePattern = /^[^0-9_@!]+$/;

    if (!namePattern.test(value)) {
      setErrorName('Имя содержит недопустимые символы');
      return false;
    }

    if (value.trim().length < 2) {
      setErrorName('Имя должно содержать минимум 2 символа');
      return false;
    }

    return true;
  }

  function validateFormFieldsEmail(value: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(value)) {
      setErrorMail('Некорректный адрес электронной почты');
      return false;
    }

    return true;
  }

  function submitEvent() {
    if (!userId) {
      return;
    }
    setErrorName('');
    setErrorMail('');
    setError('');

    if (!small) {
      if (name.trim().length === 0) {
        setErrorName('Введите имя');
        return;
      }

      if (!validateFormFieldsName(name)) {
        return;
      }

      if (mail.trim().length === 0) {
        setErrorMail('Введите почту');
        return;
      }

      if (!validateFormFieldsEmail(mail)) {
        return;
      }

      if (!agreementForm) {
        setError('Нужно принять соглашение');
        return;
      }

      dispatch(
        updateUser({
          userData: {
            id: userId,
            agreement: true,
          },
        }),
      );
    } else {
      if (mail.trim().length === 0) {
        setErrorMail('Введите почту');
        return;
      }
      if (!validateFormFieldsEmail(mail)) {
        return;
      }
      if (!agreementForm) {
        setError('Нужно принять соглашение');
        return;
      }
      dispatch(
        updateUser({
          userData: {
            id: userId,
            agreement: true,
          },
        }),
      );
    }
  }

  return (
    <div className={`${styles.mailing} ${small ? styles.mailing__small : ''}`}>
      {userAgreement && <div className={styles.mailing__overlay}>Вы подписаны!</div>}
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
            error={errorName}
          />
        )}
        <Input
          error={errorMail}
          classInput={`${styles.mailing__form__input} ${small ? styles.mailing__form__input__small : ''}`}
          type="email"
          id="email"
          value={mail}
          placeholder="Ваш Email"
          onChange={handleMailChange}
        />
        <div
          className={`${styles.mailing__form__personal} ${small ? styles.mailing__form__personal__small : ''}`}>
          <IconActive
            handleClick={() => setAgreementForm((prev) => !prev)}
            className={styles.mailing__form__personal__button}
            svg={<IconOKey active={agreementForm} />}
          />
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
          {error && <p className={styles.mailing__form__personal__error}>{error}</p>}
        </div>
        <DefaultButton
          className={`${styles.mailing__form__button} ${small ? styles.mailing__form__button__small : ''}`}
          text="Подписаться"
          disabled={userAgreement === undefined}
          handleClick={() => submitEvent()}
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
