import { Gender, Size } from "./product.interface";

export interface OrderedItems {
  quantity: number;
  price: number;
  size: Size;
  productId: string;
  product: {
    title: string;
    slug: string;
    gender: Gender;
    ProductImage: {
      url: string;
    }[];
  }
}