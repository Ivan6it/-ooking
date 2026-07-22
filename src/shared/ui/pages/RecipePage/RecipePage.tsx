import styles from './RecipePage.module.css';
import foods from '@/data/foods.json';
import addIngrenients from '@/data/additionalIngredients.json';
import { RecipeStep } from '@/shared/ui/widgets/RecipeStep';
import {
  PepperIcon,
  LikeIcon,
  ComplexityIcon,
  EyeIcon,
  StarIcon,
  ShareIcon,
  Bookmark,
  ExclamationMarkIcon,
  VKIcon,
  OKIcon,
  TGIcon,
  WhatsappIcon,
} from '@/shared/ui/icons';
import { IconActive } from '@/shared/ui/iconActive';
import { TagInTheRecipe } from '@/shared/ui/tagInTheRecipe';
import { AdditionalIngredientsItem } from '@/shared/ui/AdditionalIngredientsItem';
import { DefaultButton } from '@/shared/ui/buttons/defaultButton';
import { useState } from 'react';
import { ShopList } from '@/shared/ui/widgets/ShopList';
import { IconLink } from '../../iconLinks/iconLink';
import { SectionCards } from '@/shared/ui/widgets/SectionCards';
import { Comments } from '@/shared/ui/widgets/Comments';
import { Mailing } from '../../widgets/Mailing';

type JsonIngredient = {
  step: number[];
  [name: string]: string | number[];
};

type AdditionalIngredientData = {
  img: string;
  description: string;
  url: string;
};

type AdditionalIngredients = Record<string, AdditionalIngredientData>;

export function RecipePage() {
  const [isVisible, setIsVisible] = useState('none');
  const [stars, setStars] = useState(0);

  const recipes = foods[0];
  const addIngredients = addIngrenients as AdditionalIngredients;
  let textComplexity;
  if (recipes.complexity == 'easy') {
    textComplexity = 'лёгкая';
  } else if (recipes.complexity == 'normal') {
    textComplexity = 'средняя';
  } else {
    textComplexity = 'высокая';
  }
  let time: 'easy' | 'normal' | 'hard';
  if (recipes.prepTime <= 30) {
    time = 'easy';
  } else if (recipes.prepTime <= 60) {
    time = 'normal';
  } else {
    time = 'hard';
  }
  const result = recipes.stars.reduce((sum, obj) => {
    const [key, value] = Object.entries(obj)[0];
    return sum + Number(key) * value;
  }, 0);
  const ratingValue = result / recipes.likes;
  const dishes: string[] = [];
  recipes.inventory.forEach((item) => dishes.push(item.name));

  function handleClickIng(item: string) {
    if (item === isVisible) {
      setIsVisible('none');
    } else {
      setIsVisible(item);
    }
  }

  return (
    <div className={styles.recipePage}>
      <p className={styles.recipePage__heading}>
        Главная / Каталог рецептов / <span>{recipes.name}</span>
      </p>
      <div className={styles.recipePage__recipe}>
        <div className={styles.recipePage__recipe__imgEndShoplist}>
          <img className={styles.recipePage__recipe__imgEndShoplist__img} src={recipes.image} />
          <div className={styles.recipePage__recipe__imgEndShoplist__ingredients}>
            <h2 className={styles.recipePage__recipe__imgEndShoplist__ingredients__heading}>
              Ингредиенты:
            </h2>
            <div className={styles.recipePage__recipe__imgEndShoplist__ingredients__text}>
              <div
                className={styles.recipePage__recipe__imgEndShoplist__ingredients__text__container}>
                <ExclamationMarkIcon />
                <span>Дополнительные ингредиенты</span>
              </div>
              <div className={styles.recipePage__recipe__imgEndShoplist__ingredients__text__addIng}>
                {recipes.additionalIngredients.map((item) => (
                  <div key={item} className={styles.modal__addIng}>
                    <AdditionalIngredientsItem text={item} onClick={() => handleClickIng(item)} />
                    {isVisible === item && (
                      <div
                        className={
                          styles.recipePage__recipe__imgEndShoplist__ingredients__text__addIng__modal
                        }>
                        <div className={styles.modal__imageWrapper}>
                          <img
                            className={styles.modal__imageWrapper}
                            src={addIngredients[item].img}
                          />
                        </div>
                        <div className={styles.arrow__modal}></div>
                        <div className={styles.modal__text}>
                          <h3>Сметана</h3>
                          <span>ингредиент</span>
                          <p className={styles.modal__description}>
                            {addIngredients[item].description}
                          </p>
                          <DefaultButton
                            className={styles.modal__button}
                            text="Читать больше"
                            handleClick={() => window.open(addIngredients[item].url, '_blank')}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <ShopList baseItem={recipes.ingredients as JsonIngredient[]} />
          </div>
          <div className={styles.recipePage__recipe__imgEndShoplist__tags}>
            <h3>Теги:</h3>
            <div className={styles.recipePage__recipe__imgEndShoplist__tags__list}>
              {recipes.tagsSearch.map((item) => (
                <div
                  key={item}
                  className={styles.recipePage__recipe__imgEndShoplist__tags__list__item}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.recipePage__recipe__detailsRecipe}>
          <div className={styles.container__details}>
            <h1 className={styles.recipePage__recipe__detailsRecipe__heading}>{recipes.name}</h1>
            <div className={styles.container__details__container}>
              <div className={styles.container__details__tags}>
                {recipes.tags.map((item) => (
                  <TagInTheRecipe key={item} text={item} />
                ))}
              </div>
              <div className={styles.container__details__container__icons}>
                <IconActive svg={<Bookmark color={'rgba(255, 167, 86, 1)'} />} />
                <IconActive svg={<ShareIcon />} />
              </div>
            </div>
            <div className={styles.container__details__parameters}>
              <div className={styles.container__details__parameters__complexity}>
                <h2 className={styles.container__details__parameters__complexity__heading}>
                  Готовность
                </h2>
                <div className={styles.container__details__parameters__complexity__svg}>
                  <ComplexityIcon complexity={time} />
                  <span className={styles.text__svg}>{`${recipes.prepTime}\nминут`}</span>
                </div>
              </div>
              <div className={styles.container__details__parameters__complexity}>
                <h2 className={styles.container__details__parameters__complexity__heading}>
                  Сложность
                </h2>
                <div className={styles.container__details__parameters__complexity__svg}>
                  <ComplexityIcon complexity={recipes.complexity as 'easy' | 'normal' | 'hard'} />
                  <span className={styles.text__svg}>{textComplexity}</span>
                </div>
              </div>
              <div className={styles.container__details__parameters__sharpness}>
                <h2 className={styles.container__details__parameters__complexity__heading}>
                  Острота
                </h2>
                {recipes.sharpness === 1 ? (
                  <div className={styles.container__details__parameters__sharpness__icons}>
                    <PepperIcon className={styles.icon__pepper} active={true} />
                    <PepperIcon className={styles.icon__pepper} />
                    <PepperIcon className={styles.icon__pepper} />
                  </div>
                ) : recipes.sharpness === 2 ? (
                  <div className={styles.container__details__parameters__sharpness__icons}>
                    <PepperIcon className={styles.icon__pepper} active={true} />
                    <PepperIcon className={styles.icon__pepper} active={true} />
                    <PepperIcon className={styles.icon__pepper} />
                  </div>
                ) : (
                  <div className={styles.container__details__parameters__sharpness__icons}>
                    <PepperIcon className={styles.icon__pepper} active={true} />
                    <PepperIcon className={styles.icon__pepper} active={true} />
                    <PepperIcon className={styles.icon__pepper} active={true} />
                  </div>
                )}
              </div>
            </div>
            <div className={styles.container__details__value}>
              <h2 className={styles.container__details__value__heading}>
                Пищевая ценность на порцию:
              </h2>
              <div className={styles.container__details__value__container}>
                <div className={styles.container__details__value__container__energy}>
                  <div className={styles.container__details__value__container__energy__container}>
                    <span>Энергия</span>
                    <span>{recipes.energy}</span>
                  </div>
                </div>
                <div className={styles.container__details__value__container__squirrels}>
                  <div
                    className={styles.container__details__value__container__squirrels__container}>
                    <span>Белки</span>
                    <span>{recipes.squirrels}</span>
                  </div>
                </div>
                <div className={styles.container__details__value__container__fats}>
                  <div className={styles.container__details__value__container__fats__container}>
                    <span>Жиры</span>
                    <span>{recipes.squirrels}</span>
                  </div>
                </div>
                <div className={styles.container__details__value__container__carbohydrates}>
                  <div
                    className={
                      styles.container__details__value__container__carbohydrates__container
                    }>
                    <span>Углеводы</span>
                    <span>{recipes.carbohydrates}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.container__details__metrics}>
              <div className={styles.container__details__metrics__container}>
                <div className={styles.container__details__metrics__container__like}>
                  <IconActive svg={<LikeIcon color="rgba(103, 187, 90, 1)" />} />
                  <p>{`${recipes.likes} понравилось`}</p>
                </div>
                <div className={styles.container__details__metrics__container__eye}>
                  <EyeIcon className={styles.eyeicon} active={true} />
                  <p>{`${recipes.views} просмотров`}</p>
                </div>
              </div>
              <div className={styles.container__details__metrics__star}>
                <StarIcon active={true} />
                <span>{`${ratingValue.toFixed(1)}`}</span>
              </div>
            </div>
          </div>
          <div className={styles.recipePage__recipe__description}>
            <div className={styles.recipePage__recipe__description__text}>
              <h2>Описание:</h2>
              <p>{recipes.description}</p>
            </div>
            <div className={styles.recipePage__recipe__description__dishes}>
              <h2>Посуда:</h2>
              <p>{dishes.join(', ')}</p>
            </div>
            {Array.from({ length: recipes.steps }, (_, i) => {
              const stepNum = i + 1;
              return (
                <RecipeStep
                  step={i + 1}
                  key={i}
                  stepNum={`${stepNum} / ${recipes.steps}`}
                  stepData={recipes.descriptionStep[i]}
                  stepIngredients={recipes.ingredients as unknown as JsonIngredient[]}
                  stepInventory={recipes.inventorySteps.filter((item) => item.id == i + 1)}
                  inventory={recipes.inventory}
                />
              );
            })}
            <div className={styles.recipePage__recipe__description__feedback}>
              <div className={styles.recipePage__recipe__description__feedback__container}>
                <h4
                  className={styles.recipePage__recipe__description__feedback__container__heading}>
                  Вам понравился рецепт?
                </h4>
                <div className={styles.recipePage__recipe__description__feedback__container__stars}>
                  <IconActive
                    handleClick={() => {
                      if (stars == 1) {
                        setStars(0);
                      } else {
                        setStars(1);
                      }
                    }}
                    svg={<StarIcon classPath={styles.stars} active={stars > 0} />}
                  />
                  <IconActive
                    handleClick={() => {
                      if (stars == 2) {
                        setStars(0);
                      } else {
                        setStars(2);
                      }
                    }}
                    svg={<StarIcon classPath={styles.stars} active={stars > 1} />}
                  />
                  <IconActive
                    handleClick={() => {
                      if (stars == 3) {
                        setStars(0);
                      } else {
                        setStars(3);
                      }
                    }}
                    svg={<StarIcon classPath={styles.stars} active={stars > 2} />}
                  />
                  <IconActive
                    handleClick={() => {
                      if (stars == 4) {
                        setStars(0);
                      } else {
                        setStars(4);
                      }
                    }}
                    svg={<StarIcon classPath={styles.stars} active={stars > 3} />}
                  />
                  <IconActive
                    handleClick={() => {
                      if (stars == 5) {
                        setStars(0);
                      } else {
                        setStars(5);
                      }
                    }}
                    svg={<StarIcon classPath={styles.stars} active={stars > 4} />}
                  />
                </div>
              </div>
              <div className={styles.recipePage__recipe__description__feedback__list}>
                <div className={styles.recipePage__recipe__description__feedback__list__favourites}>
                  <IconActive svg={<Bookmark color={'rgba(247, 147, 30, 1)'} />} />
                  <span>добавить в кулинарную книгу</span>
                </div>
                <div className={styles.recipePage__recipe__description__feedback__list__links}>
                  <span>поделиться</span>
                  <IconLink href="https://vk.ru/vanek1499" label="Ссылка на ВК" svg={<VKIcon />} />
                  <IconLink
                    href="https://vk.ru/vanek1499"
                    label="Ссылка на Одноклассники"
                    svg={<OKIcon />}
                  />
                  <IconLink
                    href="https://vk.ru/vanek1499"
                    label="Ссылка на Телеграмм"
                    svg={<TGIcon />}
                  />
                  <IconLink
                    href="https://vk.ru/vanek1499"
                    label="Ссылка на Вотсапп"
                    svg={<WhatsappIcon />}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SectionCards
        classNameHeading={styles.section__heading__text}
        ogrinicatorOff={true}
        heading="Больше вкусных рецептов для вас"
      />
      <Comments
        comments={recipes.comments ? recipes.comments : []}
        className={styles.recipe__comments}
      />
      <Mailing />
    </div>
  );
}
