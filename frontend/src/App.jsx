import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import "./components/RestaurantList.css";
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


  useEffect(() => {
    axios
      .get("http://localhost:5001/api/restaurants")
      .then((res) => setRestaurants(res.data))
      .catch((err) => console.error("Error fetching restaurants:", err));
  }, []);

  const handleAddToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  const handleRemoveFromCart = (item) => {
    setCart((prev) => {
      const index = prev.findIndex((i) => i._id === item._id);
      if (index === -1) return prev;
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  const clearCart = () => setCart([]);

  return (
    <>
      <Header
      onCartClick={() => setShowCart(true)}
      onLoginClick={() => setShowAuth(true)}
      cartCount={cart.length} 
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

      {showCart && (
        <CartDrawer
          cart={cart}
          setCart={setCart}     
          clearCart={clearCart}
          onClose={() => setShowCart(false)}
        />
      )}

      {showAuth && (
        <AuthModal
          onClose={() => {
            setShowAuth(false);
          }}
        />
      )}

      {showMenu && (
        <MenuModal
          restaurant={selectedRestaurant}
          cart={cart}                  
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
          onClose={() => setShowMenu(false)}
        />
      )}
    </>
  );
};

export default App;
