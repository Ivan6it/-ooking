import styles from './RecipeStep.module.css';
import { Pot } from '@/shared/ui/icons';

type Ingredient = {
  step: number[];
  [key: string]: string | number[];
};

type DescriptionStep = {
  step: string;
  imageStep: string[];
};

type InventoryItem = {
  id: string | number;
  tools: string[];
};

type Inventory = {
  id: string;
  name: string;
};

type RecipeStepProps = {
  stepNum: string;
  stepData: DescriptionStep;
  stepIngredients: Ingredient[];
  step: number;
  stepInventory: InventoryItem[];
  inventory: Inventory[];
};

export function RecipeStep({
  stepNum,
  stepData,
  stepIngredients,
  step,
  stepInventory,
  inventory,
}: RecipeStepProps) {
  const ingredientsListItems = stepIngredients.filter((ing) => ing.step.includes(step));
  const resultInventory: string[] = [];
  stepInventory[0].tools.map((item) => {
    const nameInventoryItem = inventory.filter((inventoryItem) => inventoryItem.id == item);
    resultInventory.push(nameInventoryItem[0].name);
  });
  return (
    <div className={styles.recipeStep}>
      <span className={styles.recipeStep__heading}>Шаг {stepNum}</span>
      <div>
        {stepData.imageStep.length > 1 ? (
          <div className={styles.recipeStep__content}>
            <div className={styles.recipeStep__content__img}>
              {stepData.imageStep.map((image, i) => (
                <img loading="lazy" key={i} src={image} />
              ))}
            </div>
            <div className={styles.recipeStep__content__ingredients}>
              {ingredientsListItems.map((item, i) => {
                const quantity = Object.entries(item);
                return (
                  <div key={i} className={styles.recipeStep__content__ingredients__container}>
                    <span>{quantity[0][1]}</span>
                    <span>{quantity[0][0].toLowerCase()}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className={styles.recipeStep__content__custom}>
            <img loading="lazy" src={stepData.imageStep[0]} />
            <div className={styles.recipeStep__content__custom__ingredients}>
              {ingredientsListItems.map((item, i) => {
                const quantity = Object.entries(item);
                return (
                  <div key={i} className={styles.recipeStep__content__ingredients__container}>
                    <span>{quantity[0][1]}</span>
                    <span>{quantity[0][0].toLowerCase()}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div className={styles.recipeStep__inventory}>
        <Pot />
        {resultInventory.join(' - ')}
      </div>
      <p className={styles.recipeStep__description}>{stepData.step}</p>
    </div>
  );
}
