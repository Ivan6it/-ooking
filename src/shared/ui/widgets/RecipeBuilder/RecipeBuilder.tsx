import styles from './RecipeBuilder.module.css';
import { useState, useEffect } from 'react';
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
  CrossIcon,
} from '@/shared/ui/icons';
import { SearchBar } from '../../SearchBar';
import { IconActive } from '../../iconActive';
import { DefaultButton } from '../../buttons/defaultButton';

interface Ingredient {
  name: string;
}

export function RecipeBuilder() {
  const [ingredientsData, setIngredientsData] = useState<Ingredient[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [productsInStock, setProductsInStock] = useState<string[]>([]);
  const [productsInStockText, setProductsInStockText] = useState('');
  const [productsInStockInputVisible, setProductsInStockInputVisible] = useState(false);
  const [additionalIngredients, setAdditionalIngredients] = useState<null | number>(null);
  const [deleteIngredients, setDeleteIngredients] = useState<string[]>([]);
  const [visibleHint, setVisibleHint] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const res = await fetch('/api/ingredients');
      if (!res.ok) {
        throw new Error('Failed to fetch ingredients');
      }
      const data = await res.json();
      setIngredientsData(data);
    };
    loadData();
  }, []);

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
  const products = [
    { svg: MilkIcon, text: 'Молоко' },
    { svg: EggIcon, text: 'Яйца' },
    { svg: OnionIcon, text: 'Лук' },
    { svg: PorkIcon, text: 'Свинина' },
    { svg: FishIcon, text: 'Рыба' },
    { svg: WineIcon, text: 'Алкоголь' },
  ];
  const activeIndex = timeRanges.findIndex((range) => timer >= range.min && timer < range.max);
  const ingredientsList = ingredientsData?.filter((item) => !productsInStock.includes(item.name));

  function handleSearch(e: string) {
    setProductsInStockText(e);
    if (!e.trim() && ingredients.length === 0) {
      setIngredients([]);
      return;
    }
    setIngredients([]);
    const searchTerm = e.trim().toLowerCase();
    const regex = new RegExp(searchTerm, 'i');
    for (let i = 0; i < ingredientsList.length; i++) {
      if (regex.test(ingredientsList[i].name)) {
        setIngredients((prevOptions) => [...prevOptions, ingredientsList[i].name]);
      }
    }
  }

  function clearSearch() {
    setIngredients([]);
    setProductsInStockText('');
  }

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
            {productsInStock.length > 0 && (
              <ul className={styles.recipeBuilder__products__section__list}>
                {productsInStock.map((item, index) => (
                  <li key={index} className={styles.recipeBuilder__products__section__list__item}>
                    <span>{item}</span>
                    <IconActive
                      handleClick={() =>
                        setProductsInStock((prev) => prev.filter((i) => i !== item))
                      }
                      svg={<CrossIcon color={'rgba(255, 255, 255, 1)'} size={14} />}
                    />
                  </li>
                ))}
              </ul>
            )}
            <div className={styles.recipeBuilder__products__section__button}>
              <IconActive
                className={styles.recipeBuilder__products__section__button__container}
                text="Ингредиент"
                classNameText={styles.recipeBuilder__products__section__button__text}
                handleClick={() => {
                  setProductsInStockInputVisible((prev) => !prev);
                  clearSearch();
                }}
                svg={<PlusIcon />}
              />
            </div>
          </div>
          {productsInStockInputVisible && (
            <div className={styles.recipeBuilder__products__section__container}>
              <SearchBar
                value={productsInStockText}
                onChange={handleSearch}
                className={styles.recipeBuilder__products__section__input}
                placeholder="Введите ингредиент"
              />
              {productsInStockText.trim().length > 0 && ingredients.length > 0 && (
                <ul className={styles.recipeBuilder__products__list}>
                  {ingredients.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        if (productsInStock.length < 7) {
                          setProductsInStock((prev) => [...prev, item]);
                          clearSearch();
                        }
                      }}
                      className={styles.recipeBuilder__products__list__item}>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
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
            handleClick={() => setVisibleHint((prev) => !prev)}
            className={styles.recipeBuilder__container__dop__ingredients__button}
            svg={<QuestionIcon />}
          />
          <div className={styles.recipeBuilder__container__dop__ingredients__numberButtons}>
            <IconActive
              handleClick={() =>
                additionalIngredients === 1
                  ? setAdditionalIngredients(null)
                  : setAdditionalIngredients(1)
              }
              className={styles.recipeBuilder__container__dop__ingredients__number}
              svg={<EllipseNumberIcon active={additionalIngredients === 1} number={1} />}
            />
            <IconActive
              handleClick={() =>
                additionalIngredients === 2
                  ? setAdditionalIngredients(null)
                  : setAdditionalIngredients(2)
              }
              className={styles.recipeBuilder__container__dop__ingredients__number}
              svg={<EllipseNumberIcon active={additionalIngredients === 2} number={2} />}
            />
            <IconActive
              handleClick={() =>
                additionalIngredients === 3
                  ? setAdditionalIngredients(null)
                  : setAdditionalIngredients(3)
              }
              className={styles.recipeBuilder__container__dop__ingredients__number}
              svg={<EllipseNumberIcon active={additionalIngredients === 3} number={3} />}
            />
            <IconActive
              handleClick={() =>
                additionalIngredients === 4
                  ? setAdditionalIngredients(null)
                  : setAdditionalIngredients(4)
              }
              className={styles.recipeBuilder__container__dop__ingredients__number}
              svg={<EllipseNumberIcon active={additionalIngredients === 4} number={4} />}
            />
            <IconActive
              handleClick={() =>
                additionalIngredients === 5
                  ? setAdditionalIngredients(null)
                  : setAdditionalIngredients(5)
              }
              className={styles.recipeBuilder__container__dop__ingredients__number}
              svg={<EllipseNumberIcon active={additionalIngredients === 5} number={5} />}
            />
          </div>
          {visibleHint && (
            <div className={styles.recipeBuilder__container__dop__ingredients__info}>
              <ExclamationMarkIcon />
              <p className={styles.recipeBuilder__container__dop__ingredients__info__text}>
                Специи, соусы, сиропы и зелень не <br />
                являются основными ингредиентами
              </p>
            </div>
          )}
        </div>
        <div className={styles.recipeBuilder__container__dop__ingredients__products}>
          <h2 className={styles.recipeBuilder__container__dop__ingredients__products__heading}>
            Исключить из рецепта:
          </h2>
          <div className={styles.recipeBuilder__container__dop__ingredients__products__filters}>
            {products.map((item, index) => (
              <IconActive
                key={index}
                handleClick={() => {
                  if (deleteIngredients.length > 0) {
                    if (deleteIngredients.includes(item.text)) {
                      setDeleteIngredients((prev) => prev.filter((i) => i !== item.text));
                    } else {
                      setDeleteIngredients((prev) => [...prev, item.text]);
                    }
                  } else {
                    setDeleteIngredients((prev) => [...prev, item.text]);
                  }
                }}
                className={
                  styles.recipeBuilder__container__dop__ingredients__products__filters__icon
                }
                svg={<item.svg active={!deleteIngredients.includes(item.text)} />}
                text={item.text}
                classNameText={
                  styles.recipeBuilder__container__dop__ingredients__products__filters__text
                }
              />
            ))}
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
