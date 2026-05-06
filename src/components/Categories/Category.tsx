import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { useGetProductsQuery } from "../../features/api/apiSlice";

import styles from "../../styles/Category.module.css";
import Products from "../Products/Products";
import { useAppSelector } from "../App/hooks";
import type { Category as CategoryType } from "../../types/category.type";
import type { ProductListItem } from "../../types/products.type";

type FilterValues = {
  title: string;
  price_min: number;
  price_max: number;
};

type ProductsQueryParams = FilterValues & {
  categoryId?: number;
  limit: number;
  offset: number;
};

const DEFAULT_VALUES: FilterValues = {
  title: "",
  price_min: 0,
  price_max: 0,
};

const Category = () => {
  const { id } = useParams<{ id?: string }>();
  const { list } = useAppSelector(({ categories }) => categories);

  const categoryId = useMemo(() => (id ? Number(id) : undefined), [id]);

  const defaultParams = useMemo<ProductsQueryParams>(
    () => ({
      ...(categoryId ? { categoryId } : {}),
      limit: 5,
      offset: 0,
      ...DEFAULT_VALUES,
    }),
    [categoryId],
  );

  const [isEnd, setIsEnd] = useState(false);
  const [cat, setCat] = useState<CategoryType | null>(null);
  const [items, setItems] = useState<ProductListItem[]>([]);
  const [values, setValues] = useState<FilterValues>(DEFAULT_VALUES);
  const [params, setParams] = useState(defaultParams);

  const { data, isLoading, isSuccess } = useGetProductsQuery(params);
  const products = useMemo(() => (data ?? []) as ProductListItem[], [data]);

  useEffect(() => {
    if (!categoryId) return;

    setValues(DEFAULT_VALUES);
    setItems([]);
    setIsEnd(false);
    setParams(defaultParams);
  }, [categoryId, defaultParams]);

  useEffect(() => {
    if (isLoading) return;

    if (!products.length) return setIsEnd(true);

    setItems((prev) => [...prev, ...products]);
  }, [products, isLoading]);

  useEffect(() => {
    if (!categoryId || !list.length) return;

    const category = list.find((item) => item.id === categoryId) ?? null;

    setCat(category);
  }, [list, categoryId]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value, name } = e.target;

    setValues((prev) => {
      if (name === "price_min" || name === "price_max") {
        return { ...prev, [name]: Number(value) };
      }

      return { ...prev, [name]: value };
    });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    setItems([]);
    setIsEnd(false);
    setParams({ ...defaultParams, ...values });
  };

  const handleReset = () => {
    setValues(DEFAULT_VALUES);
    setParams(defaultParams);
    setIsEnd(false);
  };

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>{cat?.name}</h2>

      <form className={styles.filters} onSubmit={handleSubmit}>
        <div className={styles.filter}>
          <input
            type="text"
            name="title"
            onChange={handleChange}
            placeholder="Product name"
            value={values.title}
          />
        </div>
        <div className={styles.filter}>
          <input
            type="number"
            name="price_min"
            onChange={handleChange}
            placeholder="0"
            value={values.price_min}
          />
          <span>Price from</span>
        </div>
        <div className={styles.filter}>
          <input
            type="number"
            name="price_max"
            onChange={handleChange}
            placeholder="0"
            value={values.price_max}
          />
          <span>Price to</span>
        </div>

        <button type="submit" hidden />
      </form>

      {isLoading ? (
        <div className="preloader">Loading...</div>
      ) : !isSuccess || !items.length ? (
        <div className={styles.back}>
          <span>No results</span>
          <button onClick={handleReset}>Reset</button>
        </div>
      ) : (
        <Products
          title=""
          products={items}
          style={{ padding: 0 }}
          amount={items.length}
        />
      )}

      {!isEnd && (
        <div className={styles.more}>
          <button
            onClick={() =>
              setParams({ ...params, offset: params.offset + params.limit })
            }
          >
            See more
          </button>
        </div>
      )}
    </section>
  );
};

export default Category;
