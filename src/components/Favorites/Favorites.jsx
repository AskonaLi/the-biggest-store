import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../features/user/userSlice";

import cartStyles from "../../styles/Cart.module.css";
import favStyles from "../../styles/Favorites.module.css";

const Favorites = () => {
  const dispatch = useDispatch();
  const { favorites } = useSelector(({ user }) => user);

  const removeFavorite = (id) => {
    dispatch(toggleFavorite({ id }));
  };

  return (
    <section className={cartStyles.cart}>
      <h2 className={cartStyles.title}>Your favorites</h2>

      {!favorites.length ? (
        <div className={cartStyles.empty}>No favorites yet</div>
      ) : (
        <div className={cartStyles.list}>
          {favorites.map(({ id, title, category, images, price }) => (
            <div className={favStyles.item} key={id}>
              <div
                className={cartStyles.image}
                style={{ backgroundImage: `url(${images[0]})` }}
              />
              <div className={cartStyles.info}>
                <h3 className={cartStyles.name}>{title}</h3>
                <div className={cartStyles.category}>{category.name}</div>
              </div>
              <div className={cartStyles.price}>{price}$</div>
              <div
                className={cartStyles.close}
                onClick={() => removeFavorite(id)}
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
