export interface Category {
  id: string;
  name: string;
  icon?: string;
  display_order?: number;
}

export interface Product {
  id: string; // ASIN or product ID
  asin?: string;
  title: string;
  subtitle?: string;
  description: string;
  category_id: string;
  price: number;
  original_price?: number | null;
  currency?: string;
  star_rating: number;
  num_ratings: number;
  main_photo: string;
  photos?: string[];
  sizes?: string[];
  colors?: string[];
  is_best_seller?: boolean;
  in_stock?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Order {
  id: string;
  total_amount: number;
  shipping_fee: number;
  payment_method: string;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  items: CartItem[];
  created_at: string;
}
