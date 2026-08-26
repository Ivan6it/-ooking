import { AuthButton } from '@/shared/ui/buttons/authButton';
import { SearchBar } from '@/shared/ui/SearchBar';
import { LogoIcon } from '@/shared/ui/icons';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__nav}>
        <div className={styles.header__nav__logo}>
          <Link to={'/'}>
            <LogoIcon />
          </Link>
        </div>
        <Link
          to={'/catalog'}
          style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
          className={styles.specButton}>
          Рецепты
        </Link>
        <Link
          to={'/guide'}
          style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
          className={styles.specButton}>
          Справочник
        </Link>
        <div className={styles.header__nav__search}>
          <SearchBar placeholder={'Поиск рецептов'} />
        </div>
      </div>
      <AuthButton text={'Войти'} />
    </header>
  );
}
