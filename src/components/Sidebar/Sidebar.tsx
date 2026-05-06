import React from "react";

import styles from "../../styles/Sidebar.module.css";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../App/hooks";

const Sidebar = () => {
  const { list } = useAppSelector(({ categories }) => categories);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.title}>Categories</div>
      <nav>
        <ul className={styles.menu}>
          {list.map(({ id, name }) => (
            <li key={id}>
              <NavLink
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ""}`
                }
                to={`/categories/${id}`}
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.footer}>
        <a href="/help" target="_blank" className={styles.link}>
          Help
        </a>
        <a
          href="/terms"
          target="_blank"
          style={{ textDecoration: "underline" }}
          className={styles.link}
        >
          Terms & Conditions
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
