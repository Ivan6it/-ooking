export interface Shoppinglist {
  id: number;
  buyingredients: number[];
  purchasedingredients: number[];
}

export interface Cookbook {
  name: string;
  recipes: number[];
  id: string;
}

export interface Stars {
  id: number;
  stars: number;
}

export interface User {
  id: number;
  mail: string;
  name: string;
  password: string;
  surname: string;
  image: string;
  gender: 'male' | 'female' | 'none';
  birthday: Date | null;
  liked: number[];
  agreement: boolean;
  cookbooks: Cookbook[];
  shoppinglist: Shoppinglist[];
  stars: Stars[];
}
const users: User[];
export default users;
