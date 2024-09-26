import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./css_modules/market.module.css"; // CSS module for styling

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
              <h3>{itemName}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Market;
