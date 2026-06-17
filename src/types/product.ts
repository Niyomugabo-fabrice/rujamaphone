export type ProductCategory = "SMARTPHONE" | "SPEAKER" | "ACCESSORY";

export interface Product {
  id: string;
  slug?: string;
  name: string;
  price: number;
  image: string[];
  brand: string;
  category: ProductCategory;
  condition: string;
  rating: number;
  reviews: number;
  // Optional fields based on category
  storage?: string;
  batteryLife?: string | null;
  type?: string;
  description?: string | null;
}

export interface ProductFilters {
  category?: ProductCategory;
  brand?: string;
  condition?: string;
  minPrice?: number;
  maxPrice?: number;
  storage?: string;
  batteryLife?: string;
  type?: string;
  search?: string;
  sort?: string;
}

export interface ProductsResponse {
  data: Product[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
