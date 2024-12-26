import React, { useState } from "react";
import PropTypes from "prop-types";
import "./BookingModal.css";
import { FaCalendarAlt, FaUsers } from "react-icons/fa";

const BookingModal = ({
  onClose,
  hotelName,
  roomName,
  price,
  images = [],
  amenities = [],
  checkInDate,
  checkOutDate,
  numPersons,
}) => {
  const [guestCount, setGuestCount] = useState(numPersons || 1);
  const [guestDetails, setGuestDetails] = useState(
    Array.from({ length: guestCount }, () => ({
      name: "",
      age: "",
      gender: "",
    }))
  );
  const [currentCheckInDate, setCurrentCheckInDate] = useState(
    checkInDate || ""
  );
  const [currentCheckOutDate, setCurrentCheckOutDate] = useState(
    checkOutDate || ""
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAmenities, setShowAmenities] = useState(false);

  const toggleAmenitiesVisibility = () => {
    setShowAmenities((prev) => !prev);
  };
  

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based, so adding 1
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  
  
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleInputChange = (index, field, value) => {
    const updatedGuests = [...guestDetails];
    updatedGuests[index][field] = value;
    setGuestDetails(updatedGuests);
  };

  const addGuest = () => {
    setGuestCount((prev) => Number(prev) + 1);
    setGuestDetails((prev) => [...prev, { name: "", age: "", gender: "" }]);
  };

  const handleUpdateDetails = () => {
    // Validate Check-In and Check-Out Dates
    if (!currentCheckInDate || !currentCheckOutDate) {
      alert("Please fill in both Check-In and Check-Out dates.");
      return;
    }

    // Validate Guest Details
    for (let i = 0; i < guestDetails.length; i++) {
      const guest = guestDetails[i];
      if (!guest.name || !guest.age || !guest.gender) {
        alert(`Please fill all details for Person ${i + 1}.`);
        return;
      }
    }

    // Show Confirmation Alert
    alert(`Booking Confirmed!
  Hotel: ${hotelName}
  Room: ${roomName}
  Check-In: ${currentCheckInDate}
  Check-Out: ${currentCheckOutDate}
  Guests: ${guestDetails
      .map((guest, index) => `\n${index + 1}. ${guest.name}, ${guest.age} years, ${guest.gender}`)
      .join("")}`);

    // Close the modal after alert
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Header */}
        <div className="modal-header">
          <div className="header-left">
            <h2 className="room-title">
              <span>{hotelName}</span> {">"} {roomName}
            </h2>
          </div>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Grid Layout */}
        <div className="modal-grid">
          {/* Left Section */}
          <div className="modal-left">
            {/* Carousel */}
            <div className="carousel">
              <button className="carousel-btn prev" onClick={handlePrev}>
                &#8249;
              </button>
              <img
                src={images[currentIndex]}
                alt={`${roomName} - ${currentIndex + 1}`}
                className="carousel-image"
              />
              <button className="carousel-btn next" onClick={handleNext}>
                &#8250;
              </button>
            </div>

            {/* Amenities */}
            <div className="amenities">
              {amenities.map((amenity, index) => (
                <span key={index} className="amenity-pill">
                  {amenity}
                </span>
              ))}
            </div>

            {/* Persons Info */}
            <div className="persons-info">
              <FaUsers className="icon" />
              <span>{guestCount} Person(s)</span>
            </div>

            {/* Check-In/Check-Out Dates */}
            <div className="dates-info">
              <div className="date-item">
                <FaCalendarAlt className="icon" />
                <span>Check-In: {currentCheckInDate || "dd-mm-yyyy"}</span>
              </div>
              <div className="date-item">
                <FaCalendarAlt className="icon" />
                <span>Check-Out: {currentCheckOutDate || "dd-mm-yyyy"}</span>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="modal-right">
            {/* Date Selector */}
            <div className="date-selector">
              <div className="date-field">
                <FaCalendarAlt className="icon" />
                <input
                  type="text"
                  value={currentCheckInDate}
                  placeholder="Check-In"
                  min={getTodayDate()} 
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                  onChange={(e) => setCurrentCheckInDate(e.target.value)}
                />
              </div>
              <div className="divider"></div>
              <div className="date-field">
                <FaCalendarAlt className="icon" />
                <input
                  type="text"
                  value={currentCheckOutDate}
                  placeholder="Check-Out"
                  min={getTodayDate()} 
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                  onChange={(e) => setCurrentCheckOutDate(e.target.value)}
                />
              </div>
            </div>

            {/* Guest Details */}
            {guestDetails.map((guest, index) => (
              <div key={index} className="guest-details">
                <h4>Person {index + 1}</h4>
                <input
                  type="text"
                  className="name-input"
                  placeholder="Name"
                  value={guest.name}
                  onChange={(e) =>
                    handleInputChange(index, "name", e.target.value)
                  }
                />
                <div className="age-gender-row">
                  <input
                    type="number"
                    className="age-input"
                    placeholder="Age"
                    value={guest.age}
                    onChange={(e) =>
                      handleInputChange(index, "age", e.target.value)
                    }
                  />
                  <div className="gender-selector">
                    <div
                      className={`gender-option ${
                        guest.gender === "male" ? "selected" : ""
                      }`}
                      onClick={() => handleInputChange(index, "gender", "male")}
                    >
                      Male
                    </div>
                    <div
                      className={`gender-option ${
                        guest.gender === "female" ? "selected" : ""
                      }`}
                      onClick={() =>
                        handleInputChange(index, "gender", "female")
                      }
                    >
                      Female
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <button className="add-guest-btn" onClick={addGuest}>
              + Add Person
            </button>
          </div>
        </div>

        {/* Footer */}
        <button className="book-btn" onClick={handleUpdateDetails}>
          Book Now
        </button>
      </div>
    </div>
  );
};

// Prop type validation
BookingModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  hotelName: PropTypes.string.isRequired,
  roomName: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(PropTypes.string),
  amenities: PropTypes.arrayOf(PropTypes.string),
  checkInDate: PropTypes.string,
  checkOutDate: PropTypes.string,
  numPersons: PropTypes.number,
};

export default BookingModal;
