import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  return (
    <span className="star-rating" aria-label={`Rating: ${rating} out of 5`}>
      {'★'.repeat(fullStars)}
      {hasHalf ? '½' : ''}
      {'☆'.repeat(5 - fullStars - (hasHalf ? 1 : 0))}
      <span className="rating-num"> {rating}</span>
    </span>
  );
}

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};

function ProductCard({ product }) {
  const { addToCart, cartItems } = useCart();
  const inCart = cartItems.some((item) => item.id === product.id);

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="card-image-link">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          loading="lazy"
        />
        <span className="product-category">{product.category}</span>
      </Link>
      <div className="card-body">
        <Link to={`/product/${product.id}`} className="product-name-link">
          <h3 className="product-name">{product.name}</h3>
        </Link>
        <StarRating rating={product.rating} />
        <div className="card-footer">
          <span className="product-price">₹{product.price.toLocaleString()}</span>
          <button
            className={`add-to-cart-btn ${inCart ? 'in-cart' : ''}`}
            onClick={() => addToCart(product)}
          >
            {inCart ? '✔ Added' : '+ Add to Cart'}
          </button>
        </div>
        {product.stock <= 5 && (
          <p className="low-stock">⚠ Only {product.stock} left!</p>
        )}
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
