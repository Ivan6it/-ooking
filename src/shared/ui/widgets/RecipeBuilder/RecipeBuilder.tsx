import styles from './RecipeBuilder.module.css';
import { useState } from 'react';
import {
  QuestionIcon,
  EllipseNumberIcon,
  ExclamationMarkIcon,
  MilkIcon,
  PlusIcon,
  EggIcon,
  PorkIcon,
  FishIcon,
  WineIcon,
  OnionIcon,
} from '@/shared/ui/icons';
import { SearchBar } from '../../SearchBar';
import { IconActive } from '../../iconActive';
import { DefaultButton } from '../../buttons/defaultButton';

export function RecipeBuilder() {
  const [ingredients, setIngredients] = useState([]);
  const [timer, setTimer] = useState(0);
  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setTimer(newValue);
    e.target.style.setProperty('--fill', `${(newValue / 100) * 100}%`);
  };
  const timeRanges = [
    { label: 'ДО 20\nМИНУТ', min: 0, max: 20 },
    { label: 'ДО 30\nМИНУТ', min: 20, max: 34 },
    { label: 'ДО 60\nМИНУТ', min: 35, max: 67 },
    { label: 'БОЛЕЕ 1\nЧАСА', min: 68, max: 100 },
  ];
  const activeIndex = timeRanges.findIndex((range) => timer >= range.min && timer < range.max);
  return (
    <div className={styles.recipeBuilder}>
      <div className={styles.recipeBuilder__header}>
        <h1 className={styles.recipeBuilder__header__heading}>Конструктор рецептов</h1>
        <p className={styles.recipeBuilder__header__text}>
          Выберите продукты, которые есть в вашем холодильнике. "Конструктор рецептов" подберёт
          рецепты на основе ваших ингредиентов. Максимальное количество продуктов 7.
        </p>
      </div>
      <div className={styles.recipeBuilder__products__container}>
        <div className={styles.recipeBuilder__products}>
          <h2 className={styles.recipeBuilder__products__heading}>Введите имеющиеся продукты:</h2>
          <div className={styles.recipeBuilder__products__section}>
            {ingredients && <div>{}</div>}
            <div className={styles.recipeBuilder__products__section__button}>
              <PlusIcon />
              <p className={styles.recipeBuilder__products__section__button__text}>Ингредиент</p>
            </div>
            <SearchBar
              className={styles.recipeBuilder__products__section__input}
              placeholder="Введите ингредиент"
            />
          </div>
        </div>
        <div className={styles.recipeBuilder__timer}>
          <h2 className={styles.recipeBuilder__timer__heading}>Время приготовления:</h2>
          <input
            type="range"
            min="0"
            max="100"
            step="33.33"
            value={timer}
            onChange={handleRangeChange}
            style={{ '--fill': `${(timer / 100) * 100}%` } as React.CSSProperties}
          />
          <div className={styles.recipeBuilder__timer__points}>
            {timeRanges.map((range, index) => (
              <span
                key={index}
                className={`${styles.recipeBuilder__timer__point} ${index === activeIndex ? styles.active : ''}`}>
                {range.label}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.recipeBuilder__container__dop}>
        <div className={styles.recipeBuilder__container__dop__ingredients}>
          <h2 className={styles.recipeBuilder__container__dop__ingredients__heading}>
            Включить в рецепт дополнительные <br />
            ингредиенты?
          </h2>
          <IconActive
            className={styles.recipeBuilder__container__dop__ingredients__button}
            svg={<QuestionIcon />}
          />
          <div className={styles.recipeBuilder__container__dop__ingredients__numberButtons}>
            <IconActive
              className={styles.recipeBuilder__container__dop__ingredients__number}
              svg={<EllipseNumberIcon number={1} />}
            />
            <IconActive
              className={styles.recipeBuilder__container__dop__ingredients__number}
              svg={<EllipseNumberIcon number={2} />}
            />
            <IconActive
              className={styles.recipeBuilder__container__dop__ingredients__number}
              svg={<EllipseNumberIcon number={3} />}
            />
            <IconActive
              className={styles.recipeBuilder__container__dop__ingredients__number}
              svg={<EllipseNumberIcon number={4} />}
            />
            <IconActive
              className={styles.recipeBuilder__container__dop__ingredients__number}
              svg={<EllipseNumberIcon number={5} />}
            />
          </div>
          <div className={styles.recipeBuilder__container__dop__ingredients__info}>
            <ExclamationMarkIcon />
            <p className={styles.recipeBuilder__container__dop__ingredients__info__text}>
              Специи, соусы, сиропы и зелень не <br />
              являются основными ингредиентами
            </p>
          </div>
        </div>
        <div className={styles.recipeBuilder__container__dop__ingredients__products}>
          <h2 className={styles.recipeBuilder__container__dop__ingredients__products__heading}>
            Исключить из рецепта:
          </h2>
          <div className={styles.recipeBuilder__container__dop__ingredients__products__filters}>
            <IconActive
              className={styles.recipeBuilder__container__dop__ingredients__products__filters__icon}
              svg={<MilkIcon />}
              text="Молоко"
              classNameText={
                styles.recipeBuilder__container__dop__ingredients__products__filters__text
              }
            />
            <IconActive
              className={styles.recipeBuilder__container__dop__ingredients__products__filters__icon}
              svg={<EggIcon />}
              text="Яйца"
              classNameText={
                styles.recipeBuilder__container__dop__ingredients__products__filters__text
              }
            />
            <IconActive
              className={styles.recipeBuilder__container__dop__ingredients__products__filters__icon}
              svg={<OnionIcon />}
              text="Лук"
              classNameText={
                styles.recipeBuilder__container__dop__ingredients__products__filters__text
              }
            />
            <IconActive
              className={styles.recipeBuilder__container__dop__ingredients__products__filters__icon}
              svg={<PorkIcon />}
              text="Свинина"
              classNameText={
                styles.recipeBuilder__container__dop__ingredients__products__filters__text
              }
            />
            <IconActive
              className={styles.recipeBuilder__container__dop__ingredients__products__filters__icon}
              svg={<FishIcon />}
              text="Рыба"
              classNameText={
                styles.recipeBuilder__container__dop__ingredients__products__filters__text
              }
            />
            <IconActive
              className={styles.recipeBuilder__container__dop__ingredients__products__filters__icon}
              svg={<WineIcon />}
              text="Алкоголь"
              classNameText={
                styles.recipeBuilder__container__dop__ingredients__products__filters__text
              }
            />
          </div>
        </div>
      </div>
      <div className={styles.recipeBuilder__buttons}>
        <DefaultButton className={styles.recipeBuilder__buttons__button} text={'Применить'} />
        <DefaultButton
          className={`${styles.recipeBuilder__buttons__button} ${styles.recipeBuilder__buttons__button__spec}`}
          text={'Очистить всё'}
        />
      </div>
    </div>
  );
}
