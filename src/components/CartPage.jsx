import React from "react";
import { useCart } from "./context/CartContext"; // Ensure the correct path to CartContext
import styles from "./css_modules/cartpage.module.css";

const CartPage = () => {
  const { cart } = useCart();
  console.log("CartPage cart state:", cart);
  return (
    <div className={styles.cartContainer}>
      <h2>Cart</h2>
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
              <div>
                <p>{item.name}</p>
                <p>{item.wear}</p>
                <p>{item.price}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartPage;
