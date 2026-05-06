import React from "react";
import { toggleFavorite } from "../../features/user/userSlice";
import type { ProductListItem } from "../../types/products.type";

import cartStyles from "../../styles/Cart.module.css";
import favStyles from "../../styles/Favorites.module.css";
import { useAppDispatch, useAppSelector } from "../App/hooks";

const Favorites = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.user.favorites);

  const removeFavorite = (item: ProductListItem) => {
    dispatch(toggleFavorite(item));
  };

  return (
    <section className={cartStyles.cart}>
      <h2 className={cartStyles.title}>Your favorites</h2>

      {!favorites.length ? (
        <div className={cartStyles.empty}>No favorites yet</div>
      ) : (
        <div className={cartStyles.list}>
          {favorites.map((item) => (
            <div className={favStyles.item} key={item.id}>
              <div
                className={cartStyles.image}
                style={{ backgroundImage: `url(${item.images[0]})` }}
              />
              <div className={cartStyles.info}>
                <h3 className={cartStyles.name}>{item.title}</h3>
                <div className={cartStyles.category}>{item.category.name}</div>
              </div>
              <div className={cartStyles.price}>{item.price}$</div>
              <div
                className={cartStyles.close}
                onClick={() => removeFavorite(item)}
              >
                <svg className="icon">
                  <use
                    xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`}
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Favorites;
