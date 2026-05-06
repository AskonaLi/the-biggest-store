import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { skipToken } from "@reduxjs/toolkit/query";

import styles from "../../styles/Header.module.css";
import { ROUTES } from "../../utils/routes";

import LOGO from "../../images/stuff-logo.svg";
import AVATAR from "../../images/avatar-cat.jpg";

import { toggleForm } from "../../features/user/userSlice";
import { useGetProductsQuery } from "../../features/api/apiSlice";
import { useAppDispatch, useAppSelector } from "../App/hooks";
import type { ProductListItem } from "../../types/products.type";

type HeaderUserView = {
  name: string;
  avatar: string;
};

const DEFAULT_USER: HeaderUserView = { name: "Guest", avatar: AVATAR };

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState<string>("");

  const { currentUser, cart, favorites } = useAppSelector(({ user }) => user);

  const [userView, setUserView] = useState<HeaderUserView>(DEFAULT_USER);

  const { data, isLoading } = useGetProductsQuery(
    searchValue ? ({ title: searchValue } as const) : skipToken,
  );

  const searchResults = useMemo(
    () => (Array.isArray(data) ? (data as ProductListItem[]) : []),
    [data],
  );

  useEffect(() => {
    if (!currentUser) return;
    setUserView({ name: currentUser.name, avatar: currentUser.avatar });
  }, [currentUser]);

  const handleClick = () => {
    if (!currentUser) dispatch(toggleForm(true));
    else navigate(ROUTES.PROFILE);
  };

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}>
          <img src={LOGO} alt="Stuff" />
        </Link>
      </div>

      <nav className={styles.info}>
        <div className={styles.user} onClick={handleClick}>
          <div
            className={styles.avatar}
            style={{ backgroundImage: `url(${userView.avatar})` }}
          />
          <div className={styles.username}>{userView.name}</div>
        </div>

        <form className={styles.form}>
          <label htmlFor="site-search" className={styles.icon}>
            <svg className="icon">
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`} />
            </svg>
          </label>
          <div className={styles.input}>
            <input
              id="site-search"
              type="search"
              name="search"
              placeholder="Поиск"
              autoComplete="off"
              onChange={handleSearch}
              value={searchValue}
            />
          </div>

          {searchValue && (
            <div className={styles.box}>
              {isLoading
                ? "Loading"
                : !searchResults.length
                  ? "No results"
                  : searchResults.map(({ title, images, id }) => (
                      <Link
                        key={id}
                        onClick={() => setSearchValue("")}
                        className={styles.item}
                        to={`/products/${id}`}
                      >
                        <div
                          className={styles.image}
                          style={{ backgroundImage: `url(${images[0]})` }}
                        />
                        <div className={styles.title}>{title}</div>
                      </Link>
                    ))}
            </div>
          )}
        </form>

        <div className={styles.account}>
          <Link to={ROUTES.FAVORITES} className={styles.cart}>
            <svg className={styles["icon-fav"]}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
            </svg>
            {!!favorites.length && (
              <span className={styles.count}>{favorites.length}</span>
            )}
          </Link>
          <Link to={ROUTES.CART} className={styles.cart}>
            <svg className={styles["icon-cart"]}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`} />
            </svg>
            {!!cart.length && <span className={styles.count}>{cart.length}</span>}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;

