import React, { useState } from 'react';
import './FilterBar.css';

const FilterBar: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    electronics: false,
    fashion: false,
    homeAppliances: false,
    minPrice: 0,
    maxPrice: 500,
  });

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), selectedFilters.maxPrice - 1); // Ensure minPrice < maxPrice
    setSelectedFilters({ ...selectedFilters, minPrice: value });
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), selectedFilters.minPrice + 1); // Ensure maxPrice > minPrice
    setSelectedFilters({ ...selectedFilters, maxPrice: value });
  };

  const handleApplyFilters = () => {
    console.log('Applied Filters:', selectedFilters);
    alert(`Filters applied! Price range: $${selectedFilters.minPrice} - $${selectedFilters.maxPrice}`);
  };

  return (
    <div className="filter-bar">
      <h3>Filters</h3>
      <label>
        <input
          type="checkbox"
          onChange={(e) =>
            setSelectedFilters({ ...selectedFilters, electronics: e.target.checked })
          }
        />
        Electronics
      </label>
      <label>
        <input
          type="checkbox"
          onChange={(e) =>
            setSelectedFilters({ ...selectedFilters, fashion: e.target.checked })
          }
        />
        Fashion
      </label>
      <label>
        <input
          type="checkbox"
          onChange={(e) =>
            setSelectedFilters({ ...selectedFilters, homeAppliances: e.target.checked })
          }
        />
        Home Appliances
      </label>
      <div className="price-range">
        <h4>Price Range</h4>
        <div className="slider-container">
          <div className="price-labels">
            <span>${selectedFilters.minPrice}</span>
            <span>${selectedFilters.maxPrice}</span>
          </div>
          <div className="sliders">
            {/* Lower Limit Slider */}
            <input
              type="range"
              min="0"
              max="500"
              value={selectedFilters.minPrice}
              onChange={handleMinPriceChange}
              className="slider"
            />
            {/* Upper Limit Slider */}
            <input
              type="range"
              min="0"
              max="500"
              value={selectedFilters.maxPrice}
              onChange={handleMaxPriceChange}
              className="slider"
            />
          </div>
        </div>
      </div>
      <button className="apply-button" onClick={handleApplyFilters}>Apply</button>
    </div>
  );
};

export default FilterBar;
