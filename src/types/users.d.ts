declare module '@/data/users.json' {
  export interface Shoppinglist {
    id: number;
    buyingredients: number[] | [];
    purchasedingredients: number[] | [];
  }

  export interface Cookbook {
    name: string;
    recipes: number[];
  }

  export interface User {
    id: number;
    mail: string;
    name: string;
    surname: string;
    image: string;
    gender: 'male' | 'female' | 'none';
    birthday: Date | null;
    cookbooks: Cookbook[];
    shoppinglist: Shoppinglist[];
  }
  const users: User[];
  export default users;
}
