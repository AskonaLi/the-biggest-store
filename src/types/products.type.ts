import type { CSSProperties } from "react";
import type { CartItem } from "./cart.type";

export type ProductListItem = Omit<CartItem, "quantity">;

export type ProductsProps = {
    title?: string;
    style?: CSSProperties;
    products?: ProductListItem[];
    amount: number;
  };