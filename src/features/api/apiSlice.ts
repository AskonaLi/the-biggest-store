import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../../utils/constants";
import { buildUrl } from "../../utils/common";
import type { ApiProduct } from "../../types/product.type";
import type { ProductListItem } from "../../types/products.type";

export type GetProductArgs = { id: number };

export type GetProductsArgs = Partial<{
  title: string;
  price_min: number;
  price_max: number;
  categoryId: number;
  limit: number;
  offset: number;
}>;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Product", "Products"],
  endpoints: (builder) => ({
    getProduct: builder.query<ApiProduct, GetProductArgs>({
      query: ({ id }) => `/products/${id}`,
      providesTags: (_result, _error, arg) => [{ type: "Product", id: arg.id }],
    }),
    getProducts: builder.query<ProductListItem[], GetProductsArgs>({
      query: (params) => buildUrl("/products", params),
      providesTags: ["Products"],
    }),
  }),
});

export const { useGetProductQuery, useGetProductsQuery } = apiSlice;
