import type { ProductListItem } from "./products.type";

export type ApiCategory = {
  id: number;
  name: string;
  image?: string;
};

// API /products/:id возвращает "product" без quantity, но с category.id
export type ApiProduct = Omit<ProductListItem, "category"> & {
  category: ApiCategory;
};

