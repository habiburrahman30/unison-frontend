export interface Product {
  id: number;
  category_id: number;
  brand_id: number;
  name: string;
  slug: string;
  manufacturer: string;
  country_of_origin: string;
  product_url?: string;
  images: string[];
  price: number;
  old_price?: number;
  is_trending?: boolean;
  product_description?: string;
  technical_discription?: string;
  stock?: number;
}
