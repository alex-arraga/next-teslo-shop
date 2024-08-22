import { Gender, Size } from "./product.interface";

export interface OrderedProduct {
  id: string;
  title: string;
  description: string;
  inStock: number;
  price: number;
  slug: string;
  tags: string[];
  gender: Gender;
  categoryId: string;
  size: Size,
  images: string[]
}