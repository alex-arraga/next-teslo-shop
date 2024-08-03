export interface Product {
  id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  title: string;
  // todo: type: Type;
  gender: Gender
}


export interface CartProduct {
  id: string,
  title: string,
  description: string,
  price: number,
  slug: string,
  quantity: number,
  size: Size
  images: string,
}


export type Gender = 'men' | 'women' | 'kid' | 'unisex'
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type Type = 'shirts' | 'pants' | 'hoodies' | 'hats';

