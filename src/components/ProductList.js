import React from "react";

const ProductList = ({ products }) => {
    return (
        <div>
            <ul>              
            {products.map((product, index) => (
                <li key ={`${product.productCode}-${index}`}>
                    {product.productName} - <b>R{product.productRate}</b>
                </li>
            ))}
            </ul>
        </div>
    );
};

export default ProductList;