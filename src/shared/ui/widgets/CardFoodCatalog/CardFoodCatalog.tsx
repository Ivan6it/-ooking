import { IconActive } from '@/shared/ui/iconActive';
import { Bookmark, LikeIcon } from '@/shared/ui/icons';
import styles from './CardFoodCatalog.module.css';
type CardFoodCatalogProps = {
  name: string;
  quantityLike: number;
  img: string;
  imgAlt: string;
  time: number;
};

export function CardFoodCatalog({ quantityLike, img, imgAlt, time, name }: CardFoodCatalogProps) {
  return (
    <article className={styles.cardFood}>
      <div className={styles.cardFood__cardBlock}>
        <div className={styles.cardFood__cardBlock__overlay}></div>
        <img className={styles.cardFood__cardBlock__img} alt={imgAlt} src={img}></img>
        <div className={styles.cardFood__cardBlock__bookMark}>
          <IconActive
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
  );
}
