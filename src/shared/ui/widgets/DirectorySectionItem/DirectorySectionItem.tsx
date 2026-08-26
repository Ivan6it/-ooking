import styles from './DirectorySectionItem.module.css';
import type { DirectoryProduct } from '@/data/directorySection.json';
import { DefaultButton } from '@/shared/ui/buttons/defaultButton';
import { Link } from 'react-router-dom';

export interface DirectorySectionItemProps {
  data: DirectoryProduct;
  sectionName: string;
}

export function DirectorySectionItem({ data, sectionName }: DirectorySectionItemProps) {
  return (
    <article className={styles.directorySectionItem}>
      <div className={styles.directorySectionItem__section}>
        <img loading="lazy" className={styles.directorySectionItem__img} src={data.img} />
        <div className={styles.directorySectionItem__section__container}>
          <h3 className={styles.directorySectionItem__heading}>{data.name}</h3>
        </div>
      </div>
      <div className={styles.directorySectionItem__section__details}>
        <span>Калорийность на 100 гр.: {data.calorieContent}</span>
        <span>Белки: {data.protein}</span>
        <span>Жиры: {data.fats}</span>
        <span>Углеводы: {data.carbohydrates}</span>
        <Link
          style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
          to={`/guide/${sectionName}/${data.id}`}>
          <DefaultButton className={styles.directorySectionItem__button} text="Посмотреть" />
        </Link>
      </div>
    </article>
  );
}
