import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import NavbarOther from '../components/NavbarOther';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';
import './ProductListing.css';
import shoes from '../assets/Shoes/{29BA62A7-D1EF-45F7-BC9E-B3A656A663BB}.png'; 
import handbag from '../assets/Handbag/{22974876-F32E-4DC8-ADBC-D0B9B86F7900}.png'; 
import whatch from '../assets/Classic Whatch/{37A84DE9-9DE1-4E43-BAFD-C69B68437386}.png'; 
import jacket from '../assets/Jacket/{20523607-3D86-4AD6-BCC1-E4DEB5227F4D}.png'; 
import headphone from '../assets/Headphones/{096138E5-F015-4ACC-A019-EEA0988635DB}.png'; 
import phone from '../assets/Phone/{6083D78D-F418-45F5-8265-D50320656EED}.png'; 
import laptop from '../assets/Laptop/{3DCF2454-A5C0-4E7E-BB92-8DD6391E813A}.png'; 
import swatch from '../assets/Smart Whatch/{18A4EAE6-0BE4-44A7-A116-1DDAC99F7321}.png'; 
import ipad from '../assets/Ipad/{3E3B69D5-AC89-4587-8C4D-E296F2A593F9}.png'; 
import mouse from '../assets/Mouse/{996BDAEF-E47D-4306-8F9D-96991F35B760}.png'; 




const products = [
  { id: 1, image: shoes, title: 'Stylish Shoes', price: 50 },
  { id: 2, image: whatch, title: 'Elegant Watch', price: 120 },
  { id: 3, image: handbag, title: 'Classic Handbag', price: 90 },
  { id: 4, image: jacket, title: 'Trendy Jacket', price: 150 },
  { id: 5, image: headphone, title: 'Modern Headphones', price: 200 },
  { id: 6, image: phone, title: 'Smartphone', price: 800 },
  { id: 7, image: laptop, title: 'Laptop', price: 1000 },
  { id: 8, image: swatch, title: 'Smartwatch', price: 300 },
  { id: 9, image: ipad, title: 'Ipad', price: 350 },
  { id: 10, image: mouse, title: 'Mouse', price: 320 },
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
            <Link to={`/product/${product.id}`} key={product.id}> {/* Link to Product View Page */}
              <ProductCard
                product={{
                  id: product.id,
                  name: product.title,
                  price: product.price,
                }}
                image={product.image}
                title={product.title}
                price={product.price}
                showAddToCart={true}
              />
            </Link>
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
