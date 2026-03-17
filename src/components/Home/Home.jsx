import React, { useMemo } from "react";
import { useSelector } from "react-redux";

import Poster from "../Poster/Poster";
import Products from "../Products/Products";
import Categories from "../Categories/Categories";
import Banner from "../Banner/Banner";
import { useGetProductsQuery } from "../../features/api/apiSlice";

const Home = () => {
  const categories = useSelector((state) => state.categories);

  const { data = [], isLoading, isError } = useGetProductsQuery({
    limit: 50,
    offset: 0,
  });

  const trending = useMemo(() => data.slice(0, 5), [data]);
  const lessThan100 = useMemo(
    () => data.filter(({ price }) => price < 100).slice(0, 5),
    [data],
  );

  return (
    <>
      <Poster />
      {isLoading ? (
        <section className="preloader">Loading...</section>
      ) : isError ? (
        <section className="preloader">Failed to load products</section>
      ) : (
        <Products products={trending} amount={5} title="Trending" />
      )}
      <Categories products={categories.list} amount={5} title="Worth seeing" />
      <Banner />
      {isLoading ? null : isError ? null : (
        <Products products={lessThan100} amount={5} title="Less than 100$" />
      )}
    </>
  );
};

export default Home;
