import React from 'react';
import { motion } from 'framer-motion';
import './ProductGrid.css';

const products = [
  { id: 1, image: 'https://via.placeholder.com/150', title: 'Stylish Shoes', price: 50 },
  { id: 2, image: 'https://via.placeholder.com/150', title: 'Elegant Watch', price: 120 },
  { id: 3, image: 'https://via.placeholder.com/150', title: 'Classic Handbag', price: 90 },
  { id: 4, image: 'https://via.placeholder.com/150', title: 'Trendy Jacket', price: 150 },
  { id: 5, image: 'https://via.placeholder.com/150', title: 'Modern Headphones', price: 200 },
  { id: 6, image: 'https://via.placeholder.com/150', title: 'Smartphone', price: 800 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ProductGrid: React.FC = () => {
  return (
    <motion.section
      className="product-grid"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2>Our Featured Products</h2>
      <div className="grid">
        {products.map((product) => (
          <motion.div
            className="product-card"
            key={product.id}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price.toFixed(2)}</p>
            <button className="add-to-cart">Add to Cart</button>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default ProductGrid;
