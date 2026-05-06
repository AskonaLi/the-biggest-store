import styles from "../../styles/Categories.module.css";
import { Link } from "react-router-dom";

import { Category } from "../../types/category.type";

type CategoriesProps = {
  title: string;
  categories?: Category[];
  amount: number;
};

const Categories = ({ title, categories = [], amount }: CategoriesProps) => {
  const list = amount > 0 ? categories.slice(0, amount) : [];

  return (
    <section className={styles.section}>
      <h2>{title}</h2>

      <div className={styles.list}>
        {list.map(({ id, name, image }) => (
          <Link to={`/categories/${id}`} key={id} className={styles.item}>
            <div
              className={styles.image}
              style={
                image ? { backgroundImage: `url(${image})` } : undefined
              }
            />
            <h3 className={styles.title}>{name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
