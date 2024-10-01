import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css_modules/submarket.module.css";
import Dropdown from "./Dropdown";

function SubMarket() {
  const { categoryName, subCategoryName } = useParams(); // Get the category name from the URL
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [prices, setPrices] = useState({});
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState({});
  const navigate = useNavigate();
  const [sortedItems, setSortedItems] = useState(filteredItems);
  const [resetDropdown, setResetDropdown] = useState(false);

  const Arrow = () => (
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
  );

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);

        // Fetch both APIs
        const [itemsResponse, pricesResponse] = await Promise.all([
          fetch("https://bymykel.github.io/CSGO-API/api/en/skins.json"),
          fetch("/USD.json"),
        ]);

        const itemsData = await itemsResponse.json();
        const pricesData = await pricesResponse.json();

        // Create a map of prices, removing wear info from market_hash_name
        const pricesMap = pricesData.items.reduce((acc, item) => {
          // Extract the base name by removing the wear condition in parentheses
          const baseName = item.market_hash_name
            .replace(/\s*\(.*?\)$/, "") // Remove wear condition
            .trim();
          // Initialize the array for this base name if it doesn't exist
          if (!acc[baseName]) {
            acc[baseName] = [];
          }

          // Push the price into the array
          acc[baseName].push(parseFloat(item.price));
          return acc;
        }, {});

        // Find the min and max prices for each item
        const prices = Object.keys(pricesMap).reduce((acc, key) => {
          acc[key] = {
            min: Math.min(...pricesMap[key]),
            max: Math.max(...pricesMap[key]),
          };
          return acc;
        }, {});

        setItems(itemsData);
        setPrices(prices);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching items or prices:", error);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    if (!items.length) return;

    // Filter items to match the subCategoryName (weapon name)
    const filtered = items.filter((item) => {
      return (
        item.weapon?.name?.toLowerCase().replace(/\s/g, "-") ===
        subCategoryName.toLowerCase()
      );
    });

    setFilteredItems(filtered);
    setSortedItems(filtered);
  }, [items, subCategoryName]);
  useEffect(() => {
    // Reset the dropdown when categoryName or subCategoryName changes
    setResetDropdown(true);
    // Reset the flag after a short delay to allow the Dropdown component to reset
    setTimeout(() => setResetDropdown(false), 0);
  }, [categoryName, subCategoryName]);

  if (loading) {
    return <p>Loading items...</p>;
  }

  if (filteredItems.length === 0) {
    return <p>No items found for {subCategoryName}.</p>;
  }

  const handleImageLoad = (id) => {
    setImageLoading((prev) => ({ ...prev, [id]: false }));
  };

  const handleItemClick = (item) => {
    navigate(
      `/category/${item.category.name.toLowerCase()}/${item.weapon.name.toLowerCase().replace(/\s/g, "")}/${item.pattern.id}`,
      { state: { item, prices: prices[item.name] } }
    );
  };
  const rarityRank = {
    rarity_common_weapon: 1, // Light blue
    rarity_uncommon_weapon: 2, // Blue
    rarity_rare_weapon: 3, // Darker blue
    rarity_mythical_weapon: 4, // Purple
    rarity_legendary_weapon: 5, // Pink
    rarity_ancient_weapon: 6, // Red
    rarity_contraband_weapon: 7, // Orange (rare, removed skins)
    rarity_ancient: 8, // Gold (Knives and Gloves)
  };
  const handleSort = (option) => {
    let sortedArray = [...filteredItems];

    if (option === "Price: lowest to highest") {
      sortedArray.sort((a, b) => {
        const priceA = prices[a.name]?.min || Infinity; // Use Infinity if price is not available
        const priceB = prices[b.name]?.min || Infinity;
        return priceA - priceB;
      });
    } else if (option === "Price: highest to lowest") {
      sortedArray.sort((a, b) => {
        const priceA = prices[a.name]?.min || 0; // Use 0 if price is not available
        const priceB = prices[b.name]?.min || 0;
        return priceB - priceA;
      });
    } else if (option === "Rarity: lowest to highest") {
      sortedArray.sort((a, b) => {
        const rarityA = rarityRank[a.rarity.id] || 0;
        const rarityB = rarityRank[b.rarity.id] || 0;
        return rarityA - rarityB;
      });
    } else if (option === "Rarity: highest to lowest") {
      sortedArray.sort((a, b) => {
        const rarityA = rarityRank[a.rarity.id] || 0;
        const rarityB = rarityRank[b.rarity.id] || 0;
        return rarityB - rarityA;
      });
    }

    setSortedItems(sortedArray);
  };

  return (
    <div>
      <div className={styles.uppermarket}>
        <div className={styles.left}>
          <p>{categoryName}</p>
          <Arrow />
          <p className={styles.subcat}>{subCategoryName}</p>
        </div>
        <div className={styles.right}>
          <Dropdown onSelect={handleSort} reset={resetDropdown} />

          <p>{sortedItems.length} items</p>
        </div>
      </div>

      <div className={`${styles.grid}`}>
        {sortedItems.map((item) => {
          // Normalize the itemName from the items API by removing wear-related text
          const itemName = item.name;

          return (
            <div
              key={item.id}
              className={`${styles.gridItem}`}
              onClick={() => handleItemClick(item)}
            >
              {imageLoading[item.id] !== false && (
                <div className={styles.placeholder}></div>
              )}

              <img
                src={item.image}
                alt={itemName}
                className={styles.itemImage}
                onLoad={() => handleImageLoad(item.id)}
              />

              <div className={styles.prices}>
                <p>
                  $
                  {prices[itemName]?.min
                    ? prices[itemName].min >= 1000
                      ? prices[itemName].min
                          .toFixed(0)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      : prices[itemName].min.toFixed(2)
                    : "N/A"}
                  {" - "}$
                  {prices[itemName]?.max
                    ? prices[itemName].max >= 1000
                      ? prices[itemName].max
                          .toFixed(0)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      : prices[itemName].max.toFixed(2)
                    : "N/A"}
                </p>
              </div>

              <p style={{ color: item.rarity.color }}>
                {itemName.split(" | ")[0]}
              </p>
              <p>{itemName.split(" | ")[1]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SubMarket;
