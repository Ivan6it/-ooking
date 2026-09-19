import { IconActive } from '@/shared/ui/iconActive';
import { Bookmark, LikeIcon } from '@/shared/ui/icons';
import styles from './CardFoodCatalog.module.css';
import { useState } from 'react';
import { AddRecipeInBookModal } from '@/shared/ui/widgets/AddRecipeInBookModal';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openAuthModal, updateUser } from '@/store/userSlice';
import type { AppDispatch, RootState } from '@/store';
import { updateFood } from '@/store/foodsListSlice';
import type { Cookbook } from '@/types/users';

type CardFoodCatalogProps = {
  name: string;
  quantityLike: number;
  img: string;
  imgAlt: string;
  time: number;
  id: number;
};

export function CardFoodCatalog({
  id,
  quantityLike,
  img,
  imgAlt,
  time,
  name,
}: CardFoodCatalogProps) {
  const [addMarkBook, setAddMarkBook] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const userState = useSelector((state: RootState) =>
    'id' in state.user.userData ? state.user.userData.id : undefined,
  );
  const hasData = !!userState;

  const favorites = useSelector((state: RootState) =>
    'cookbooks' in state.user.userData ? state.user.userData.cookbooks : undefined,
  );
  const recipeFavorites =
    favorites?.some((item: Cookbook) => item.recipes.some((i: number) => i === id)) ?? false;

  const isLikedData = useSelector((state: RootState) =>
    'liked' in state.user.userData ? state.user.userData.liked : undefined,
  );
  const isLiked = isLikedData?.some((i: number) => i === id) ?? false;
  function clickLike(e: React.MouseEvent) {
    e.stopPropagation();
    if (!hasData) {
      dispatch(openAuthModal());
    } else {
      const newLiked = isLiked
        ? isLikedData
          ? isLikedData.filter((i: number) => i !== id)
          : []
        : [...(isLikedData ? isLikedData : []), id];
      dispatch(updateUser({ userData: { id: userState, liked: newLiked } }));
      dispatch(updateFood({ id: id, likes: isLiked ? quantityLike - 1 : quantityLike + 1 }));
    }
  }

  function removeFavorite() {
    if (!userState) {
      return;
    }
    const newCookbook = favorites
      ? favorites.map((item: Cookbook) => ({
          ...item,
          recipes: item.recipes.filter((i: number) => i !== id),
        }))
      : [];
    dispatch(
      updateUser({
        userData: {
          id: userState,
          cookbooks: newCookbook,
        },
      }),
    );
  }

  function clickMarkBook(e: React.MouseEvent) {
    e.stopPropagation();
    if (!hasData) {
      dispatch(openAuthModal());
    } else {
      if (recipeFavorites) {
        removeFavorite();
      } else {
        setAddMarkBook(true);
      }
    }
  }

  const handleCardClick = () => {
    navigate(`/catalog/${id}`);
  };

  return (
    <>
      <article
        onClick={handleCardClick}
        className={styles.cardFood}
        style={{ pointerEvents: 'auto' }}>
        <div className={styles.cardFood__cardBlock}>
          <div className={styles.cardFood__cardBlock__overlay}></div>
          <img
            loading="lazy"
            className={styles.cardFood__cardBlock__img}
            alt={imgAlt}
            src={img}></img>
          <div className={styles.cardFood__cardBlock__bookMark}>
            <IconActive
              handleClick={(e) => clickMarkBook(e)}
              className={styles.iconActive}
              svg={<Bookmark active={recipeFavorites} color="rgba(255, 255, 255, 1)" />}
            />
          </div>
          <div className={styles.cardFood__cardBlock__like}>
            <IconActive
              className={styles.iconActive}
              handleClick={(e) => clickLike(e)}
              svg={<LikeIcon active={isLiked} color="rgba(255, 255, 255, 1)" />}
            />
            <span>{quantityLike}</span>
          </div>
          <div className={styles.cardFood__cardBlock__time}>
            <span>{time} мин</span>
          </div>
        </div>
        <p className={styles.cardFood__name}>{name}</p>
      </article>
      {addMarkBook && (
        <AddRecipeInBookModal
          idRecipe={id}
          imgAlt={imgAlt}
          img={img}
          name={name}
          closeModal={() => setAddMarkBook((prev) => !prev)}
        />
      )}
    </>
  );
}
