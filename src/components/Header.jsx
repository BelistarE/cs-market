import { Link } from "react-router-dom";
import styles from "./css_modules/header.module.css";
import { useState } from "react";

function Header() {
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
    "fiveseven",
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
              
                <Link to={`/category/${category}`}>{category}</Link>
                {selectedCategory === category && (
                  <div className={styles.subcategories}>
                    <ul>
                      {getSubcategories(selectedCategory).map((subcategory) => (
                        <li key={subcategory}>
                          <Link
                            to={`/category/${selectedCategory}/${subcategory}`}
                          >
                            {selectedCategory === "knives"
                              ? subcategory.replace(" knife", "").toUpperCase()
                              : selectedCategory === "gloves"
                              ? subcategory.replace(" gloves", "").toUpperCase()
                              : subcategory.toUpperCase()} 
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <svg fill="#ffffff" height="10px" width="10px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" 
                   viewBox="0 0 28.769 28.769" xmlSpace="preserve" className={styles.arrow}>
                  <g>
                    <g id="c106_arrow">
                      <path d="M28.678,5.798L14.713,23.499c-0.16,0.201-0.495,0.201-0.658,0L0.088,5.798C-0.009,5.669-0.027,5.501,0.04,5.353
                        C0.111,5.209,0.26,5.12,0.414,5.12H28.35c0.16,0,0.31,0.089,0.378,0.233C28.798,5.501,28.776,5.669,28.678,5.798z"/>
                    </g>
                    <g id="Capa_1_26_">
                    </g>
                  </g>
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
