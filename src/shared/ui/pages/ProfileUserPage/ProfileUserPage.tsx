import styles from './ProfileUserPage.module.css';
import { Bookmark, GearIcon, LikeIcon, PencilIcon, TaskIcon } from '@/shared/ui/icons';
import { IconActive } from '@/shared/ui/iconActive';
import { useState } from 'react';
import { LikeSection } from '@/shared/ui/widgets/LikeSection';
import { Cookbooks } from '@/shared/ui/widgets/Cookbooks';
import type { Food } from '@/types/foods';
import { SectionCards } from '@/shared/ui/widgets/SectionCards';
import { DefaultButton } from '../../buttons/defaultButton';
import { CreateBook } from '@/shared/ui/widgets/CreateBook';
import { ShoppingList } from '../../widgets/ShoppingList';
import { ShoppingListItem } from '@/shared/ui/widgets/ShoppingListItem';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import type { Cookbook, Shoppinglist } from '@/types/users';

export default function ProfileUserPage() {
  const [createBook, setCreateBook] = useState(false);
  const [chapter, setChapter] = useState('cookbooks');

  const [visibleBook, setVisibleBook] = useState<{
    name: string;
    recipesList: Food[];
    visible: boolean;
  } | null>(null);

  const [shopListId, setShopListId] = useState<number | null>(null);

  const users = useSelector((state: RootState) => state.user.userData);
  const foods = useSelector((state: RootState) => state.foodsList.foods);

  function createBookFunction() {
    setCreateBook((prev) => !prev);
  }

  function handleBack() {
    setShopListId(null);
  }

  function selectShoppinglist(recipe: Food) {
    setShopListId(recipe.id);
  }

  function selectBook(recipes: Food[], name: string) {
    setVisibleBook({
      name: name,
      recipesList: recipes,
      visible: true,
    });
  }

  const cookbook = visibleBook
    ? 'cookbooks' in users
      ? users.cookbooks.find((item: Cookbook) => item.name === visibleBook.name)
      : undefined
    : null;

  const catalog = cookbook
    ? foods.filter((item: Food) => cookbook.recipes.some((id: number) => id === item.id))
    : [];

  const shopList =
    shopListId !== null
      ? 'shoppinglist' in users
        ? users.shoppinglist.find((item: Shoppinglist) => item.id === shopListId)
        : undefined
      : null;

  const shopListData =
    shopList && foods.length > 0
      ? {
          recipe: foods.find((item: Food) => item.id === shopList.id),
          buyingredients: shopList.buyingredients,
          purchasedingredients: shopList.purchasedingredients,
        }
      : null;

  return (
    <div className={styles.profileUserPage}>
      <Link to={'/profile/setting'} className={styles.profileUserPage__settingButton}>
        <GearIcon className={styles.profileUserPage__settingButton__svg} />
        <span>Настройки</span>
      </Link>

      <div className={styles.profileUserPage__profile}>
        <div className={styles.profileUserPage__profile__container}>
          <img
            loading="lazy"
            className={styles.profileUserPage__profile__container__img}
            src={'image' in users ? users.image : undefined}
          />

          <Link to={'/profile/setting'}>
            <div className={styles.profileUserPage__profile__container__svg}>
              <PencilIcon className={styles.profileUserPage__profile__container__svg__setting} />
            </div>
          </Link>
        </div>

        <div className={styles.profileUserPage__profile__info}>
          <span className={styles.profileUserPage__profile__info__name}>
            {'name' in users ? users.name : undefined}
          </span>
          <span>Член сообщества</span>
        </div>
      </div>

      {visibleBook === null && (
        <>
          <div className={styles.profileUserPage__buttons}>
            <IconActive
              handleClick={() => {
                handleBack();
                setChapter('cookbooks');
              }}
              className={`${styles.profileUserPage__buttons__button} ${
                chapter === 'cookbooks' ? styles.active : ''
              }`}
              svg={<Bookmark active={true} color={'rgba(247, 147, 30, 1)'} />}
              text="Кулинарные книги"
            />

            <IconActive
              handleClick={() => {
                handleBack();
                setChapter('shoppingList');
              }}
              className={`${styles.profileUserPage__buttons__button} ${
                chapter === 'shoppingList' ? styles.active : ''
              }`}
              svg={<TaskIcon />}
              text="Список покупок"
            />

            <IconActive
              handleClick={() => {
                handleBack();
                setChapter('like');
              }}
              className={`${styles.profileUserPage__buttons__button} ${
                chapter === 'like' ? styles.active : ''
              }`}
              svg={<LikeIcon active={true} color={'rgba(247, 147, 30, 1)'} />}
              text="Нравится"
            />
          </div>

          <div className={styles.profileUserPage__line}></div>

          {chapter === 'like' && <LikeSection />}

          {chapter === 'cookbooks' && (
            <Cookbooks createBook={createBookFunction} handleClick={selectBook} />
          )}

          {chapter === 'shoppingList' && shopListId === null && (
            <ShoppingList handleclick={selectShoppinglist} />
          )}
        </>
      )}

      {visibleBook !== null && catalog.length > 0 && (
        <>
          <SectionCards ogrinicator={true} heading={visibleBook.name} foods={catalog} />

          <DefaultButton
            handleClick={() => setVisibleBook(null)}
            className={styles.profileUserPage__sectionCards__button}
            text="Вернуться назад"
          />
        </>
      )}

      {shopListData?.recipe && (
        <ShoppingListItem
          handleBack={handleBack}
          data={{
            ...shopListData,
            recipe: shopListData.recipe,
          }}
        />
      )}

      {visibleBook !== null && catalog.length === 0 && (
        <div className={styles.profileUserPage__sectionCards__empty}>
          <span className={styles.profileUserPage__sectionCards__empty__text}>
            Тут пока пусто Пора добавить что-то
          </span>

          <Link style={{ width: '100%' }} to={'/catalog'}>
            <DefaultButton
              className={styles.profileUserPage__sectionCards__empty__button}
              text="В каталог"
            />
          </Link>

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
