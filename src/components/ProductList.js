import React from "react";
import providerInfo from "./providerInfo";


const ProductList = ({ products }) => {
    const placeHolderImage = '/public/images/fibre.jpg';

    const handleImageError = (e) => {
        e.target.src = placeHolderImage;
    };
    console.log("Provider:", providerInfo);
    return ( 
        <div className="product-list">
            {products.map((product, index) => {
                // Find the provider's info based on the provider code
               
                

                return (
                    <div className="product-card" key={`${product.productCode}-${product.provider}-${index}`}>
                        <div className="product-info">
                            
                            <h3>{product.productName}</h3>
                            <img src={product.providerLogo || placeHolderImage}  alt={product.provider} className="provider-logo" onError={handleImageError} />
                            <p><b>R{product.productRate}pm</b></p>
                    
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ProductList;

