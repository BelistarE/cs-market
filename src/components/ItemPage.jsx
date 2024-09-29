import React from "react";
import { useParams, useLocation } from "react-router-dom";
import styles from "./css_modules/itempage.module.css";
const arrow = () => (
  <svg
    fill="#ffffff"
    height="10px"
    width="10px"
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 330 330"
    xmlSpace="preserve"
    className={styles.arrow}
  >
    <path
      id="XMLID_222_"
      d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001
c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213
C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606
C255,161.018,253.42,157.202,250.606,154.389z"
    />
  </svg>
);
const ItemPage = () => {
  const { itemType, weaponType, skinName } = useParams();
  const location = useLocation();
  const { item } = location.state || {};

  if (!item) {
    return <p>Item not found.</p>;
  }

  return (
    <div className={styles.itemPage}>
      <div className={styles.left}>
        <div className={styles.upper}>
          <div className={styles.nav}>
            <p>{item.category.name}</p>
            {arrow()}
            <p>{item.weapon.name}</p>
            {arrow()}
            <p className={styles.last}>{item.pattern.name}</p>
          </div>
          <img src={item.image} alt={item.name} className={styles.image} />
          <div
            style={{
              backgroundColor: `${item.rarity.color}`,
              width: "90%",
              borderRadius: "15px",
            }}
            className={styles.rarityContainer}
          >
            <p className={styles.rarity}>{item.rarity.name}</p>
          </div>
        </div>
        <div className={styles.lower}>
          <p
            className={styles.description}
            dangerouslySetInnerHTML={{
              __html: (item.description || "No description available.")
                .split(/\r?\\n|\r/)
                .map((line) => line.trim())
                .filter((line) => line.length > 0)
                .join("<br>"),
            }}
          ></p>
        </div>
      </div>
      <div className={styles.right}>
        <p>{item.weapon.name}</p>
        <p className={styles.pattern}>{item.pattern.name}</p>
        <button className={styles.buy}>Add to cart</button>
        <div className={styles.conditions}>
          <ul className={styles.wears}>
            {item.wears.map((wear) => (
              <li key={wear.id}>{wear.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
