import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Merch = () => {
  return (
    <div>
      {/* Hero Section */}
      <header className="page-header">
        <div className="container text-center">
          <h1 className="display-4">Chapter Merchandise</h1>
          <p className="lead">Show Your Pride with SAE FSU</p>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Featured Products Section */}
        <section className="py-5">
          <div className="container">
            <h2 className="text-center mb-5">Featured Products</h2>
            <div className="row g-4">
              {/* Product 1 */}
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-lg">
                  <img src="/images/merch/tshirt1.jpg" className="card-img-top" alt="SAE T-Shirt" />
                  <div className="card-body p-4">
                    <h3 className="h4 mb-3">Chapter T-Shirt</h3>
                    <p className="lead text-primary mb-3">$25.00</p>
                    <p className="card-text mb-4">Premium quality cotton t-shirt featuring our chapter logo and colors.</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button className="btn btn-outline-primary">S</button>
                        <button className="btn btn-outline-primary">M</button>
                        <button className="btn btn-outline-primary">L</button>
                        <button className="btn btn-outline-primary">XL</button>
                      </div>
                      <button className="btn btn-primary">Add to Cart</button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Product 2 */}
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-lg">
                  <img src="/images/merch/hoodie1.jpg" className="card-img-top" alt="SAE Hoodie" />
                  <div className="card-body p-4">
                    <h3 className="h4 mb-3">Chapter Hoodie</h3>
                    <p className="lead text-primary mb-3">$45.00</p>
                    <p className="card-text mb-4">Warm and comfortable hoodie perfect for game days and casual wear.</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button className="btn btn-outline-primary">S</button>
                        <button className="btn btn-outline-primary">M</button>
                        <button className="btn btn-outline-primary">L</button>
                        <button className="btn btn-outline-primary">XL</button>
                      </div>
                      <button className="btn btn-primary">Add to Cart</button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Product 3 */}
              <div className="col-md-4">
                <div className="card h-100 border-0 shadow-lg">
                  <img src="/images/merch/hat1.jpg" className="card-img-top" alt="SAE Hat" />
                  <div className="card-body p-4">
                    <h3 className="h4 mb-3">Chapter Hat</h3>
                    <p className="lead text-primary mb-3">$20.00</p>
                    <p className="card-text mb-4">Stylish snapback hat featuring our chapter logo and colors.</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button className="btn btn-outline-primary">One Size</button>
                      </div>
                      <button className="btn btn-primary">Add to Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-5 bg-light">
          <div className="container">
            <h2 className="text-center mb-5">Shop by Category</h2>
            <div className="row g-4">
              <div className="col-md-3">
                <div className="card border-0 shadow-lg">
                  <div className="card-body text-center p-4">
                    <i className="fas fa-tshirt fa-3x mb-3 text-primary"></i>
                    <h3 className="h5">Apparel</h3>
                    <p className="card-text">T-shirts, hoodies, and more</p>
                    <a href="#" className="btn btn-outline-primary">Shop Now</a>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card border-0 shadow-lg">
                  <div className="card-body text-center p-4">
                    <i className="fas fa-hat-cowboy fa-3x mb-3 text-primary"></i>
                    <h3 className="h5">Accessories</h3>
                    <p className="card-text">Hats, bags, and more</p>
                    <a href="#" className="btn btn-outline-primary">Shop Now</a>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card border-0 shadow-lg">
                  <div className="card-body text-center p-4">
                    <i className="fas fa-gift fa-3x mb-3 text-primary"></i>
                    <h3 className="h5">Gifts</h3>
                    <p className="card-text">Perfect for alumni and supporters</p>
                    <a href="#" className="btn btn-outline-primary">Shop Now</a>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card border-0 shadow-lg">
                  <div className="card-body text-center p-4">
                    <i className="fas fa-star fa-3x mb-3 text-primary"></i>
                    <h3 className="h5">New Arrivals</h3>
                    <p className="card-text">Latest chapter merchandise</p>
                    <a href="#" className="btn btn-outline-primary">Shop Now</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Special Offers Section */}
        <section className="py-5">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-6">
                <h2 className="mb-4">Special Offers</h2>
                <p className="lead mb-4">Get exclusive discounts on our merchandise!</p>
                <ul className="list-unstyled">
                  <li className="mb-3"><i className="fas fa-check text-success me-2"></i>Free shipping on orders over $50</li>
                  <li className="mb-3"><i className="fas fa-check text-success me-2"></i>10% off for active members</li>
                  <li className="mb-3"><i className="fas fa-check text-success me-2"></i>15% off for alumni</li>
                </ul>
                <a href="#" className="btn btn-primary btn-lg">Shop Now</a>
              </div>
              <div className="col-md-6">
                <img src="/images/merch/special-offer.jpg" alt="Special Offers" className="img-fluid rounded shadow-lg" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-dark text-white py-4 text-center">
        <div className="container">
          <p>© 2025 Sigma Alpha Epsilon - Florida State University</p>
        </div>
      </footer>
    </div>
  );
};

export default Merch; 