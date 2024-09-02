
import React from 'react';


const PriceRangeFilter = ({ selectedPriceRange, setSelectedPriceRange }) => {
  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectedPriceRange(value ? [value] : []);
  };

  return (
    <select
      className="price-range-select"
      value={selectedPriceRange[0] || ''}
      onChange={handleSelectChange}
    >
      <option value="">Select a price range</option>
      <option value="R0 - R669">R0 - R669</option>
      <option value="R700 - R900">R700 - R900</option>
      <option value="R1000+">R1000+</option>
    </select>
  );
};

export default PriceRangeFilter;
