import React from 'react';
import './ProductCard.css';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

interface ProductCardProps {
  id: number;
  image: string;
  title: string;
  price: number;
  showAddToCart: boolean;

  product: {

    id: number;

    name: string;

    price: number;

  };
}





const ProductCard: React.FC<ProductCardProps> = ({ id, image, title, price }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id, name: title, price, quantity: 1 });
    toast.success(`"${title}" added to cart!`, {
      position: 'top-right',
    });
  };

  return (
    <div className="product-card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>${price.toFixed(2)}</p>
      <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
