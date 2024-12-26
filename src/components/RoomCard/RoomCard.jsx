import React, { useState } from "react";
import "./RoomCard.css";
import BookingModal from "../BookingModal/BookingModal";
import { FaUsers } from "react-icons/fa";

const RoomCard = ({ name, price, capacity, images, hotelName, amenities, checkInDate, checkOutDate, numPersons }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showAmenities, setShowAmenities] = useState(false); // State for toggling amenities visibility

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleAmenities = () => {
    setShowAmenities(!showAmenities); // Toggle visibility of amenities
  };

  return (
    <div className="room-card">
      <div className="room-carousel">
        <button className="carousel-btn prev" onClick={handlePrev}>
          &#8249;
        </button>
        <img src={images[currentIndex]} alt={`${name} - ${currentIndex + 1}`} className="room-image" />
        <button className="carousel-btn next" onClick={handleNext}>
          &#8250;
        </button>
      </div>

      <div className="room-info">
        <div className="room-header">
          <h3 className="room-name">{name}</h3>
          <div className="room-capacity">
            <FaUsers /> {capacity}
          </div>
        </div>
        <p className="room-price">₹{price} / night</p>
        <div className="room-actions">
          <button className="view-facilities-btn" onClick={toggleAmenities}>
            {showAmenities ? "Hide Facilities" : "View Facilities"}
          </button>
          <button className="book-now-btn" onClick={toggleModal}>
            Book Now
          </button>
        </div>
        
        {showAmenities && (
          <div className="room-amenities">
            <p>Amenities: {amenities.join(", ")}</p> {/* Display amenities as comma-separated list */}
          </div>
        )}
      </div>

      {showModal && (
        <BookingModal
          onClose={toggleModal}
          hotelName={hotelName}
          roomName={name}
          price={price}
          images={images}
          amenities={amenities}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          numPersons={numPersons}
        />
      )}
    </div>
  );
};

export default RoomCard;
