import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import ProductGrid from "../ProductGrid/ProductGrid";

const ProductList = ({ products, onCart }) => {
    // Component to display the product list
    return (
        <ProductGrid>
            {products.map((product, idx) => {
                return <ProductCard product={product} key={idx} onCart={onCart} />;
            })}
        </ProductGrid>
    );
};

export default ProductList;
