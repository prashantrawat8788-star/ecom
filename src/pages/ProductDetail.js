import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import products from '../data/products';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="not-found">
        <h2>Product not found 😕</h2>
        <button onClick={() => navigate('/shop')} className="back-btn">
          ← Back to Shop
        </button>
      </div>
    );
  }

  const inCart = cartItems.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="product-detail-page">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Back
      </button>

      <div className="product-detail-card">
        <div className="detail-image-section">
          <img src={product.image} alt={product.name} className="detail-image" />
        </div>

        <div className="detail-info-section">
          <span className="detail-category">{product.category}</span>
          <h1 className="detail-name">{product.name}</h1>

          <div className="detail-rating">
            {'★'.repeat(Math.floor(product.rating))}
            <span className="rating-text"> {product.rating} / 5</span>
          </div>

          <p className="detail-price">₹{product.price.toLocaleString()}</p>

          <p className="detail-description">{product.description}</p>

          <div className="detail-stock">
            {product.stock > 5 ? (
              <span className="in-stock">✅ In Stock ({product.stock} available)</span>
            ) : (
              <span className="low-stock-text">⚠ Only {product.stock} left!</span>
            )}
          </div>

          <div className="quantity-section">
            <label className="qty-label">Quantity:</label>
            <div className="qty-controls">
              <button
                className="qty-btn"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <span className="qty-value">{quantity}</span>
              <button
                className="qty-btn"
                onClick={() =>
                  setQuantity((q) => Math.min(product.stock, q + 1))
                }
              >
                +
              </button>
            </div>
          </div>

          <div className="detail-actions">
            <button
              className={`add-to-cart-detail-btn ${added ? 'added' : ''}`}
              onClick={handleAddToCart}
            >
              {added ? '✔ Added to Cart!' : inCart ? '+ Add More' : '🛒 Add to Cart'}
            </button>
            <button
              className="buy-now-btn"
              onClick={() => {
                handleAddToCart();
                navigate('/cart');
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="related-section">
          <h2 className="section-title">Related Products</h2>
          <div className="related-grid">
            {related.map((p) => (
              <div
                key={p.id}
                className="related-card"
                onClick={() => navigate(`/product/${p.id}`)}
              >
                <img src={p.image} alt={p.name} className="related-image" />
                <p className="related-name">{p.name}</p>
                <p className="related-price">₹{p.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
