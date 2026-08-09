import styles from './ProfileUserPage.module.css';
import { Bookmark, GearIcon, LikeIcon, PencilIcon, TaskIcon } from '@/shared/ui/icons';
import users from '@/data/users.json';
import { IconActive } from '@/shared/ui/iconActive';
import { useState } from 'react';
import { LikeSection } from '@/shared/ui/widgets/LikeSection';
import { Cookbooks } from '@/shared/ui/widgets/Cookbooks';
import type { Food } from '@/data/foods.json';
import { SectionCards } from '@/shared/ui/widgets/SectionCards';
import { DefaultButton } from '../../buttons/defaultButton';
import { CreateBook } from '@/shared/ui/widgets/CreateBook';
import { ShoppingList } from '../../widgets/ShoppingList';
import { ShoppingListItem } from '@/shared/ui/widgets/ShoppingListItem';

export function ProfileUserPage() {
  const [createBook, setCreateBook] = useState(false);
  const [chapter, setChapter] = useState('cookbooks');
  const [visibleBook, setVisibleBook] = useState<{
    name: string;
    recipesList: Food[];
    visible: boolean;
  } | null>(null);
  const [shopList, setShopList] = useState<{
    recipe: Food;
    buyingredients: number[] | [];
    purchasedingredients: number[] | [];
  } | null>(null);

  function createBookFunction() {
    setCreateBook((prev) => !prev);
  }

  function handleBack() {
    setShopList(null);
  }

  function selectShoppinglist(
    recipe: Food,
    buyingredients: number[] | [],
    purchasedingredients: number[] | [],
  ) {
    setShopList({
      recipe: recipe,
      buyingredients: buyingredients,
      purchasedingredients: purchasedingredients,
    });
  }

  function selectBook(recipes: Food[], name: string) {
    if (recipes.length === 0) {
      setVisibleBook({ name: name, recipesList: recipes, visible: true });
    } else {
      setVisibleBook({ name: name, recipesList: recipes, visible: true });
    }
  }

  return (
    <div className={styles.profileUserPage}>
      <button className={styles.profileUserPage__settingButton}>
        <GearIcon className={styles.profileUserPage__settingButton__svg} />
        <span>Настройки</span>
      </button>
      <div className={styles.profileUserPage__profile}>
        <div className={styles.profileUserPage__profile__container}>
          <img className={styles.profileUserPage__profile__container__img} src={users[0].image} />
          <div className={styles.profileUserPage__profile__container__svg}>
            <PencilIcon className={styles.profileUserPage__profile__container__svg__setting} />
          </div>
        </div>
        <div className={styles.profileUserPage__profile__info}>
          <span className={styles.profileUserPage__profile__info__name}>{users[0].name}</span>
          <span>Член сообщества</span>
        </div>
      </div>
      {visibleBook === null && (
        <>
          <div className={styles.profileUserPage__buttons}>
            <IconActive
              handleClick={() => {
                setChapter('cookbooks');
              }}
              className={`${styles.profileUserPage__buttons__button} ${chapter === 'cookbooks' ? styles.active : ''}`}
              svg={<Bookmark active={true} color={'rgba(247, 147, 30, 1)'} />}
              text="Кулинарные книги"
            />
            <IconActive
              handleClick={() => {
                setChapter('shoppingList');
              }}
              className={`${styles.profileUserPage__buttons__button} ${chapter === 'shoppingList' ? styles.active : ''}`}
              svg={<TaskIcon />}
              text="Список покупок"
            />
            <IconActive
              handleClick={() => {
                setChapter('like');
              }}
              className={`${styles.profileUserPage__buttons__button} ${chapter === 'like' ? styles.active : ''}`}
              svg={<LikeIcon active={true} color={'rgba(247, 147, 30, 1)'} />}
              text="Нравится"
            />
          </div>
          <div className={styles.profileUserPage__line}></div>

          {chapter === 'like' && <LikeSection />}
          {chapter === 'cookbooks' && (
            <Cookbooks createBook={createBookFunction} handleClick={selectBook} />
          )}
          {chapter === 'shoppingList' && shopList === null && (
            <ShoppingList handleclick={selectShoppinglist} />
          )}
        </>
      )}
      {visibleBook !== null && visibleBook.recipesList.length > 0 && (
        <>
          <SectionCards
            ogrinicator={true}
            heading={visibleBook.name}
            foods={visibleBook.recipesList}
          />
          <DefaultButton
            handleClick={() => setVisibleBook(null)}
            className={styles.profileUserPage__sectionCards__button}
            text="Вернуться назад"
          />
        </>
      )}
      {shopList !== null && <ShoppingListItem handleBack={handleBack} data={shopList} />}
      {visibleBook !== null && visibleBook.recipesList.length === 0 && (
        <div className={styles.profileUserPage__sectionCards__empty}>
          <span className={styles.profileUserPage__sectionCards__empty__text}>
            Тут пока пусто
            <br />
            Пора добавить что-то
          </span>
          <DefaultButton
            className={styles.profileUserPage__sectionCards__empty__button}
            text="В каталог"
          />
          <DefaultButton
            handleClick={() => setVisibleBook(null)}
            className={styles.profileUserPage__sectionCards__empty__button}
            text="Назад"
          />
        </div>
      )}
      {createBook && <CreateBook closeModal={createBookFunction} />}
    </div>
  );
}
