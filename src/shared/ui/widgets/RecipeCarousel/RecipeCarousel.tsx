import { useState } from 'react';
import { IconActive } from '../../iconActive';
import { ArrowIcon } from '../../icons';
import styles from './RecipeCarousel.module.css';
import kitchens from '@/data/kitchens.json';

type KitchenName =
  | 'Russian'
  | 'Asian'
  | 'British'
  | 'Chinese'
  | 'French'
  | 'German'
  | 'Greek'
  | 'Indian'
  | 'Italian'
  | 'Spanish'
  | 'Japanese'
  | 'Mexican'
  | 'Turkish'
  | 'none';

export function RecipeCarousel() {
  const [quantityClick, setQuantityClick] = useState(0);
  const [isSliding, setIsSliding] = useState<'none' | 'down' | 'up'>('none');
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeKitchen, setActiveKitchen] = useState<KitchenName>('none');

  //Логика карусели
  const catalog = kitchens;
  const quantityVisibleKitchens = 7;
  const step = Math.ceil(catalog.length / quantityVisibleKitchens);
  const ost = catalog.length % quantityVisibleKitchens;
  const visiblecatalog = catalog.slice(0 + quantityClick, quantityVisibleKitchens + quantityClick);

  const handleNext = () => {
    if (quantityClick % step < 7 && !isAnimating) {
      setIsAnimating(true);
      setIsSliding('down');

      setTimeout(() => {
        if (catalog.length - (quantityClick + quantityVisibleKitchens) < 7) {
          setQuantityClick((prev) => prev + ost);
        } else {
          setQuantityClick((prev) => prev + quantityVisibleKitchens);
        }
        setIsSliding('up');
        setTimeout(() => {
          setIsAnimating(false);
        }, 400);
      }, 500);
    }
  };
  const handlePrev = () => {
    if (quantityClick <= ost && !isAnimating) {
      setIsAnimating(true);
      setIsSliding('down');

      setTimeout(() => {
        if (catalog.length - (quantityClick + quantityVisibleKitchens) < 7) {
          setQuantityClick((prev) => prev - ost);
        } else {
          setQuantityClick((prev) => prev - quantityVisibleKitchens);
        }

        setIsSliding('up');
        setTimeout(() => {
          setIsAnimating(false);
        }, 400);
      }, 500);
    }
  };

  const leftArrowStyle = quantityClick == 0 ? 'rgba(208, 240, 191, 1)' : 'rgba(103, 187, 90, 1)';
  const rightArrowStyle =
    quantityClick < step - 1 ? 'rgba(103, 187, 90, 1)' : 'rgba(208, 240, 191, 1)';

  return (
    <div className={styles.recipeCarousel}>
      <h1 className={styles.recipeCarousel__heading}>Каталог рецептов</h1>
      <div className={styles.recipeCarousel__nav}>
        <IconActive
          disabled={quantityClick < step - 1}
          handleClick={handlePrev}
          svg={<ArrowIcon color={leftArrowStyle} vector="left" />}
        />
        <IconActive
          disabled={quantityClick >= step - 1}
          handleClick={handleNext}
          svg={<ArrowIcon color={rightArrowStyle} vector="right" />}
        />
      </div>
      <div className={styles.recipeCarousel__cuisines}>
        <div
          className={`${styles.recipeCarousel__slideBar} ${isSliding === 'down' ? styles.recipeCarousel__slideBar_slidingDown : ''} ${isSliding === 'up' ? styles.recipeCarousel__slideBar_slidingUp : ''}`}
        />
        <div
          className={`${styles.recipeCarousel__slideBar__down} ${isSliding === 'down' ? styles.recipeCarousel__slideBar_slidingDown : ''} ${isSliding === 'up' ? styles.recipeCarousel__slideBar_slidingUp : ''}`}
        />
        {visiblecatalog.map((kitchen, index) => (
          <button
            onClick={
              activeKitchen === kitchen.id
                ? () => setActiveKitchen('none')
                : () => setActiveKitchen(kitchen.id as KitchenName)
            }
            key={kitchen.id}
            className={`${styles.recipeCarousel__cuisines_cuisine} ${kitchen.id === activeKitchen ? styles.recipeCarousel__cuisines_cuisine__active : ''}`}
            style={{ animationDelay: `${index * 0.05}s` }}>
            <img src={kitchen.image} alt={kitchen.alt} />
            <span>{kitchen.name.replace(' ', '\n')}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
