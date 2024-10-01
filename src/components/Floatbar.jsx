import React from "react";
import styles from "./css_modules/floatbar.module.css";

const FloatBar = ({ minFloat, maxFloat }) => {
  // Scale the float values to percentage for arrow positions
  const minFloatPos = `${minFloat * 100}%`;
  const maxFloatPos = `${maxFloat * 100}%`;

  return (
    <div className={styles.wearinfo}>
      <div className={styles.floatBarContainer}>
        <div className={styles.floatBar}>
          <div className={styles.arrow} style={{ left: minFloatPos }}>
            ▼
          </div>

          <div className={styles.arrow} style={{ left: maxFloatPos }}>
            ▼
          </div>
        </div>
        {/* Display the float values under the arrows */}
        <div className={styles.floatValues}>
          <span style={{ left: minFloatPos }}>{minFloat}</span>
          <span style={{ left: maxFloatPos }}>{maxFloat}</span>
        </div>
      </div>
      <div className={styles.tooltipContainer}>
        <span className={styles.tooltipIcon}>i</span>
        <div className={styles.tooltipText}>min and max float values</div>
      </div>
    </div>
  );
};

export default FloatBar;
