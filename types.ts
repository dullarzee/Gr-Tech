import { CartItem } from "./lib/cart-context";

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

export interface ResourceTypes {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  readTime: number;
  date: string;
  image: string;
}

export interface FetchedUserTypes {
  id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  createdAt: string;
  cartItems: CartItem[];
  order: Omit<OrderTypes, "user">[];
  updatedAt: string;
}

export interface OrderTypes {
  id: string;
  userId: string;
  totalAmount: number;
  shippingFee?: number;
  tax?: number;
  status: string;
  paymentReference?: string;
  paymentStatus: string;
  shippingAddress?: string;
  phoneNumber?: string;
  email: string;
  items: [];
  user: {
    id: string;
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    createdAt: string;
    cartItems: CartItem[];
    updatedAt: string;
  };
  createdAt: string;
  updatedAt?: string;
}
