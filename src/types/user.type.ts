import type { CartItem } from "./cart.type";
import type { ProductListItem } from "./products.type";

export type User = {
    id: number;
    name: string;
    email: string;
    password: string;
    avatar: string;
};

export type SignupFormValues = Omit<User, "id">;

export type LoginFormValues = Pick<User, "email" | "password">;

export type UserState = {
    cart: CartItem[];
    favorites: ProductListItem[];
    isLoading: boolean;
    formType: "signup" | "login";
    showForm: boolean;
    currentUser: User | null;
}
