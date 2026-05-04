import React, { Component } from 'react';
import './About.css';

class TeamMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBio: false,
    };
    this.toggleBio = this.toggleBio.bind(this);
  }

  toggleBio() {
    this.setState((prevState) => ({ showBio: !prevState.showBio }));
  }

  render() {
    const { name, role, emoji, bio } = this.props;
    const { showBio } = this.state;
    return (
      <div className="team-card">
        <div className="team-avatar">{emoji}</div>
        <h3 className="team-name">{name}</h3>
        <p className="team-role">{role}</p>
        <button className="bio-toggle" onClick={this.toggleBio}>
          {showBio ? 'Hide Info ▲' : 'More Info ▼'}
        </button>
        {showBio && <p className="team-bio">{bio}</p>}
      </div>
    );
  }
}

const teamMembers = [
  {
    name: 'Priya Sharma',
    role: 'Founder & CEO',
    emoji: '👩‍💼',
    bio: 'Priya has 10+ years of experience in e-commerce and product management. She founded ShopReact to bring joy to online shopping.',
  },
  {
    name: 'Arjun Menon',
    role: 'Lead Developer',
    emoji: '👨‍💻',
    bio: 'Arjun is a full-stack developer specializing in React and Node.js. He built the core platform from scratch.',
  },
  {
    name: 'Kavya Nair',
    role: 'UI/UX Designer',
    emoji: '🎨',
    bio: 'Kavya crafts beautiful, user-friendly interfaces. She believes every pixel should have a purpose.',
  },
];

function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <h1 className="about-title">About ShopReact</h1>
        <p className="about-subtitle">
          We're passionate about building the best online shopping experience powered by React.
        </p>
      </section>

      <section className="about-mission">
        <div className="mission-grid">
          <div className="mission-card">
            <span className="mission-icon">🎯</span>
            <h3>Our Mission</h3>
            <p>
              To deliver a seamless, joyful, and trustworthy shopping experience to every customer,
              backed by cutting-edge React technology.
            </p>
          </div>
          <div className="mission-card">
            <span className="mission-icon">🌍</span>
            <h3>Our Reach</h3>
            <p>
              Serving customers across India with fast shipping, reliable service, and a growing
              catalogue of 1000+ products.
            </p>
          </div>
          <div className="mission-card">
            <span className="mission-icon">⚛️</span>
            <h3>Our Tech</h3>
            <p>
              Built entirely with React, featuring modern hooks, context API, client-side routing,
              and prop validation for a robust frontend.
            </p>
          </div>
        </div>
      </section>

      <section className="team-section">
        <h2 className="section-title">Meet the Team</h2>
        <div className="team-grid">
          {teamMembers.map((member) => (
            <TeamMember key={member.name} {...member} />
          ))}
        </div>
      </section>

      <section className="stats-section">
        <h2 className="section-title">Our Numbers</h2>
        <div className="stats-grid">
          {[
            { label: 'Happy Customers', value: '10,000+' },
            { label: 'Products Available', value: '1,000+' },
            { label: 'Cities Served', value: '50+' },
            { label: 'Orders Delivered', value: '25,000+' },
          ].map((stat) => (
            <div key={stat.label} className="stat-card">
              <p className="stat-value">{stat.value}</p>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default About;
