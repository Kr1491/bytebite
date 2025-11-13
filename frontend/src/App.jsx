import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import RestaurantCard from "./components/RestaurantCard";
import CartDrawer from "./components/CartDrawer";
import AuthModal from "./components/AuthModal";
import MenuModal from "./components/MenuModal";
import "./index.css";

const App = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [cart, setCart] = useState([]);

  // Fetch restaurant list
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/restaurants")
      .then((res) => setRestaurants(res.data))
      .catch((err) => console.error("Error fetching restaurants:", err));
  }, []);

  // Add item to cart
  const handleAddToCart = (item) => {
    setCart([...cart, item]);
  };

  // Clear cart after order
  const clearCart = () => setCart([]);

  return (
    <>
      <Header
        onCartClick={() => setShowCart(true)}
        onLoginClick={() => setShowAuth(true)}
      />

      <HeroSection />

      <section className="restaurants-section">
        <h2>Available Restaurants</h2>
        <p>Choose from our partnered food outlets</p>

        <div className="restaurant-grid">
          {restaurants.map((r) => (
            <RestaurantCard
              key={r._id}
              restaurant={r}
              onViewMenu={() => {
                setSelectedRestaurant(r);
                setShowMenu(true);
              }}
            />
          ))}
        </div>
      </section>

      {/* CART */}
      {showCart && (
        <CartDrawer
          cart={cart}
          clearCart={clearCart}
          onClose={() => setShowCart(false)}
        />
      )}

      {/* LOGIN / SIGNUP */}
      {showAuth && (
        <AuthModal
          onClose={() => {
            setShowAuth(false);
          }}
        />
      )}

      {/* MENU MODAL */}
      {showMenu && (
        <MenuModal
          restaurant={selectedRestaurant}
          onAddToCart={handleAddToCart}
          onClose={() => setShowMenu(false)}
        />
      )}
    </>
  );
};

export default App;
