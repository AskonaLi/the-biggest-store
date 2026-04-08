import type { CSSProperties } from "react";
import type { CartItem } from "./cart.type";

/** Товар в списке (с API), без обязательного quantity */
export type ProductListItem = Omit<CartItem, "quantity">;

export type ProductsProps = {
    title?: string;
    style?: CSSProperties;
    products?: ProductListItem[];
    amount: number;
  };