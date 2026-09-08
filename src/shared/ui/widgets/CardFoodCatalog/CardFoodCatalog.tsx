import { IconActive } from '@/shared/ui/iconActive';
import { Bookmark, LikeIcon } from '@/shared/ui/icons';
import styles from './CardFoodCatalog.module.css';
import { useState } from 'react';
import { AddRecipeInBookModal } from '@/shared/ui/widgets/AddRecipeInBookModal';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openAuthModal, updateUser } from '@/store/userSlice';
import type { AppDispatch } from '@/store';

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

  const userState = useSelector((state: any) => state.user.userData.id);
  const hasData = !!userState;

  const isLikedData = useSelector((state: any) => state.user.userData.liked);
  const isLiked = isLikedData.find((i: number) => i === id);
  function clickLike(e: React.MouseEvent) {
    e.stopPropagation();
    if (!hasData) {
      dispatch(openAuthModal());
    } else {
      const newLiked = isLiked ? isLikedData.filter((i: number) => i !== id) : [...isLikedData, id];
      dispatch(updateUser({ userData: { id: userState, liked: newLiked } }));
    }
  }

  function clickMarkBook(e: React.MouseEvent) {
    e.stopPropagation();
    if (!hasData) {
      dispatch(openAuthModal());
    } else {
      // Надо сделать запрос на сервер и добавить в избранное
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
              svg={<Bookmark color="rgba(255, 255, 255, 1)" />}
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
          imgAlt={imgAlt}
          img={img}
          name={name}
          closeModal={() => setAddMarkBook((prev) => !prev)}
        />
      )}
    </>
  );
}
