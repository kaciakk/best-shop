export type Product = {
  id: string;
  name: string;
  price: number;
  rating: number;
  category: string;
  imageUrl: string;
  isSale?: boolean;
  size?: string;
  color?: string;
};
