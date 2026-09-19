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
import { useSelector } from 'react-redux';
import type { FoodsState } from '@/store/foodsListSlice';
import type { RootState } from '@/store';
import type { Food } from '@/types/foods';

interface Ingredient {
  name: string;
}

type RecipeBuilderProps = {
  setGenerateRecipes(value: Food[] | null): void;
};

export function RecipeBuilder({ setGenerateRecipes }: RecipeBuilderProps) {
  const [ingredientsData, setIngredientsData] = useState<Ingredient[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [productsInStock, setProductsInStock] = useState<string[]>([]);
  const [productsInStockText, setProductsInStockText] = useState('');
  const [productsInStockInputVisible, setProductsInStockInputVisible] = useState(false);
  const [additionalIngredients, setAdditionalIngredients] = useState<null | number>(null);
  const [deleteIngredients, setDeleteIngredients] = useState<string[]>([]);
  const [visibleHint, setVisibleHint] = useState(false);
  const [timer, setTimer] = useState(12.5);
  const { foods }: FoodsState = useSelector<RootState, FoodsState>((state) => state.foodsList);
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
    setTimer(Number(e.target.value));
  };

  useEffect(() => {
    const input = document.querySelector('input[type="range"]') as HTMLInputElement | null;

    if (!input) return;

    function shift(time: number, width: number) {
      if (time === 37.5) {
        return (width * 4) / 100;
      } else if (time === 12.5) {
        return (width * 11) / 100;
      } else if (time === 62.5) {
        return -(width * 4) / 100;
      } else {
        return -(width * 11) / 100;
      }
    }

    const update = () => {
      const width = input.getBoundingClientRect().width;

      input.style.setProperty('--fill', `${timer}%`);
      input.style.setProperty('--shift', `${shift(timer, width)}px`);
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(input);

    return () => observer.disconnect();
  }, [timer]);

  const timeRanges = [
    { label: 'ДО 20\nМИНУТ', min: 0, max: 30 },
    { label: 'ДО 30\nМИНУТ', min: 31, max: 40 },
    { label: 'ДО 60\nМИНУТ', min: 41, max: 65 },
    { label: 'БОЛЕЕ 1\nЧАСА', min: 66, max: 100 },
  ];
  const products = [
    { svg: MilkIcon, text: 'Молоко', id: 'containsMilk' },
    { svg: EggIcon, text: 'Яйца', id: 'containsEgg' },
    { svg: OnionIcon, text: 'Лук', id: 'containsOnion' },
    { svg: PorkIcon, text: 'Свинина', id: 'containsPork' },
    { svg: FishIcon, text: 'Рыба', id: 'containsSeafood' },
    { svg: WineIcon, text: 'Алкоголь', id: 'containsAlcohol' },
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

  function createRecipes() {
    setGenerateRecipes(null);
    const recipes = [...foods];
    const recipesFilter =
      deleteIngredients.length > 0
        ? recipes.filter((item) => !item.productTags.some((i) => deleteIngredients.includes(i)))
        : recipes;
    const time =
      timer === 12.5 ? 'low' : timer === 37.5 ? 'normal' : timer === 62.5 ? 'medium' : 'hard';
    const recipesFilterTime = recipesFilter.filter((item) => {
      if (time === 'low') {
        return item.prepTime <= 20;
      } else if (time === 'normal') {
        return item.prepTime <= 30;
      } else if (time === 'medium') {
        return item.prepTime <= 60;
      } else {
        return item.prepTime > 61;
      }
    });
    const recipesFilterAdditional =
      additionalIngredients !== null
        ? recipesFilterTime.filter(
            (item) => item.additionalIngredients.length <= additionalIngredients,
          )
        : recipesFilterTime;
    const recipesFilterProducts =
      productsInStock.length > 0
        ? recipesFilterAdditional.map((item) => {
            let score = 0;
            item.ingredients.some((i) => {
              if (productsInStock.includes(Object.keys(i)[0])) {
                score++;
              }
            });
            return [item, score];
          })
        : recipesFilterAdditional;
    const preResult =
      productsInStock.length > 0
        ? recipesFilterProducts.sort((a, b) => {
            const arrA = a as unknown as [Food, number];
            const arrB = b as unknown as [Food, number];
            return arrB[1] - arrA[1];
          })
        : recipesFilterProducts;
    const result =
      productsInStock.length > 0 ? preResult.map((item) => (item as [Food, number])[0]) : preResult;
    setGenerateRecipes(result as Food[]);
  }

  function handleReset() {
    setGenerateRecipes(null);
    setDeleteIngredients([]);
    setTimer(12.5);
    setAdditionalIngredients(null);
    setIngredients([]);
    setProductsInStockText('');
    setProductsInStock([]);
    setProductsInStockInputVisible(false);
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
              {productsInStockText.trim().length > 0 && ingredients.length === 0 && (
                <p className={styles.header__nav__search__notSearch}>Ничего не найдено</p>
              )}
            </div>
          )}
        </div>
        <div className={styles.recipeBuilder__timer}>
          <h2 className={styles.recipeBuilder__timer__heading}>Время приготовления:</h2>
          <input
            type="range"
            min="12.5"
            max="87.5"
            step="25"
            value={timer}
            onChange={handleRangeChange}
            style={{ '--fill': `${timer}%` } as React.CSSProperties}
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
                    if (deleteIngredients.includes(item.id)) {
                      setDeleteIngredients((prev) => prev.filter((i) => i !== item.id));
                    } else {
                      setDeleteIngredients((prev) => [...prev, item.id]);
                    }
                  } else {
                    setDeleteIngredients((prev) => [...prev, item.id]);
                  }
                }}
                className={
                  styles.recipeBuilder__container__dop__ingredients__products__filters__icon
                }
                svg={<item.svg active={!deleteIngredients.includes(item.id)} />}
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
        <DefaultButton
          handleClick={() => {
            createRecipes();
          }}
          className={styles.recipeBuilder__buttons__button}
          text={'Применить'}
        />
        <DefaultButton
          className={`${styles.recipeBuilder__buttons__button} ${styles.recipeBuilder__buttons__button__spec}`}
          text={'Очистить всё'}
          handleClick={() => handleReset()}
        />
      </div>
    </div>
  );
}
