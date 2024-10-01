import { Link } from "react-router-dom";
import styles from "./css_modules/header.module.css";
import { useCart } from "./context/CartContext";
import { useState } from "react";

function Header() {
  //stuff for cart
  const { cart } = useCart(); // Use the useCart hook to get the current cart state
  const currentItems = cart.length;
  const currentCost = cart
    .reduce((total, item) => {
      const price = parseFloat(item.price.replace("$", "")); // Assuming price is a string like "$10.00"
      return total + price;
    }, 0)
    .toFixed(2);

  const categories = [
    "knives",
    "gloves",
    "pistols",
    "rifles",
    "smgs",
    "heavy",
    "agents",
    "stickers",
  ];

  const knives = [
    "bayonet",
    "bowie knife",
    "butterfly knife",
    "falchion knife",
    "flip knife",
    "gut knife",
    "huntsman knife",
    "karambit",
    "m9 bayonet",
    "navaja knife",
    "shadow daggers",
    "skeleton knife",
    "stiletto knife",
    "talon knife",
    "ursus knife",
  ];
  const gloves = [
    "bloodhound gloves",
    "driver gloves",
    "hand wraps",
    "hydra gloves",
    "moto gloves",
    "specialist gloves",
    "sport gloves",
  ];
  const pistols = [
    "cz75-auto",
    "desert eagle",
    "dual berettas",
    "five-seven",
    "glock-18",
    "p2000",
    "p250",
    "r8 revolver",
    "tec-9",
    "usp-s",
  ];
  const rifles = [
    "ak-47",
    "aug",
    "awp",
    "famas",
    "g3sg1",
    "galil ar",
    "m4a1-s",
    "m4a4",
    "scar-20",
    "sg 553",
    "ssg 08",
  ];
  const smgs = ["mac-10", "mp5-sd", "mp7", "mp9", "pp-bizon", "p90", "ump-45"];
  const heavy = ["mag-7", "nova", "sawed-off", "xm1014", "m249", "negev"];
  const agents = ["Terrorist", "Counter Terrorist"];
  const stickers = ["foil", "glitter", "holo", "lenticular", "other"];
  const [selectedCategory, setSelectedCategory] = useState(null);

  const getSubcategories = (category) => {
    switch (category) {
      case "knives":
        return knives;
      case "gloves":
        return gloves;
      case "pistols":
        return pistols;
      case "rifles":
        return rifles;
      case "smgs":
        return smgs;
      case "heavy":
        return heavy;
      case "agents":
        return agents;
      case "stickers":
        return stickers;
      default:
        return [];
    }
  };

  return (
    <div className={styles.headercontainer}>
      <div className={styles.header}>
        <div className={styles.top}>
          <div className={styles.logo}>
            <Link to="/">
              <h1>NYAPORT</h1>
            </Link>
          </div>
          <div className={styles.search}>
            <input
              type="text"
              placeholder="Search for something"
              className={styles.searchInput}
            />
          </div>
          <div className={styles.cart}>
            <Link to="/cart" className={styles.cartItems}>
              <p className={styles.currentCart}>{`$${currentCost}`}</p>
              <p>{`(${currentItems})`}</p>
              <svg
                fill="#ffffff"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 902.86 902.86"
                xmlSpace="preserve"
              >
                <g>
                  <g>
                    <path
                      d="M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.751V577.829z
			 M685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z"
                    />
                    <path
                      d="M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717
			c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.743-108.744
			c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742
			C469.675,776.858,518.457,825.641,578.418,825.641z M209.46,716.897c0,22.467-18.277,40.744-40.743,40.744
			c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742C191.183,676.155,209.46,694.432,209.46,716.897z
			 M619.162,716.897c0,22.467-18.277,40.744-40.743,40.744s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.742,40.743-40.742
			S619.162,694.432,619.162,716.897z"
                    />
                  </g>
                </g>
              </svg>
            </Link>
          </div>
        </div>

        <div className={styles.bottom}>
          <nav className={styles.navbar}>
            <ul className={styles.links}>
              {categories.map((category) => (
                <li
                  key={category}
                  className={styles.link}
                  onMouseEnter={() => setSelectedCategory(category)}
                  onMouseLeave={() => setSelectedCategory(null)}
                >
                  {selectedCategory === category && (
                    <div className={styles.subcategories}>
                      <ul>
                        {getSubcategories(selectedCategory).map(
                          (subcategory) => (
                            <li key={subcategory}>
                              <Link
                                to={`/category/${selectedCategory}/${subcategory.replace(/ /g, "-")}`}
                              >
                                {selectedCategory === "knives"
                                  ? subcategory
                                      .replace(" knife", "")
                                      .toUpperCase()
                                  : selectedCategory === "gloves"
                                    ? subcategory
                                        .replace(" gloves", "")
                                        .toUpperCase()
                                    : subcategory.toUpperCase()}
                              </Link>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                  <Link to={`/category/${category}`}>{category}</Link>
                  <svg
                    fill="#ffffff"
                    height="10px"
                    width="10px"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 28.769 28.769"
                    xmlSpace="preserve"
                    className={styles.arrow}
                  >
                    <g>
                      <g id="c106_arrow"></g>
                      <path
                        d="M28.678,5.798L14.713,23.499c-0.16,0.201-0.495,0.201-0.658,0L0.088,5.798C-0.009,5.669-0.027,5.501,0.04,5.353
                          C0.111,5.209,0.26,5.12,0.414,5.12H28.35c0.16,0,0.31,0.089,0.378,0.233C28.798,5.501,28.776,5.669,28.678,5.798z"
                      />
                    </g>
                    <g id="Capa_1_26_"></g>
                  </svg>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Header;
