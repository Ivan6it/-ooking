export interface User {
  id: number;
}

export interface Answer {
  date: number;
  user: User;
  comment?: string;
  replyTo?: number;
}

export interface DirectoryComment {
  date: number;
  user: User;
  comment?: string;
  answers?: Answer[];
}

export interface DirectoryProduct {
  id: string;
  name: string;
  calorieContent: string;
  protein: string;
  fats: string;
  carbohydrates: string;
  img: string;
  description: string;
  benefit: string;
  application: string;
  comments?: DirectoryComment[];
}

export interface DirectorySectionData {
  id: string;
  name: string;
  img: string;
  products: DirectoryProduct[];
}
const directorySection: DirectorySectionData[];
export default directorySection;
