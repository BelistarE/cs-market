import React from "react";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import FloatBar from "./FloatBar";
import styles from "./css_modules/itempage.module.css";
import { useCart } from "./context/CartContext";
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
  const [pricesData, setPricesData] = useState([]);
  const [selectedWear, setSelectedWear] = useState(null);
  const [itemImage, setItemImage] = useState(item.image);
  const [filteredItems, setFilteredItems] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    // Fetch USD data
    fetch("/USD.json")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.items)) {
          setPricesData(data.items);
        } else {
          console.error("USD data is not an array.");
        }
      })
      .catch((error) => console.error("Error fetching USD data:", error));

    // Fetch skins data that is associated with item.name
    fetch("https://bymykel.github.io/CSGO-API/api/en/skins_not_grouped.json")
      .then((response) => response.json())
      .then((data) => {
        const filteredItems = data.filter((skin) => {
          const cleanSkinName = skin.name.replace(/\s*\(.*?\)\s*/g, "");
          return cleanSkinName === item.name;
        });
        console.log(filteredItems);
        setFilteredItems(filteredItems);
      })
      .catch((error) => console.error("Error fetching skins data:", error));
  }, [item?.name]); //  avoid issues if item is undefined
  //handle add to cart
  const handleAddToCart = () => {
    const getPrice = (itemName, wearName) => {
      const marketHashName = `${itemName} (${wearName})`;

      if (!Array.isArray(pricesData)) {
        return "Price data is unavailable";
      }

      const priceObject = pricesData.find(
        (price) => price.market_hash_name === marketHashName
      );
      return priceObject
        ? `$${parseFloat(priceObject.price).toFixed(2)}`
        : "not in stock";
    };
    if (selectedWear) {
      const { wear, isStatTrak } = selectedWear;
      const itemName = isStatTrak ? `StatTrak™ ${item.name}` : item.name;
      const price = getPrice(itemName, wear.name);
      const image = item.image; // Assuming item has an image property

      const cartItem = {
        name: itemName,
        wear: wear.name,
        price,
        image,
      };

      addToCart(cartItem);
      console.log("Cart item added:", cartItem);
    }
  };
  const renderConditions = () => {
    if (!item || pricesData.length === 0) {
      return <p>Loading...</p>;
    }

    const getPrice = (itemName, wearName) => {
      const marketHashName = `${itemName} (${wearName})`;

      if (!Array.isArray(pricesData)) {
        return "Price data is unavailable";
      }

      const priceObject = pricesData.find(
        (price) => price.market_hash_name === marketHashName
      );
      return priceObject
        ? `$${parseFloat(priceObject.price).toFixed(2)}`
        : "not in stock";
    };
    //selected pricing
    const handleWearClick = (wear, isStatTrak = false) => {
      setSelectedWear({ wear, isStatTrak });
      const myItem = filteredItems.filter(
        (filteredItem) => filteredItem.wear.name === wear.name
      );
      setItemImage(myItem[0].image);
    };

    const renderSelectedPrice = () => {
      if (!selectedWear) return "Select a condition";

      const wearName = selectedWear.wear.name;
      const itemName = selectedWear.isStatTrak
        ? `StatTrak™ ${item.name}`
        : item.name;

      return getPrice(itemName, wearName);
    };
    if (item.stattrak) {
      return (
        <>
          <p className={styles.type}></p>
          <p className={styles.price}>{renderSelectedPrice()}</p>
          <button className={styles.buy} onClick={handleAddToCart}>
            Add to cart
          </button>
          <div className={styles.conditions}>
            <div className={styles.wears}>
              {item.wears.map((wear) => (
                <div
                  key={wear.id}
                  className={`${styles.wear} ${
                    selectedWear &&
                    selectedWear.wear.id === wear.id &&
                    !selectedWear.isStatTrak
                      ? styles.selected
                      : ""
                  }`}
                  onClick={() => handleWearClick(wear, false)}
                >
                  <p>{wear.name}</p>
                  <p>{getPrice(item.name, wear.name)}</p>
                </div>
              ))}
              {item.wears.map((wear) => (
                <div
                  key={wear.id}
                  className={`${styles.wear} ${
                    selectedWear &&
                    selectedWear.wear.id === wear.id &&
                    selectedWear.isStatTrak
                      ? styles.selected
                      : ""
                  }`}
                  onClick={() => handleWearClick(wear, true)}
                >
                  <div className={styles.statrakcontainer}>
                    <p className={styles.stattrak}>StatTrak™</p>
                    <p> {wear.name}</p>
                  </div>

                  <p>{getPrice(`StatTrak™ ${item.name}`, wear.name)}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <p className={styles.price}>{renderSelectedPrice()}</p>
          <button className={styles.buy} onClick={handleAddToCart}>
            Add to cart
          </button>
          <div className={styles.conditions}>
            <div className={styles.wears}>
              {item.wears.map((wear) => (
                <div
                  key={wear.id}
                  className={`${styles.wear} ${
                    selectedWear &&
                    selectedWear.wear.id === wear.id &&
                    !selectedWear.isStatTrak
                      ? styles.selected
                      : ""
                  }`}
                  onClick={() => handleWearClick(wear, false)} // Handle click for non-StatTrak items
                >
                  <p>{wear.name}</p>
                  <p>{getPrice(item.name, wear.name)}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      );
    }
  };

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
          <img src={itemImage} alt={item.name} className={styles.image} />
          <FloatBar minFloat={item.min_float} maxFloat={item.max_float} />
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
          <div className={styles.crates}>
            {item.crates.length > 0 && <p className={styles.conk}>Crates:</p>}
            <ul className={styles.cratesGrid}>
              {item.crates.map((crate) => (
                <li key={crate.id} className={styles.crateItem}>
                  <img
                    src={crate.image}
                    alt={crate.name}
                    className={styles.crateImage}
                  />
                  {crate.name}
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.collections}>
            {item.collections.length > 0 && (
              <p className={styles.conk}>Collections:</p>
            )}
            <ul className={styles.collectionsGrid}>
              {item.collections.map((collection) => (
                <li key={collection.id}>
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className={styles.crateImage}
                  />
                  {collection.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <p className={styles.name}>{item.weapon.name}</p>
        <p className={styles.pattern}>{item.pattern.name}</p>
        <div className={styles.pricing}>{renderConditions()}</div>
      </div>
    </div>
  );
};

export default ItemPage;
