import React, { useEffect, useState } from "react";
import styles from "./css_modules/market.module.css"; // CSS module for styling

const Stickers = () => {
  const [stickers, setStickers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleStickers, setVisibleStickers] = useState(40); // Move this to the top level

  useEffect(() => {
    const fetchstickers = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://bymykel.github.io/CSGO-API/api/en/stickers.json"
        );
        const data = await response.json();
        setStickers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stickers:", error);
        setLoading(false);
      }
    };

    fetchstickers();
  }, []);

  if (loading) {
    return <p>Loading stickers...</p>;
  }

  if (stickers.length === 0) {
    return <p>No stickers found.</p>;
  }

  return (
    <div className={styles.grid}>
      {stickers.slice(0, visibleStickers).map((sticker, index) => {
        const stickerName = sticker.name.split("|").pop().trim();
        return (
          <div key={index}>
            <img src={sticker.image} alt={stickerName} />
            <p>{stickerName}</p>
          </div>
        );
      })}
      {visibleStickers < stickers.length && (
        <button onClick={() => setVisibleStickers(visibleStickers + 30)}>
          Load more
        </button>
      )}
    </div>
  );
};

export default Stickers;
