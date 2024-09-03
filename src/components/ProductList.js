import React from "react";



const ProductList = ({ products }) => {
    return ( 
        <div className="product-list">
            {products.map((product, index) => (
                // Find the provider's info based on the provider code and unique key
                    <div className="product-card" key={`${product.productCode}-${product.provider}-${index}`}>
                        
                        {/* Display provider logo or a placeholder if logo url is not available*/}
                            <img 
                            src={product.providerLogo ? product.providerLogo : `${process.env.PUBLIC_URL}/fibre.jpg`}  
                            alt={product.provider} 
                            className={`product-logo ${!product.providerLogo ? 'placeholder-logo' : ''}`}
                            onError={(e) => {
                                e.target.oneerror =null;
                                e.target.src = `${process.env.PUBLIC_URL}/fibre.jpg`;
                                e.target.classList.add('placeholder-logo');
                            }}
                        />
                        <div className="product-info">
                            <h3>{product.productName}</h3>
                            <p><b>R{product.productRate}pm</b></p>  
                             
                        </div>
                        <button className="check-coverage-button">Check Coverage</button> 
                    </div>
                ))}
            </div>
        );
    };

export default ProductList;

