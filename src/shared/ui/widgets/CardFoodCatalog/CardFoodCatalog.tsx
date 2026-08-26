import { IconActive } from '@/shared/ui/iconActive';
import { Bookmark, LikeIcon } from '@/shared/ui/icons';
import styles from './CardFoodCatalog.module.css';
import { useState } from 'react';
import { AddRecipeInBookModal } from '@/shared/ui/widgets/AddRecipeInBookModal';
import { Link } from 'react-router-dom';

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
  return (
    <Link
      style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
      to={`/catalog/${id}`}>
      <article className={styles.cardFood}>
        <div className={styles.cardFood__cardBlock}>
          <div className={styles.cardFood__cardBlock__overlay}></div>
          <img
            loading="lazy"
            className={styles.cardFood__cardBlock__img}
            alt={imgAlt}
            src={img}></img>
          <div className={styles.cardFood__cardBlock__bookMark}>
            <IconActive
              handleClick={() => setAddMarkBook((prev) => !prev)}
              className={styles.iconActive}
              svg={<Bookmark color="rgba(255, 255, 255, 1)" />}
            />
          </div>
          <div className={styles.cardFood__cardBlock__like}>
            <IconActive
              className={styles.iconActive}
              svg={<LikeIcon color="rgba(255, 255, 255, 1)" />}
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
    </Link>
  );
}
