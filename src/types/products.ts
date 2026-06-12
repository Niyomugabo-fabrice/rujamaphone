export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;

  description?: string;
  category?: string;
  brand?: string;
  inStock?: boolean;

  condition: "new" | "used";
  rating: number;
  reviews: number;
}