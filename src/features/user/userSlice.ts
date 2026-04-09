import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import {
  SignupFormValues,
  LoginFormValues,
  User,
  UserState,
} from "../../types/user.type";
import type { CartItem } from "../../types/cart.type";

import { BASE_URL } from "../../utils/constants";

type ApiError = { status?: number; message: string };
type ThunkConfig = { rejectValue: ApiError };

type FormType = UserState["formType"];
type AddToCartPayload = Omit<CartItem, "quantity"> & { quantity?: number };

export const createUser = createAsyncThunk<User, SignupFormValues, ThunkConfig>(
  "users/createUser",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/users`, payload);
      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue({
          status: err.response.status,
          message: err.response.data?.message || "Ошибка регистрации",
        });
      }

      const message = err instanceof Error ? err.message : "Неизвестная ошибка";
      return rejectWithValue({ message });
    }
  },
);

export const loginUser = createAsyncThunk<User, LoginFormValues, ThunkConfig>(
  "users/loginUser",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, payload);
      if (!res.data?.access_token) {
        return rejectWithValue({ message: "Токен не получен" });
      }

      const login = await axios.get(`${BASE_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${res.data.access_token}`,
        },
      });

      return login.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue({
          status: err.response.status,
          message: err.response.data?.message || "Ошибка авторизации",
        });
      }

      const message = err instanceof Error ? err.message : "Неизвестная ошибка";
      return rejectWithValue({ message });
    }
  },
);

export const updateUser = createAsyncThunk<User, User, ThunkConfig>(
  "users/updateUser",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${BASE_URL}/users/${payload.id}`, payload);
      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        return rejectWithValue({
          status: err.response.status,
          message: err.response.data?.message || "Ошибка обновления профиля",
        });
      }

      const message = err instanceof Error ? err.message : "Неизвестная ошибка";
      return rejectWithValue({ message });
    }
  },
);

export const addCurrentUser = (
  state: UserState,
  action: PayloadAction<User>,
) => {
  state.currentUser = action.payload;
};

const initialState: UserState = {
  currentUser: null,
  cart: [],
  favorites: [],
  isLoading: false,
  formType: "signup",
  showForm: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const { payload } = action;
      let newCart = [...state.cart];
      const found = state.cart.find(({ id }) => id === payload.id);

      if (found) {
        newCart = newCart.map((item) => {
          return item.id === payload.id
            ? { ...item, quantity: payload.quantity || item.quantity + 1 }
            : item;
        });
      } else newCart.push({ ...payload, quantity: 1 });

      state.cart = newCart;
    },
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      const { payload } = action;
      state.cart = state.cart.filter(({ id }) => id !== payload);
    },
    toggleForm: (state, action: PayloadAction<boolean>) => {
      const { payload } = action;
      state.showForm = payload;
    },
    toggleFormType: (state, action: PayloadAction<FormType>) => {
      const { payload } = action;
      state.formType = payload;
    },
    toggleFavorite: (state, action: PayloadAction<CartItem>) => {
      const { payload } = action;
      const exists = state.favorites.find((item) => item.id === payload.id);
      if (exists) {
        state.favorites = state.favorites.filter(
          (item) => item.id !== payload.id,
        );
      } else {
        state.favorites.push(payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, addCurrentUser);
    builder.addCase(loginUser.fulfilled, addCurrentUser);
    builder.addCase(updateUser.fulfilled, addCurrentUser);
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  toggleForm,
  toggleFormType,
  toggleFavorite,
} = userSlice.actions;

export default userSlice.reducer;

