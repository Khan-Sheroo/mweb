import React from 'react';

const PriceRangeFilter = ({ selectedPriceRange, setSelectedPriceRange }) => {
    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedPriceRange(prev =>
            prev.includes(value) ? prev.filter(range => range !== value) : [...prev, value]
        );
    };

    return (
        <div>
            <h2>Select Price Range</h2>
            <div>
                <input
                    type="checkbox"
                    id="range1"
                    name="PriceRange"
                    value="R0 - R669"
                    checked={selectedPriceRange.includes("R0 - R669")}
                    onChange={handleChange}
                />
                <label htmlFor="range1">R0 - R669</label>
            </div>
            <div>
                <input
                    type="checkbox"
                    id="range2"
                    name="PriceRange"
                    value="R700 - R900"
                    checked={selectedPriceRange.includes("R700 - R900")}
                    onChange={handleChange}
                />
                <label htmlFor="range2">R700 - R900</label>
            </div>
            <div>    
                <input
                    type="checkbox"
                    id="range3"
                    name="PriceRange"
                    value="R1000+"
                    checked={selectedPriceRange.includes("R1000+")}
                    onChange={handleChange}
                />
                <label htmlFor="range3">R1000+</label>
            </div>
        </div>
    );
};

export default PriceRangeFilter;