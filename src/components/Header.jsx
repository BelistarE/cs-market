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
    <div className={styles.header}>
      <div className={styles.top}>
        <div className={styles.logo}>
          <Link to="/">
            <h1>NYAPORT</h1>
          </Link>
        </div>
      </div>

      <div className={styles.bottom}>
        <nav>
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
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
