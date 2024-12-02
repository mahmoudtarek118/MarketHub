import React from 'react';
import './Filters.css';


const Filters: React.FC = () => {
  return (
    <aside className="filters">
      <h3>Keywords</h3>
      <div className="filter-tags">
        <span className="tag">Spring</span>
        <span className="tag">Smart</span>
        <span className="tag">Modern</span>
      </div>
      <h4>Label</h4>
      <label><input type="checkbox" /> Label Description</label>
      <label><input type="checkbox" /> Label Description</label>
      <label><input type="checkbox" /> Label Description</label>
      <h4>Price</h4>
      <input type="range" min="0" max="100" />
      <h4>Color</h4>
      <label><input type="checkbox" /> Color 1</label>
      <label><input type="checkbox" /> Color 2</label>
      <h4>Size</h4>
      <label><input type="checkbox" /> Small</label>
      <label><input type="checkbox" /> Medium</label>
      <label><input type="checkbox" /> Large</label>
    </aside>
  );
};

export default Filters;
