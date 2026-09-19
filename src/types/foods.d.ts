export type FoodStars = {
  [key:string]: number;
}

export type FoodCommentAnswer = {
  date: number;
  user: {
    id: number;
  };
  comment: string;
  replyTo?: number;
};

export type FoodComment = {
  date: number;
  user: {
    id: number;
  };
  comment: string;
  answers?: FoodCommentAnswer[];
};

export type FoodIngredient = {
  step: number[];
  [name: string]: string | number[];
};

export type FoodInventoryItem = {
  id: string;
  name: string;
};

export type FoodInventoryStep = {
  id: number;
  tools: string[];
};

export type FoodDescriptionStep = {
  step: string;
  imageStep: string[];
};

export interface Food {
  id: number;
  date: number;
  name: string;
  image: string;
  imgAlt: string;
  likes: number;
  productTags: string[];
  stars: FoodStars[];
  views: number;
  prepTime: number;
  complexity: 'easy' | 'normal' | 'hard';
  sharpness: number;
  energy: string;
  squirrels: string;
  fats: string;
  carbohydrates: string;
  steps: number;
  tagsSearch: string[];
  tags: string[];
  comments?: FoodComment[];
  ingredients: FoodIngredient[];
  additionalIngredients: string[];
  description: string;
  inventory: FoodInventoryItem[];
  inventorySteps: FoodInventoryStep[];
  descriptionStep: FoodDescriptionStep[];
}
