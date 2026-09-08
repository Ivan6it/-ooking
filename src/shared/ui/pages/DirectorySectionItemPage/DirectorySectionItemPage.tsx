import styles from './DirectorySectionItemPage.module.css';
import { SectionCards } from '@/shared/ui/widgets/SectionCards';
import { getGenitive } from '@/utils/russian';
import { Comments } from '@/shared/ui/widgets/Comments';
import { Mailing } from '@/shared/ui/widgets/Mailing';
import { useParams, Link } from 'react-router-dom';
import { NotFoundPage } from '../NotFoundPage';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import type { FoodsState } from '@/store/foodsListSlice';
import type { DirectorySectionData } from '@/types/directorySection';
import { useState, useEffect } from 'react';

export default function DirectorySectionItemPage() {
  const [directorySection, setDirectorySection] = useState<DirectorySectionData[]>([]);
  const { sectionName, itemId } = useParams();
  const { foods }: FoodsState = useSelector<RootState, FoodsState>((state) => state.foodsList);

  useEffect(() => {
    const loadData = async () => {
      const res = await fetch('/api/directorySection');
      if (!res.ok) {
        throw new Error('Failed to fetch directorySection');
      }
      const data = await res.json();
      setDirectorySection(data);
    };
    loadData();
  }, []);

  const currentSection = directorySection.filter((item) => item.id === sectionName)[0];
  const currentSectionItem = currentSection?.products?.filter((item) => item.id === itemId)[0];
  if (!currentSectionItem) {
    return <NotFoundPage />;
  }

  return (
    <div className={styles.directorySectionItemPage}>
      <span className={styles.directorySectionItemPage__text}>
        <Link className={styles.directorySectionItemPage__text__link} to={`/guide`}>
          Справочник
        </Link>
        &nbsp;/{' '}
        <Link className={styles.directorySectionItemPage__text__link} to={`/guide/${sectionName}`}>
          {currentSection.name}
        </Link>{' '}
        / <span>{currentSectionItem.name}</span>
      </span>
      <div className={styles.directorySectionItemPage__container}>
        <img
          loading="lazy"
          className={styles.directorySectionItemPage__container__img}
          src={currentSectionItem.img}
        />
        <div className={styles.directorySectionItemPage__container__description}>
          <h2 className={styles.directorySectionItemPage__container__description__heading}>
            {currentSectionItem.name}
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
                <span>{currentSectionItem.calorieContent}</span>
              </div>
              <div
                className={
                  styles.directorySectionItemPage__container__description__container__structure__protein
                }>
                <span>Белки</span>
                <span>{currentSectionItem.protein}</span>
              </div>
              <div
                className={
                  styles.directorySectionItemPage__container__description__container__structure__fats
                }>
                <span>Жиры</span>
                <span>{currentSectionItem.fats}</span>
              </div>
              <div
                className={
                  styles.directorySectionItemPage__container__description__container__structure__carbohydrates
                }>
                <span>Углеводы</span>
                <span>{currentSectionItem.carbohydrates}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p>{currentSectionItem.description}</p>
      <h3 className={styles.directorySectionItemPage__heading}>Полезные свойства</h3>
      <p>{currentSectionItem.benefit}</p>
      <h4 className={styles.directorySectionItemPage__heading}>Применения</h4>
      <p>{currentSectionItem.application}</p>
      <SectionCards
        foods={foods}
        className={styles.directorySectionItemPage__cards}
        ogrinicator={'none'}
        heading={`Рецепты из ${getGenitive(currentSectionItem.name)}`}
      />
      <Comments
        className={styles.directorySectionItemPage__coments}
        comments={currentSectionItem.comments || []}
      />
      <Mailing />
    </div>
  );
}
