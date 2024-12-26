import React from "react";
import { useNavigate } from "react-router-dom";
import "./HotelCard.css";

const HotelCard = ({ id, name, location, rating, priceRange, images }) => {
  const navigate = useNavigate();

  const handleViewClick = () => {
    navigate(`/hotels/${id}`);
  };

  return (
    <div className="hotel-card" style={{ border: "1px solid black", borderRadius: "8px", padding: "16px", maxWidth: "300px" }}>
      <img
        src={images[0]}
        alt={name}
        className="hotel-image"
        style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px" }}
      />
      <div className="hotel-info" style={{ marginTop: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 className="hotel-name" style={{ fontSize: "1.2rem", margin: "0" }}>{name}</h3>
          <p className="rating" style={{ margin: "0", fontSize: "1rem", color: "black" }}>&#9733; {rating}</p>
        </div>
        <p className="hotel-loc" style={{ margin: "8px 0", fontSize: "1rem", color: "#666" }}>{location}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p className="hotel-price" style={{ fontSize: "1.2rem", fontWeight: "bold", margin: "0" }}>{priceRange}</p>
          <button
            className="hotel-view-btn"
            onClick={handleViewClick}
            style={{
              backgroundColor: "#0A66BB",
              color: "white",
              padding: "8px 16px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            View <span style={{ marginLeft: "8px", fontWeight: "bold" }}>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
