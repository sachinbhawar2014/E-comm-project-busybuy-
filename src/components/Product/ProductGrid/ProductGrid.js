import React from "react";
import styles from "./ProductGrid.module.css";

// Component mainly for styling purpose
const ProductGrid = ({ children }) => {
    return <div className={styles.grid}>{children}</div>;
};

export default ProductGrid;
