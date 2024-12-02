import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavbarOther from '../components/NavbarOther';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import './ProductView.css';

const ProductViewPage: React.FC = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/product/${productId}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      });
      toast.success('Product added to cart!', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <NavbarOther />
      <div className="product-view">
        <div className="product-details">
          <h2>{product.name}</h2>
          <img src={product.image || 'default-image.jpg'} alt={product.name} />
          <p>{product.description}</p>
          <p className="price">${product.price}</p>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductViewPage;
