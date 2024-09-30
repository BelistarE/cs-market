import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./css_modules/dropdown.module.css";

const Dropdown = ({ onSelect, reset }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Sort by");

  const { categoryName } = useParams();
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };
  useEffect(() => {
    if (reset) {
      setSelectedOption("Sort by");
    }
  }, [reset]);
  const handleClickOutside = (event) => {
    if (isOpen && !event.target.closest(`.${styles.dropdown}`)) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  return (
    <div className={styles.dropdown}>
      <button onClick={toggleDropdown} className={styles.dropdownButton}>
        {selectedOption}
        <span className={styles.arrow}>{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <div className={styles.dropdownContent}>
          <p onClick={() => handleSelect("Price: lowest to highest")}>
            Price: lowest to highest
          </p>
          <p onClick={() => handleSelect("Price: highest to lowest")}>
            Price: highest to lowest
          </p>
          {categoryName !== "knives" && (
            <>
              <p onClick={() => handleSelect("Rarity: lowest to highest")}>
                Rarity: lowest to highest
              </p>
              <p onClick={() => handleSelect("Rarity: highest to lowest")}>
                Rarity: highest to lowest
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
