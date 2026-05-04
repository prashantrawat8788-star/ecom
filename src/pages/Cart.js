import React, { useState } from 'react';
import PdfDownloadButton from '../components/PdfInvoice';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

function CartItem({ item, onRemove, onUpdate }) {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-image" />
      <div className="cart-item-info">
        <h3 className="cart-item-name">{item.name}</h3>
        <p className="cart-item-category">{item.category}</p>
        <p className="cart-item-price">₹{item.price.toLocaleString()}</p>
      </div>
      <div className="cart-item-controls">
        <div className="qty-controls">
          <button className="qty-btn" onClick={() => onUpdate(item.id, item.quantity - 1)}>
            −
          </button>
          <span className="qty-value">{item.quantity}</span>
          <button className="qty-btn" onClick={() => onUpdate(item.id, item.quantity + 1)}>
            +
          </button>
        </div>
        <p className="item-subtotal">
          ₹{(item.price * item.quantity).toLocaleString()}
        </p>
        <button className="remove-btn" onClick={() => onRemove(item.id)}>
          🗑 Remove
        </button>
      </div>
    </div>
  );
}

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 2000 ? 0 : 99;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    clearCart();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="order-success">
        <div className="success-card">
          <div className="success-icon">🎉</div>
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for shopping with ShopReact. Your order is on its way!</p>
          <Link to="/shop" className="continue-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <div className="empty-cart-content">
          <span className="empty-icon">🛒</span>
          <h2>Your cart is empty</h2>
          <p>Add some products to your cart to get started!</p>
          <Link to="/shop" className="continue-btn">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1 className="cart-title">Your Cart</h1>
        <button className="clear-cart-btn" onClick={clearCart}>
          Clear All
        </button>
      </div>

      <div className="cart-layout">
        <div className="cart-items-list">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onRemove={removeFromCart}
              onUpdate={updateQuantity}
            />
          ))}
        </div>

        <div className="cart-summary">
          <h2 className="summary-title">Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? '🎉 Free' : `₹${shipping}`}</span>
          </div>
          {shipping > 0 && (
            <p className="free-shipping-note">
              Add ₹{(2000 - subtotal).toLocaleString()} more for free shipping!
            </p>
          )}
          <div className="summary-divider" />
          <div className="summary-total">
            <span>Total</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
<PdfDownloadButton />
          <button className="checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout →
          </button>
          <Link to="/shop" className="continue-shopping-link">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
