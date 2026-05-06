import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { BASE_URL } from "../../utils/constants";

import { Category } from "../../types/category.type";

type CategoriesState = {
  list: Category[];
  isLoading: boolean;
  error: string | null;
};

const initialState: CategoriesState = {
  list: [],
  isLoading: false,
  error: null,
};

export const getCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>(
  "categories/getCategories",
  async (_, thunkAPI) => {
    try {
      const res = await axios<Category[]>(`${BASE_URL}/categories`);
      return res.data;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return thunkAPI.rejectWithValue(err.message);
      }
      return thunkAPI.rejectWithValue("Unknown error");
    }
  },
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getCategories.fulfilled, (state, { payload }) => {
      state.list = payload;
      state.isLoading = false;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload ?? action.error.message ?? "Unknown error";
    });
  },
});

export default categoriesSlice.reducer;
