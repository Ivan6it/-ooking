import { AuthButton } from '@/shared/ui/buttons/authButton';
import { SearchBar } from '@/shared/ui/SearchBar';
import { LogoIcon } from '@/shared/ui/icons';
import styles from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openAuthModal, logout } from '@/store/userSlice';
import { useState } from 'react';
import type { FoodsState } from '@/store/foodsListSlice';
import type { RootState } from '@/store';
import type { Food } from '@/types/foods';

export function Header() {
  const [textInput, setTextInput] = useState('');
  const [recipes, setRecipes] = useState<Food[]>([]);
  const dispatch = useDispatch();
  const hasUser = useSelector((state: any) => state.user.userData.id);
  const { foods }: FoodsState = useSelector<RootState, FoodsState>((state) => state.foodsList);

  const navigate = useNavigate();

  function handleSearch(e: string) {
    setTextInput(e);
    if (e.trim().length === 0) {
      return;
    }
    setRecipes([]);
    const result = foods.filter((item) => item.name.toLowerCase().includes(e.toLowerCase()));
    setRecipes(result);
  }

  function clearSearch() {
    setTextInput('');
    setRecipes([]);
  }

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
          <SearchBar value={textInput} onChange={handleSearch} placeholder={'Поиск рецептов'} />
          {textInput.trim().length > 0 && recipes.length > 0 && (
            <ul className={styles.header__nav__search__list}>
              {recipes.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    navigate(`/catalog/${item.id}`);
                    clearSearch();
                  }}
                  className={styles.header__nav__search__list__item}>
                  {item.name}
                </li>
              ))}
            </ul>
          )}
          {textInput.trim().length > 0 && recipes.length === 0 && (
            <p className={styles.header__nav__search__notSearch}>Ничего не найдено</p>
          )}
        </div>
      </div>
      <AuthButton
        handleClick={hasUser ? () => dispatch(logout()) : () => dispatch(openAuthModal())}
        text={`${hasUser ? 'Выйти' : 'Войти'}`}
      />
    </header>
  );
}
