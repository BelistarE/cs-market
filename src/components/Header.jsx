import { Link } from "react-router-dom";
import styles from "./css_modules/header.module.css";

function Header() {
  const categories = [
    "KNIFE",
    "GLOVES",
    "PISTOLS",
    "RIFLES",
    "SMG",
    "HEAVY",
    "AGENT",
    "STICKERS",
  ];

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
              <li key={category}>
                <Link to={`/category/${category}`}>{category}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
