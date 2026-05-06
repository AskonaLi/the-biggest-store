import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useGetProductQuery, useGetProductsQuery } from "../../features/api/apiSlice";
import { skipToken } from "@reduxjs/toolkit/query";

import { ROUTES } from "../../utils/routes";
import Product from "./Product";
import Products from "./Products";
import { shuffle } from "../../utils/common";

const SingleProduct = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const productId = useMemo(() => (id ? Number(id) : undefined), [id]);

  const { data, isLoading, isFetching, isSuccess } = useGetProductQuery(
    productId ? ({ id: productId } as const) : skipToken,
  );
  const product = data;

  const { data: relatedData = [], isLoading: isRelatedLoading, isError: isRelatedError } =
    useGetProductsQuery(
      product?.category?.id
        ? { categoryId: product.category.id, limit: 20, offset: 0 }
        : skipToken,
    );

  useEffect(() => {
    if (!isFetching && !isLoading && !isSuccess) {
      navigate(ROUTES.HOME);
    }
  }, [isLoading, isFetching, isSuccess, navigate]);

  const related =
    !product || !Array.isArray(relatedData)
      ? []
      : shuffle(relatedData.filter((p) => p.id !== product.id)).slice(0, 5);

  return !product ? (
    <section className="preloader">Loading...</section>
  ) : (
    <>
      <Product {...product} />
      {isRelatedLoading ? null : isRelatedError ? null : (
        <Products products={related} amount={5} title="Related products" />
      )}
    </>
  );
};

export default SingleProduct;
