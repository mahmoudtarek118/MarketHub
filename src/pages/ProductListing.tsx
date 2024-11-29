import React, { useState } from 'react';
import NavbarOther from '../components/NavbarOther';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';
import './ProductListing.css';

const products = [
  { id: 1, image: 'https://via.placeholder.com/150', title: 'Stylish Shoes', price: 50 },
  { id: 2, image: 'https://via.placeholder.com/150', title: 'Elegant Watch', price: 120 },
  { id: 3, image: 'https://via.placeholder.com/150', title: 'Classic Handbag', price: 90 },
  { id: 4, image: 'https://via.placeholder.com/150', title: 'Trendy Jacket', price: 150 },
  { id: 5, image: 'https://via.placeholder.com/150', title: 'Modern Headphones', price: 200 },
  { id: 6, image: 'https://via.placeholder.com/150', title: 'Smartphone', price: 800 },
  { id: 7, image: 'https://via.placeholder.com/150', title: 'Laptop', price: 1000 },
  { id: 8, image: 'https://via.placeholder.com/150', title: 'Smartwatch', price: 300 },
  { id: 9, image: 'https://via.placeholder.com/150', title: 'Ipad', price: 350 },
  { id: 10, image: 'https://via.placeholder.com/150', title: 'Mouse', price: 320 },
];

const ProductListing: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  const [isFilterVisible, setIsFilterVisible] = useState(false);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const toggleFilters = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  return (
    <div>
      <NavbarOther />
      <div className="product-listing">
        <button className="filter-button" onClick={toggleFilters}>
          Filters
        </button>

        {/* Offcanvas Filter */}
        <div className={`offcanvas ${isFilterVisible ? 'show' : ''}`}>
          <div className="offcanvas-content">
            <button className="close-button" onClick={toggleFilters}>
              ×
            </button>
            <FilterBar />
          </div>
        </div>

        {/* Backdrop */}
        {isFilterVisible && <div className="offcanvas-backdrop" onClick={toggleFilters}></div>}

        {/* Product Grid */}
        <div className="product-grid">
          {currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={{
                id: product.id,
                name: product.title,
                price: product.price,
              }}
              id={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              showAddToCart={true}
            />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalProducts={products.length}
          productsPerPage={productsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
      <Footer />
    </div>
  );
};

export default ProductListing;
