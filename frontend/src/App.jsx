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

  // GLOBAL CART STATE
  const [cart, setCart] = useState([]);

  // Fetch restaurant list
  useEffect(() => {
    axios
      .get("http://localhost:5001/api/restaurants")
      .then((res) => setRestaurants(res.data))
      .catch((err) => console.error("Error fetching restaurants:", err));
  }, []);

  // Add item to cart (one quantity added)
  const handleAddToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  // Remove one quantity of an item
  const handleRemoveFromCart = (item) => {
    setCart((prev) => {
      const index = prev.findIndex((i) => i._id === item._id);
      if (index === -1) return prev;
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
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

      {/* CART DRAWER */}
      {showCart && (
        <CartDrawer
          cart={cart}
          setCart={setCart}      // ADD THIS
          clearCart={clearCart}
          onClose={() => setShowCart(false)}
        />
      )}

      {/* LOGIN MODAL */}
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
          cart={cart}                  // <-- IMPORTANT (for showing correct qty)
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
          onClose={() => setShowMenu(false)}
        />
      )}
    </>
  );
};

export default App;
