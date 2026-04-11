import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Blog.css';

const POSTS = [
  {
    id: '1',
    category: 'Aircraft Analysis',
    title: 'Why the Phenom 300 Remains the World\'s Best-Selling Light Jet',
    excerpt: 'For over a decade, the Embraer Phenom 300 has dominated the light jet category. We break down exactly what makes this aircraft so compelling for on-demand charter.',
    date: 'March 15, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=800',
    featured: true
  },
  {
    id: '2',
    category: 'Program Analysis',
    title: 'Fractional vs. On-Demand Charter: A Complete Guide for 2026',
    excerpt: 'Understanding the financial and operational tradeoffs between fractional ownership and premium on-demand charter has never been more important.',
    date: 'February 28, 2026',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=800',
    featured: false
  },
  {
    id: '3',
    category: 'Lifestyle',
    title: 'The Five Most Sought-After Private Jet Destinations This Summer',
    excerpt: 'From Aspen\'s summer music festivals to the Mediterranean\'s finest coastlines, these are the destinations our most frequent flyers are booking.',
    date: 'February 14, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1551524164-6cf2ac531eb6?w=800',
    featured: false
  },
  {
    id: '4',
    category: 'Aircraft Analysis',
    title: 'Inside the Global Express: The Ultimate Long-Range Business Jet',
    excerpt: 'When only the best will do for ultra-long-range travel, the Bombardier Global Express sets the standard. Here\'s what passengers can expect.',
    date: 'January 30, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1583396618422-6005fa3a4700?w=800',
    featured: false
  },
  {
    id: '5',
    category: 'Industry',
    title: 'How Private Aviation Safety Standards Have Evolved',
    excerpt: 'Safety remains the cornerstone of every flight decision at FXAIR. We explore how industry standards have advanced and what to look for when choosing a charter provider.',
    date: 'January 12, 2026',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800',
    featured: false
  },
  {
    id: '6',
    category: 'Lifestyle',
    title: 'Beyond the Flight: How FXAIR Elevates the Ground Experience',
    excerpt: 'Private aviation isn\'t just about the aircraft. We look at how FXAIR\'s white-glove service extends from booking to touchdown and everything in between.',
    date: 'December 18, 2025',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=800',
    featured: false
  }
];

const CATEGORIES = ['All', 'Aircraft Analysis', 'Program Analysis', 'Lifestyle', 'Industry'];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const featured = POSTS.find(p => p.featured);
  const filtered = activeCategory === 'All'
    ? POSTS.filter(p => !p.featured)
    : POSTS.filter(p => p.category === activeCategory && !p.featured);

  return (
    <div className="blog-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600" alt="Blog" />
          <div className="page-hero-overlay"></div>
        </div>
        <div className="container page-hero-content">
          <p className="section-eyebrow"><span className="gold-line"></span>Editorial</p>
          <h1>Flight <em>Frequencies</em></h1>
          <p className="page-hero-desc">
            Expert insights on private aviation — aircraft analysis, program guides,
            and the finest destinations in the world.
          </p>
        </div>
      </section>

      {/* Featured post */}
      {featured && (
        <section className="blog-featured">
          <div className="container">
            <div className="blog-featured-inner">
              <div className="blog-featured-image">
                <img src={featured.image} alt={featured.title} />
              </div>
              <div className="blog-featured-content">
                <span className="post-category">{featured.category}</span>
                <h2 className="blog-featured-title">{featured.title}</h2>
                <p className="post-excerpt">{featured.excerpt}</p>
                <div className="post-meta">
                  <span>{featured.date}</span>
                  <span className="meta-sep">·</span>
                  <span>{featured.readTime}</span>
                </div>
                <Link to={`/en-us/blog/${featured.id}`} className="btn btn-outline-gold">
                  Read Article
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category filter + grid */}
      <section className="section blog-grid-section">
        <div className="container">
          <div className="blog-filters">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="blog-grid">
            {filtered.map(post => (
              <article key={post.id} className="post-card">
                <Link to={`/en-us/blog/${post.id}`} className="post-card-image-link">
                  <div className="post-card-image">
                    <img
                      src={post.image}
                      alt={post.title}
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600'; }}
                    />
                  </div>
                </Link>
                <div className="post-card-body">
                  <span className="post-category">{post.category}</span>
                  <h3 className="post-card-title">
                    <Link to={`/en-us/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p className="post-excerpt">{post.excerpt}</p>
                  <div className="post-meta">
                    <span>{post.date}</span>
                    <span className="meta-sep">·</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="blog-empty">
              <p>No articles in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="blog-newsletter">
        <div className="container">
          <div className="newsletter-inner">
            <div>
              <p className="section-eyebrow"><span className="gold-line"></span>Stay Informed</p>
              <h2>Subscribe to <em>Flight Frequencies</em></h2>
              <p>Receive our latest articles, aircraft updates, and exclusive insights directly in your inbox.</p>
            </div>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <div className="newsletter-input-wrap">
                <input type="email" placeholder="Your email address" required />
                <button type="submit" className="btn btn-primary">Subscribe</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
