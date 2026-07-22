declare module '@/data/directorySection.json' {
  export interface DirectoryProduct {
    name: string;
    calorieContent: string;
    protein: string;
    fats: string;
    carbohydrates: string;
    img: string;
  }

  export interface DirectorySectionData {
    name: string;
    img: string;
    products: DirectoryProduct[];
  }
  const directorySection: DirectorySectionData[];
  export default directorySection;
}
