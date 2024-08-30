import React from "react";

const ProductList = ({ products }) => {
    console.log('Products in Productlist:', products);
    return (
        <div>              
            {products.map(product => (
                <div key ={product.productCode}>
                    <p>Provider: {product.provider}</p>
                    <p>Name: {product.productName}</p>
                    <p>Price: {product.productRate}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductList;