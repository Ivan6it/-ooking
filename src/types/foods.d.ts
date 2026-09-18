export interface Food {
  id: number;
  date: number;
  name: string;
  image: string;
  imgAlt: string;
  likes: number;
  productTags: string[];
  stars: { [key: string]: number }[];
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
  comments?: Array<{
    date: number;
    user: { id: number };
    comment: string;
    answers?: Array<{ date: number; user: { id: number }; comment: string; replyTo?: number }>;
  }>;
  ingredients: Array<{
    step: number[];
    [name: string]: string | number[];
  }>;
  additionalIngredients: string[];
  description: string;
  inventory: { id: string; name: string }[];
  inventorySteps: { id: number; tools: string[] }[];
  descriptionStep: Array<{ step: string; imageStep: string[] }>;
}
