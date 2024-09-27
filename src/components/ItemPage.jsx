import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styles from './css_modules/itempage.module.css';
const ItemPage = () => {
  const { itemType, weaponType, skinName } = useParams();
  const location = useLocation();
  const { item } = location.state || {};

  if (!item) {
    return <p>Item not found.</p>;
  }

  return (
    <div className={styles.itemPage}>
    <div className={styles.left}><img src={item.image} alt={item.name} /> </div>
    <div className={styles.right}>
        <p>{item.weapon.name}</p>
        <p className={styles.pattern}>{item.pattern.name}</p>
    </div>
     
    </div>
  );
};

export default ItemPage;