import { LogoIcon, VKIcon, OKIcon, TGIcon, WhatsappIcon } from '../../icons';
import styles from './Footer.module.css';
import { IconLink } from '../../iconLinks/iconLink';
import { DefaultButton } from '@/shared/ui/buttons/defaultButton';
import { ButtonLink } from '@/shared/ui/buttonLinks';
import { useState } from 'react';

export function Footer() {
  const [email, setEmail] = useState('');
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
        <form className={styles.footer__nav__form}>
          <p className={styles.footer__nav__form__text}>Подпишитесь на рассылку:</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Ваш Email"
          />
          <DefaultButton
            className={styles.settingButton}
            handleClick={() => {}}
            text="Подписаться"
          />
        </form>
      </div>
      <div className={styles.footer__separator}></div>
      <nav className={styles.footer__menu}>
        <h2 className={styles.footer__menu__heading}>Находите</h2>
        <ButtonLink to={''} children="Главная" />
        <ButtonLink to={''} children="Рецепты" />
        <ButtonLink to={''} children="Справочник" />
        <ButtonLink to={''} children="Мой профиль" />
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
