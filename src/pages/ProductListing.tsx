// ProductsPage.tsx
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext'; // Assuming you have a CartContext

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState([]);
    const { addToCart } = useCart(); // Get the addToCart function from your CartContext

    useEffect(() => {
      const fetchProducts = async () => {
          try {
              const response = await fetch('http://127.0.0.1:5000/api/products');
              if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
              }
              const data = await response.json();
              setProducts(data);
          } catch (error) {
              console.error('Error fetching products:', error);
          }
      };
  
      fetchProducts();
  }, []); // Empty dependency array ensures this runs only once

    const handleAddToCart = (product) => {
        addToCart(product); // Call the addToCart function from your CartContext
    };

    return (
        <div className="product-page"> {/* Add a class for styling */}
            {products.map((product) => (
                <div key={product.id} className="product">
                    {/* You might want to add images here if you have them */}
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                    <button onClick={() => handleAddToCart(product)}>
                        Add to Cart
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ProductsPage;