import React from "react";

import styles from "../../styles/Footer.module.css";

import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

import LOGO from "../../images/stuff-logo.svg";

const Footer = () => {
  return (
    <section className={styles.footer}>
      <div className={styles.logo}>
        <Link to={ROUTES.HOME}></Link>
        <img src={LOGO} alt="Stuff" />
      </div>

      <nav className={styles.rights}>
        Developed by{" "}
        <a href="https://github.com/AskonaLi" target="_blank" rel="noreferrer">
          Askona Li
        </a>
      </nav>
      <div className={styles.socials}>
        <a href="https://github.com/AskonaLi" target="_blank" rel="noreferrer">
          <svg className="icon">
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#youtube`} />
          </svg>
        </a>
        
        <a href="https://github.com/AskonaLi" target="_blank" rel="noreferrer">
          <svg className="icon">
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#facebook`} />
          </svg>
        </a>

        <a href="https://github.com/AskonaLi" target="_blank" rel="noreferrer">
          <svg className="icon">
            <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#instagram`} />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Footer;
