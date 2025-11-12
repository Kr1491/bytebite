import React from "react";

const RestaurantCard = ({ restaurant, onViewMenu }) => {
  return (
    <div className="restaurant-card">
      <div className="rating-badge">⭐ {restaurant.rating}</div>
      <img
        src={`http://localhost:5001${restaurant.imagePath}`}
        alt={restaurant.name}
      />
      <div className="card-body">
        <h3>{restaurant.name}</h3>
        <p>{restaurant.cuisine}</p>
        <div className="card-details">
          <span>🕒 {restaurant.timeRange}</span>
          <span>📍 {restaurant.distance}</span>
        </div>
        <button onClick={onViewMenu}>View Menu</button>
      </div>
    </div>
  );
};

export default RestaurantCard;
