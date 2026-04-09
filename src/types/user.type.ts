import type { CartItem } from "./cart.type";

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
    favorites: CartItem[];
    isLoading: boolean;
    formType: "signup" | "login";
    showForm: boolean;
    currentUser: User | null;
}
