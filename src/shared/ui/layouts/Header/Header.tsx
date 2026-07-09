import { AuthButton } from '@/shared/ui/buttons/authButton';
import { SpecButton } from '@/shared/ui/buttons/headerSpecButton';
import { SearchBar } from '@/shared/ui/SearchBar';
import { LogoIcon } from '@/shared/ui/icons';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__nav}>
        <div className={styles.header__nav__logo}>
          <LogoIcon />
        </div>
        <SpecButton text="Рецепты" handleClickSpecButton={(() => {}) as () => {}} />
        <SpecButton text="Справочник" handleClickSpecButton={(() => {}) as () => {}} />
        <div className={styles.header__nav__search}>
          <SearchBar placeholder={'Поиск рецептов'} />
        </div>
      </div>
      <AuthButton text={'Войти'} />
    </header>
  );
}
