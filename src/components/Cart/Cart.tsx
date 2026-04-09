import { useAppDispatch, useAppSelector } from "../App/hooks";

import {
  addItemToCart,
  removeItemFromCart,
} from "../../features/user/userSlice";

import styles from "../../styles/Cart.module.css";
import { sumBy } from "../../utils/common";
import { CartItem } from "../../types/cart.type";


const Cart = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.user.cart);

  const changeQuantity = (item: CartItem, quantity: number) => {
    dispatch(addItemToCart({ ...item, quantity }));
  };

  const removeItem = (id: CartItem["id"]) => {
    dispatch(removeItemFromCart(id));
  };

  return (
    <section className={styles.cart}>
      <h2 className={styles.title}>Your cart</h2>

      {!cart.length ? (
        <div className={styles.empty}>Here is empty</div>
      ) : (
        <>
          <div className={styles.list}>
            {cart.map((item) => {
              const { title, category, images, price, id, quantity } = item;
              const thumb = images[0] ?? "";
              return (
                <div className={styles.item} key={id}>
                  <div
                    className={styles.image}
                    style={{ backgroundImage: `url(${thumb})` }}
                  />
                  <div className={styles.info}>
                    <h3 className={styles.name}>{title}</h3>
                    <div className={styles.category}>{category.name}</div>
                  </div>
                  <div className={styles.price}>{price}$</div>
                  <div className={styles.quantity}>
                    <div
                      className={styles.minus}
                      onClick={() => {
                        changeQuantity(item, Math.max(1, quantity - 1));
                      }}
                    >
                      <svg className="icon">
                        <use
                          xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#minus`}
                        />
                      </svg>
                    </div>

                    <span>{quantity}</span>

                    <div
                      className={styles.plus}
                      onClick={() => {
                        changeQuantity(item, Math.max(1, quantity + 1));
                      }}
                    >
                      <svg className="icon">
                        <use
                          xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#plus`}
                        />
                      </svg>
                    </div>
                  </div>

                  <div className={styles.total}>{price * quantity}$</div>

                  <div
                    className={styles.close}
                    onClick={() => removeItem(item.id)}
                  >
                    <svg className="icon">
                      <use
                        xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`}
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.actions}>
            <div className={styles.total}>TOTAL PRICE: </div>
            <span>
              {sumBy(
                cart.map(({ quantity, price }) => quantity * price),
              )}
              $
            </span>

            <button className={styles.proceed}>
              Proceed to checkout
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
