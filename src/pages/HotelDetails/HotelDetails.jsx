import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import RoomCard from "../../components/RoomCard/RoomCard";
import "./HotelDetails.css";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";

const HotelDetails = () => {
  const { hotelId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { checkInDate, checkOutDate, numPersons } = location.state || {};

  const [hotelData, setHotelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const response = await axios.get(
          `https://www.gocomet.com/api/assignment/hotels/${hotelId}`
        );
        setHotelData(response.data.hotel);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch hotel data");
      } finally {
        setLoading(false);
      }
    };

    fetchHotelData();
  }, [hotelId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="hotel-details">
        <header
          className="hotel-header"
          style={{
            backgroundImage: `url(${hotelData.image_url})`,
          }}
        >
          <button
            className="back-arrow"
            onClick={() => navigate(-1)}
            aria-label="Go Back"
          >
            ←
          </button>
          <h1 className="hotel-name">{hotelData.name}</h1>
          <div className="hotel-header-details">
            <p className="hotel-location">
              <FaMapMarkerAlt className="location-icon" />
              {hotelData.city}
            </p>
            <p className="hotel-rating">&#9733; {hotelData.rating}</p>
          </div>
        </header>
        <div className="room-list">
          {hotelData.rooms?.map((room) => (
            <RoomCard
              key={room.id}
              name={room.name}
              price={room.price}
              capacity={room.amenities.length}
              images={room.image_urls}
              hotelName={hotelData.name}
              amenities={room.amenities}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              numPersons={numPersons}
            />
          ))}
        </div>
        <section className="hotel-description">
          <h2>About {hotelData.name}</h2>
          <p>{hotelData.description}</p>
        </section>
      </div>
    </>
  );
};

export default HotelDetails;
