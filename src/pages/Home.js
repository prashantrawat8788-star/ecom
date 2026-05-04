import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import products from '../data/products';
import './Home.css';

function HeroBanner() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Discover Products <br />
          <span className="hero-highlight">You'll Love</span>
        </h1>
        <p className="hero-subtitle">
          Shop the latest trends in electronics, fashion, and more — all in one place.
        </p>
        <Link to="/shop" className="hero-btn">
          Shop Now →
        </Link>
      </div>
      <div className="hero-image-wrapper">
        <img
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80"
          alt="Shopping"
          className="hero-image"
        />
      </div>
    </section>
  );
}

function CategoryBadge({ label, emoji }) {
  return (
    <Link to={`/shop?category=${label}`} className="category-badge">
      <span className="cat-emoji">{emoji}</span>
      <span>{label}</span>
    </Link>
  );
}

const categories = [
  { label: 'Electronics', emoji: '💻' },
  { label: 'Clothing', emoji: '👕' },
  { label: 'Footwear', emoji: '👟' },
  { label: 'Accessories', emoji: '🎒' },
  { label: 'Sports', emoji: '🏋️' },
];

function Home() {
  const featured = products.slice(0, 4);

  return (
    <div className="home-page">
      <HeroBanner />

      <section className="categories-section">
        <h2 className="section-title">Shop by Category</h2>
        <div className="categories-grid">
          {categories.map((cat) => (
            <CategoryBadge key={cat.label} {...cat} />
          ))}
        </div>
      </section>

      <section className="featured-section">
        <div className="section-header">
          <h2 className="section-title">Featured Products</h2>
          <Link to="/shop" className="see-all-link">See all →</Link>
        </div>
        <div className="products-grid">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="promo-banner">
        <div className="promo-content">
          <h2>🎉 Special Offer</h2>
          <p>Get 10% off your first order! Use code <strong>REACT10</strong> at checkout.</p>
          <Link to="/shop" className="hero-btn">Grab the Deal</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
