import styles from './DirectorySectionItemPage.module.css';
import directorySection from '@/data/directorySection.json';
import { SectionCards } from '@/shared/ui/widgets/SectionCards';
import { getGenitive } from '@/utils/russian';
import { Comments } from '@/shared/ui/widgets/Comments';
import { Mailing } from '@/shared/ui/widgets/Mailing';

export function DirectorySectionItemPage() {
  return (
    <div className={styles.directorySectionItemPage}>
      <span className={styles.directorySectionItemPage__text}>
        Справочник / {directorySection[0].name} /{' '}
        <span>{directorySection[0].products[0].name}</span>
      </span>
      <div className={styles.directorySectionItemPage__container}>
        <img
          className={styles.directorySectionItemPage__container__img}
          src={directorySection[0].products[0].img}
        />
        <div className={styles.directorySectionItemPage__container__description}>
          <h2 className={styles.directorySectionItemPage__container__description__heading}>
            {directorySection[0].products[0].name}
          </h2>
          <div className={styles.directorySectionItemPage__container__description__container}>
            <span
              className={styles.directorySectionItemPage__container__description__container__text}>
              Пищевая ценность на порцию:
            </span>
            <div
              className={
                styles.directorySectionItemPage__container__description__container__structure
              }>
              <div
                className={
                  styles.directorySectionItemPage__container__description__container__structure__energy
                }>
                <span>Энергия</span>
                <span>{directorySection[0].products[0].calorieContent}</span>
              </div>
              <div
                className={
                  styles.directorySectionItemPage__container__description__container__structure__protein
                }>
                <span>Белки</span>
                <span>{directorySection[0].products[0].protein}</span>
              </div>
              <div
                className={
                  styles.directorySectionItemPage__container__description__container__structure__fats
                }>
                <span>Жиры</span>
                <span>{directorySection[0].products[0].fats}</span>
              </div>
              <div
                className={
                  styles.directorySectionItemPage__container__description__container__structure__carbohydrates
                }>
                <span>Углеводы</span>
                <span>{directorySection[0].products[0].carbohydrates}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p>{directorySection[0].products[0].description}</p>
      <h3 className={styles.directorySectionItemPage__heading}>Полезные свойства</h3>
      <p>{directorySection[0].products[0].benefit}</p>
      <h4 className={styles.directorySectionItemPage__heading}>Применения</h4>
      <p>{directorySection[0].products[0].application}</p>
      <SectionCards
        className={styles.directorySectionItemPage__cards}
        ogrinicator={'none'}
        heading={`Рецепты из ${getGenitive(directorySection[0].products[0].name)}`}
      />
      <Comments
        className={styles.directorySectionItemPage__coments}
        comments={directorySection[0].products[0].comments || []}
      />
      <Mailing />
    </div>
  );
}
