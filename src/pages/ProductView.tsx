import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavbarOther from '../components/NavbarOther';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import aboutImage from '../assets/Shoes/{29BA62A7-D1EF-45F7-BC9E-B3A656A663BB}.png'; 
import aboutImage2 from '../assets/Shoes/{3F7989EF-77DE-4BDE-AC9E-8A7B1BD91EE7}.png'; // Import image (make sure the path is correct)
import aboutImage3 from '../assets/Shoes/{7C72288E-664A-405B-B98F-F2E0684B548F}.png'; // Import image (make sure the path is correct)



import './ProductView.css';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  images: string[];
}

const ProductViewPage: React.FC<Product> = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate(); // Used for navigation

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // Simulate fetching the product by ID
        const productData: Product = {
          id: parseInt(productId || '0'),
          title: 'Stylish Shoes',
          price: 120,
          description: 'Comfortable and stylish shoes for all occasions.',
          image: aboutImage,
          images: [
            aboutImage2,
            aboutImage3,
            aboutImage,
          ],
        };
        setProduct(productData);
        setMainImage(productData.image); // Set the initial main image
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // Function to handle changing main image when a thumbnail is clicked
  const handleImageClick = (image: string) => {
    setMainImage(image);
  };
  const { addToCart } = useCart();
  // Function to handle adding product to cart
  const handleAddToCart = () => {
    if (product) {
      addToCart({ id: product.id, name: product.title, price: product.price, quantity: 1 });
      toast.success(`"${product.title}" added to cart!`, {
        position: 'top-right',
      });
      console.log('Product added to cart:', product.title);
    }
  };

  // Function to navigate back to product listing page
  const handleBackToListing = () => {
    navigate('/products');
  };

  return (
    <>
        <NavbarOther />
        <div className="product-view-page">
        
        {loading ? (
            <p>Loading product details...</p>
        ) : product ? (
            <div className="product-details">
            <h1>{product.title}</h1>

            {/* Back to Product Listing */}
            <button className="back-to-listing" onClick={handleBackToListing}>
                Back to Listing
            </button>

            {/* Main Product Image */}
            <div className="main-image-container">
                <img
                src={mainImage}
                alt={product.title}
                className="main-image"
                loading="lazy"
                />
            </div>

            <p>{product.description}</p>
            <p className="price">${product.price}</p>

            {/* Add to Cart Button */}
            <button className="add-to-cart" onClick={handleAddToCart}>
                Add to Cart
            </button>

            <h3>Other Images</h3>
            <div className="product-images">
                {product.images.map((image, index) => (
                <img
                    key={index}
                    src={image}
                    alt={`Product image ${index + 1}`}
                    className="thumbnail"
                    onClick={() => handleImageClick(image)} // Change main image on click
                    loading="lazy"
                />
                ))}
            </div>
            </div>
        ) : (
            <p>Product not found</p>
        )}
        </div>
        <Footer />
    </>
  );
};

export default ProductViewPage;
