import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useGetProductQuery, useGetProductsQuery } from "../../features/api/apiSlice";
import { skipToken } from "@reduxjs/toolkit/query";

import { ROUTES } from "../../utils/routes";
import Product from "./Product";
import Products from "./Products";
import { shuffle } from "../../utils/common";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({ id });

  const { data: relatedData = [], isLoading: isRelatedLoading, isError: isRelatedError } =
    useGetProductsQuery(
      data?.category?.id
        ? { categoryId: data.category.id, limit: 20, offset: 0 }
        : skipToken,
    );

  useEffect(() => {
    if (!isFetching && !isLoading && !isSuccess) {
      navigate(ROUTES.HOME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isFetching, isSuccess]);

  const related =
    !data || !Array.isArray(relatedData)
      ? []
      : shuffle(relatedData.filter((p) => p.id !== data.id)).slice(0, 5);

  return !data ? (
    <section className="preloader">Loading...</section>
  ) : (
    <>
      <Product {...data} />
      {isRelatedLoading ? null : isRelatedError ? null : (
        <Products products={related} amount={5} title="Related products" />
      )}
    </>
  );
};

export default SingleProduct;
