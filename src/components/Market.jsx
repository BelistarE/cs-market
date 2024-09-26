import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./css_modules/market.module.css";
import ArrowIcon from "../assets/arrow.svg";

function Market() {
  const { categoryName } = useParams(); // Get the category name from the URL
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://bymykel.github.io/CSGO-API/api/en/skins.json"
        );
        const data = await response.json();
        setItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching items:", error);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    if (!items.length) return; // Don't filter if items haven't loaded yet

    const filtered = items.filter((item) => {
      if (!item.category || !item.category.name) return false;
      if (typeof categoryName !== "string") return false;
      return item.category.name.toLowerCase() === categoryName.toLowerCase();
    });

    setFilteredItems(filtered);
  }, [items, categoryName]);

  if (loading) {
    return <p>Loading items...</p>;
  }

  if (filteredItems.length === 0) {
    return <p>No items found for {categoryName}.</p>;
  }

  return (
    <div>
      <div className={styles.uppermarket}>
        <div className={styles.left}>
          <p>{categoryName}</p>
          <svg
            fill="#000000"
            height="800px"
            width="800px"
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
          <p className={styles.subcat}> all {categoryName}</p>
        </div>

        <p>{filteredItems.length} items</p>
      </div>

      <div className={styles.grid}>
        {filteredItems.map((item) => {
          const itemName = item.name.split("|").pop().trim(); // Remove '|' and everything before it
          return (
            <div key={item.id} className={styles.gridItem}>
              <img
                src={item.image}
                alt={itemName}
                className={styles.itemImage}
              />
              <p>{itemName}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Market;
