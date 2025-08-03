import React from "react";

import { Link } from "react-router-dom";

import styles from "../../styles/Header.module.css";
import { ROUTES } from "../../utils/routes";

import LOGO from "../../images/stuff-logo.svg";
import AVATAR from "../../images/avatar-cat.jpg";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}></Link>
        <img src={LOGO} alt="Stuff" />
      </div>

      <nav className={styles.info}>
        <div className={styles.user}>
          <div
            className={styles.avatar}
            style={{ backgroundImage: `url(${AVATAR})` }}
          />
          <div className={styles.username}>Guest</div>
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
              onChange={() => {}}
              value=""
            />
          </div>

          {false && <div className={styles.box}></div>}
        </form>

        <div className={styles.account}>
          <Link to={ROUTES.HOME} className={styles.favorites}>
            <svg className={styles["icon-fav"]}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
            </svg>
          </Link>
          <Link to={ROUTES.CART} className={styles.cart}>
            <svg className={styles["icon-cart"]}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`} />
            </svg>
            <span className={styles.count}>2</span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
