import React from 'react';

const PriceRangeFilter = ({ selectedPriceRange, setSelectedPriceRange }) => {
  // Handle the selection change event
  const handleSelectChange = (e) => {
    const value = e.target.value;
    // Update the selected price range state; if no value, set to an empty array
    setSelectedPriceRange(value ? [value] : []);
  };

  return (
    <select
      className="price-range-select"
      value={selectedPriceRange[0] || ''} // Default to an empty string if no value is selected
      onChange={handleSelectChange} // Call handleSelectChange on value change
    >
      <option value="">Select a price range</option>
      <option value="R0 - R669">R0 - R669</option>
      <option value="R700 - R900">R700 - R900</option>
      <option value="R1000+">R1000+</option>
    </select>
  );
};

export default PriceRangeFilter;