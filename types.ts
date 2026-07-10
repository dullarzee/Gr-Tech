export interface ProductTypes {
  id: string;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  stock: number;
  variant?: string;
  ratings: number;
  reviews: number;
  features: string[];
  description: string;
}
