import React from "react";
import { useCart } from "./context/CartContext"; // Ensure the correct path to CartContext
import styles from "./css_modules/cartpage.module.css";

const CartPage = () => {
  const { cart } = useCart();
  console.log("CartPage cart state:", cart);
  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.title}>YOUR SHOPPING CART</h2>
      <div className={styles.containers}>
        <div className={styles.cart}>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul className={styles.cartList}>
              {cart.map((item, index) => (
                <li key={index} className={styles.cartItem}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={styles.cartImage}
                  />
                  <div className={styles.mid}>
                    <p>{item.name}</p>
                    <p>{item.wear}</p>
                  </div>
                  <div className={styles.prem}>
                    <p className={styles.price}>{item.price}</p>
                    <button className={styles.remove}>×</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={styles.summary}>
          <div className={styles.uppersum}>
            <p>Estimated total</p>
            <p>
              $
              {cart
                .reduce((total, item) => {
                  const price = parseFloat(item.price.replace("$", ""));
                  return total + price;
                }, 0)
                .toFixed(2)}
            </p>
          </div>
          <p>Sales tax will be calculated during checkout where applicable</p>
          <button className={styles.payment}>Continue to payment</button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
