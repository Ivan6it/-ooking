import { IconActive } from '../../iconActive';
import { VKIcon, MailIcon, IconOKey, CrossIcon, EyeIcon } from '@/shared/ui/icons';
import styles from './AuthorizationAndRegistration.module.css';
import { Input } from '../../input';
import { useState } from 'react';
import { DefaultButton } from '../../buttons/defaultButton';

export function AuthorizationAndRegistration() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modal, setModal] = useState('reg');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [nameError, setNameError] = useState({ text: '', active: false });
  const [emailError, setEmailError] = useState({ text: '', active: false });
  const [passwordError, setPasswordError] = useState({ text: '', active: false });
  const [isTouched, setIsTouched] = useState(false);
  const [agreement, setAgreement] = useState(false);

  function validateFormFieldsName(value: string): string {
    const namePattern = /^[^0-9_@!]+$/;
    if (!namePattern.test(value)) {
      return 'Имя содержит недопустимые символы';
    }
    if (value.trim().length < 2) {
      return 'Имя должно содержать минимум 2 символа';
    }
    return '';
  }

  function validateFormFieldsEmail(value: string): string {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(value)) {
      return 'Некорректный адрес электронной почты';
    }
    return '';
  }

  function validateFormFieldsPassword(value: string): string {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!passwordPattern.test(value)) {
      return 'Некорректный пароль';
    }
    return '';
  }

  function handleBlurName() {
    setIsTouched(true);
    setNameError({ text: validateFormFieldsName(name), active: true });
  }

  function handleBlurEmail() {
    setIsTouched(true);
    setEmailError({ text: validateFormFieldsEmail(email), active: true });
  }

  function handleBlurPassword() {
    setIsTouched(true);
    setPasswordError({ text: validateFormFieldsPassword(password), active: true });
  }

  const isFormValidAuth = () => {
    return (
      password.trim().length > 0 &&
      email.trim().length > 0 &&
      !passwordError.text &&
      !emailError.text &&
      emailError.active &&
      passwordError.active
    );
  };

  const isFormValidReg = () => {
    return (
      password.trim().length > 0 &&
      name.trim().length > 0 &&
      email.trim().length > 0 &&
      !passwordError.text &&
      !nameError.text &&
      !emailError.text &&
      agreement &&
      nameError.active &&
      emailError.active &&
      passwordError.active
    );
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const clearForm = () => {
    setPasswordError({ text: '', active: false });
    setEmailError({ text: '', active: false });
    setNameError({ text: '', active: false });
    setName('');
    setEmail('');
    setPasswordVisible(false);
    setPassword('');
  };

  const selectAuth = () => {
    clearForm();
    setModal('auth');
  };

  const selectReg = () => {
    clearForm();
    setModal('reg');
  };

  return (
    <div className={styles.authorizationAndRegistration__overlay}>
      <div className={styles.authorizationAndRegistration}>
        <img
          loading="lazy"
          className={styles.authorizationAndRegistration__img}
          src={'src/images/regAndAuth.jpg'}
        />
        {modal === 'reg' && (
          <div className={styles.authorizationAndRegistration__form}>
            <h2>Добро пожаловать в клуб Mealsy!</h2>
            <h3>Создайте учётную запись</h3>
            <div className={styles.authorizationAndRegistration__form__icons}>
              <IconActive
                className={styles.authorizationAndRegistration__form__icons__icon}
                text="Создать через Вконтакт"
                svg={<VKIcon size={20} hover={false} />}
              />
              <IconActive
                className={styles.authorizationAndRegistration__form__icons__icon}
                text="Создать через Почту"
                svg={<MailIcon size={20} hover={false} />}
              />
            </div>
            <div className={styles.authorizationAndRegistration__form__line}>
              <div className={styles.authorizationAndRegistration__form__line__item}></div>
              <span>или используйте email</span>
              <div className={styles.authorizationAndRegistration__form__line__item}></div>
            </div>
            <form className={styles.authorizationAndRegistration__form__details}>
              <Input
                classInput={`${styles.authorizationAndRegistration__form__details__input} ${nameError.active ? (nameError.text ? styles.error__input : styles.valid__input) : ''}`}
                placeholder="Ваше имя"
                onChange={handleNameChange}
                value={name}
                type="text"
                id="name"
                handleBlur={handleBlurName}
                error={nameError.text}
              />
              <Input
                classInput={`${styles.authorizationAndRegistration__form__details__input} ${emailError.active ? (emailError.text ? styles.error__input : styles.valid__input) : ''}`}
                placeholder="Ваш Email"
                onChange={handleEmailChange}
                value={email}
                type="email"
                id="email"
                handleBlur={handleBlurEmail}
                error={emailError.text}
              />
              <Input
                classInput={`${styles.authorizationAndRegistration__form__details__input} ${passwordError.active ? (passwordError.text ? styles.error__input : styles.valid__input) : ''}`}
                placeholder="Пароль"
                onChange={handlePasswordChange}
                value={password}
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                handleBlur={handleBlurPassword}
                error={passwordError.text}
                svg={
                  <IconActive
                    handleClick={() => setPasswordVisible((prev) => !prev)}
                    svg={<EyeIcon active={passwordVisible} className={styles.svg__eye} />}
                  />
                }
              />
              <DefaultButton
                disabled={!isFormValidReg()}
                className={styles.authorizationAndRegistration__form__details__button}
                text="Создать аккаунт"
              />
              <div className={styles.authorizationAndRegistration__form__details__approval}>
                <IconActive
                  handleClick={() => setAgreement((prev) => !prev)}
                  svg={<IconOKey active={agreement} size={24} />}
                />
                <p>
                  Я подтверждаю согласие на&nbsp;
                  <a
                    className={styles.authorizationAndRegistration__form__details__approval__link}
                    target="_blank"
                    href="https://ru.wikipedia.org/wiki/Обработка_персональных_данных">
                    обработку персональных данных
                  </a>
                </p>
              </div>
            </form>
            <div className={styles.authorizationAndRegistration__form__button}>
              <p>Уже есть аккаунт?&nbsp;</p>
              <button
                onClick={selectAuth}
                className={styles.authorizationAndRegistration__form__button__item}>
                Войти
              </button>
            </div>
          </div>
        )}
        {modal === 'auth' && (
          <div className={styles.authorizationAndRegistration__form}>
            <h2>Добро пожаловать в клуб Mealsy!</h2>
            <h3>Войти в профиль</h3>
            <form className={styles.authorizationAndRegistration__form__details}>
              <Input
                classInput={`${styles.authorizationAndRegistration__form__details__input} ${emailError.active ? (emailError.text ? styles.error__input : styles.valid__input) : ''}`}
                placeholder="Ваш Email"
                onChange={handleEmailChange}
                value={email}
                type="email"
                id="email"
                handleBlur={handleBlurEmail}
                error={emailError.text}
              />
              <Input
                classInput={`${styles.authorizationAndRegistration__form__details__input} ${passwordError.active ? (passwordError.text ? styles.error__input : styles.valid__input) : ''}`}
                placeholder="Пароль"
                onChange={handlePasswordChange}
                value={password}
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                handleBlur={handleBlurPassword}
                error={passwordError.text}
                svg={
                  <IconActive
                    handleClick={() => setPasswordVisible((prev) => !prev)}
                    svg={<EyeIcon active={passwordVisible} className={styles.svg__eye} />}
                  />
                }
              />
              <div className={styles.authorizationAndRegistration__form__details__select}>
                <IconActive
                  className={styles.authorizationAndRegistration__form__details__select__icon}
                  text="Запомнить меня"
                  svg={<IconOKey size={24} />}
                />
                <a className={styles.authorizationAndRegistration__form__details__button__password}>
                  Забыли пароль?
                </a>
              </div>
              <DefaultButton
                disabled={!isFormValidAuth()}
                className={styles.authorizationAndRegistration__form__details__button__entrance}
                text="Войти"
              />
            </form>
            <div
              className={`${styles.authorizationAndRegistration__form__line} ${styles.line__auth}`}>
              <div className={styles.authorizationAndRegistration__form__line__item}></div>
              <span>или войти</span>
              <div className={styles.authorizationAndRegistration__form__line__item}></div>
            </div>
            <div className={styles.authorizationAndRegistration__form__icons}>
              <IconActive
                className={styles.authorizationAndRegistration__form__icons__icon}
                text="Войти через Вконтакт"
                svg={<VKIcon size={20} hover={false} />}
              />
              <IconActive
                className={styles.authorizationAndRegistration__form__icons__icon}
                text="Войти через Почту"
                svg={<MailIcon size={20} hover={false} />}
              />
            </div>
            <div className={styles.authorizationAndRegistration__form__button}>
              <p>Не зарегестрированы?&nbsp;</p>
              <button
                onClick={selectReg}
                className={styles.authorizationAndRegistration__form__button__item}>
                Зарегестрироваться
              </button>
            </div>
          </div>
        )}
        <IconActive className={styles.authorizationAndRegistration__cross} svg={<CrossIcon />} />
      </div>
    </div>
  );
}
