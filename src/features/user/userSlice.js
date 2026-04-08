import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { BASE_URL } from "../../utils/constants";

export const createUser = createAsyncThunk(
  "users/createUser",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/users`, payload);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

export const loginUser = createAsyncThunk(
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
      return rejectWithValue({ message: err.message });
    }
  },
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.put(`${BASE_URL}/users/${payload.id}`, payload);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);

const addCurrentUser = (state, { payload }) => {
  state.currentUser = payload;
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    cart: [],
    favorites: [],
    isLoading: false,
    formType: "signup",
    showForm: false,
  },
  reducers: {
    addItemToCart: (state, { payload }) => {
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
    removeItemFromCart: (state, { payload }) => {
      state.cart = state.cart.filter(({ id }) => id !== payload);
    },
    toggleForm: (state, { payload }) => {
      state.showForm = payload;
    },
    toggleFormType: (state, { payload }) => {
      state.formType = payload;
    },
    toggleFavorite: (state, { payload }) => {
      const exists = state.favorites.find((item) => item.id === payload.id);
      if (exists) {
        state.favorites = state.favorites.filter(
          (item) => item.id !== payload.id,
        );
      } else {
        state.faidlevorites.push(payload);
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
