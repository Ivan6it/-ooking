import { LogoIcon, VKIcon, OKIcon, TGIcon, WhatsappIcon } from '../../icons';
import styles from './Footer.module.css';
import { IconLink } from '../../iconLinks/iconLink';
import { DefaultButton } from '@/shared/ui/buttons/defaultButton';
import { ButtonLink } from '@/shared/ui/buttonLinks';
import { useState } from 'react';
import { Input } from '@/shared/ui/input';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store';
import { updateUser } from '@/store/userSlice';

export function Footer() {
  const [email, setEmail] = useState('');
  const [errorMail, setErrorMail] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector((state: RootState) => state.user.userData);
  function validateFormFieldsEmail(value: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(value)) {
      setErrorMail('Некорректный адрес электронной почты');
      return false;
    }

    return true;
  }

  function submitEvent() {
    setErrorMail('');

    if (email.trim().length === 0) {
      setErrorMail('Введите почту');
      return;
    }

    if (!validateFormFieldsEmail(email)) {
      return;
    }
    if ('id' in userData) {
      dispatch(
        updateUser({
          userData: {
            id: userData.id,
            agreement: true,
          },
        }),
      );
    }
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__logo}>
        <LogoIcon />
      </div>

      <div className={styles.footer__nav}>
        <h2 className={styles.footer__nav__heading}>Присоединяйтесь</h2>
        <div className={styles.footer__nav__social}>
          <p className={styles.footer__nav__social__text}>Наши социальные сети:</p>
          <div className={styles.footer__nav__social__icons}>
            <IconLink
              href="https://vk.com/vanek1499"
              label="Иконка-ссылка на страницу в ВК"
              svg={<VKIcon />}
            />
            <IconLink
              href="https://vk.com/vanek1499"
              label="Иконка-ссылка на страницу в ВК"
              svg={<OKIcon />}
            />
            <IconLink
              href="https://vk.com/vanek1499"
              label="Иконка-ссылка на страницу в ВК"
              svg={<TGIcon />}
            />
            <IconLink
              href="https://vk.com/vanek1499"
              label="Иконка-ссылка на страницу в ВК"
              svg={<WhatsappIcon />}
            />
          </div>
        </div>
        {'agreement' in userData && !userData.agreement && (
          <form className={styles.footer__nav__form}>
            <p className={styles.footer__nav__form__text}>Подпишитесь на рассылку:</p>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Ваш Email"
              error={errorMail}
            />
            <DefaultButton
              disabled={userData.id === undefined}
              className={styles.settingButton}
              text="Подписаться"
              handleClick={() => submitEvent()}
            />
          </form>
        )}
      </div>
      <div className={styles.footer__separator}></div>
      <nav className={styles.footer__menu}>
        <h2 className={styles.footer__menu__heading}>Находите</h2>
        <ButtonLink to={'/'} children="Главная" />
        <ButtonLink to={'/catalog'} children="Рецепты" />
        <ButtonLink to={'/guide'} children="Справочник" />
        <ButtonLink to={'/profile'} children="Мой профиль" />
      </nav>
      <div className={styles.footer__separator}></div>
      <div className={styles.footer__feedBack}>
        <h2 className={styles.footer__feedBack__heading}>Обратная связь</h2>
        <p className={styles.footer__feedBack__text}>
          Помогите нам стать лучше! Оставьте свои пожелания по улучшению сервиса. Мы стараемся для
          вас!
        </p>
        <a
          className={styles.footer__feedBack__link}
          target="_blank"
          href="https://vk.com/vanek1499"
          aria-label="Обратная связь">
          Напишите нам
        </a>
      </div>
    </footer>
  );
}
