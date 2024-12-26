import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCalendarAlt } from "react-icons/fa"; 
import "./Hero.css";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numPersons, setNumPersons] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true); // To control visibility of suggestions
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch hotel names and cities for autocomplete
    if (searchQuery.length > 0) {
      axios
        .get("https://www.gocomet.com/api/assignment/hotels-name")
        .then((response) => {
          setSuggestions(response.data);
        })
        .catch((error) => {
          console.error("Error fetching suggestions:", error);
        });
    }
  }, [searchQuery]); // Fetch new suggestions whenever searchQuery changes

  const handleSearch = () => {
    if (!searchQuery || !checkInDate || !checkOutDate || !numPersons) {
      setError("All fields are mandatory.");
      return;
    }
    setError("");

    const selectedHotel = suggestions.find(
      (hotel) =>
        hotel.name.toLowerCase() === searchQuery.toLowerCase() ||
        hotel.city.toLowerCase() === searchQuery.toLowerCase()
    );

    if (selectedHotel) {
      navigate(`/hotels/${selectedHotel.id}`, {
        state: { checkInDate, checkOutDate, numPersons },
      });
      setSearchQuery(selectedHotel.name); // Set search query to the selected hotel name
      setSuggestions([]); // Clear the suggestions list
      setShowSuggestions(false); // Hide suggestions after selection
    } else {
      setError("Please select a valid hotel or city.");
    }
  };

  const handleSuggestionClick = (item) => {
    setSearchQuery(item.name); // Set search query to the selected suggestion
    setSuggestions([]); // Clear the suggestions after selection
    setShowSuggestions(false); // Hide suggestions
  };

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.length === 0) {
      setSuggestions([]); // Clear suggestions if the input is empty
      setShowSuggestions(false); // Hide suggestions if input is empty
    } else {
      setShowSuggestions(true); // Show suggestions if there's text in the input
    }
  };

  const filteredSuggestions = suggestions.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based, so adding 1
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="hero-section">
      <div className="hero-bg-tint"></div>
      <div className="hero-content">
        <h1>Find the Perfect Deal, Always.</h1>
        <p>Search for the best hotels and deals in your favorite destinations.</p>
      </div>
      <div className="hero-search-bar">
        <div className="hero-search-input-container">
          <input
            type="text"
            placeholder="Type city, place, or hotel name"
            className="hero-search-input"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </div>
        {showSuggestions && searchQuery && filteredSuggestions.length > 0 && (
          <ul className="hero-suggestions-list">
            {filteredSuggestions.map((item, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(item)}
                className="hero-suggestion-item"
              >
                {item.name} ({item.city})
              </li>
            ))}
          </ul>
        )}

        {/* Date Selectors */}
        <div className="hero-date-selector">
          <div className="hero-date-field">
            <FaCalendarAlt className="hero-icon" />
            <input
              type="text"
              className="hero-date-input"
              value={checkInDate}
              placeholder="Check-In"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              onChange={(e) => setCheckInDate(e.target.value)}
              min={getTodayDate()}
            />
          </div>
          <div className="hero-divider"></div>
          <div className="hero-date-field">
            <FaCalendarAlt className="hero-icon" />
            <input
              type="text"
              className="hero-date-input"
              value={checkOutDate}
              placeholder="Check-Out"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              onChange={(e) => setCheckOutDate(e.target.value)}
              min={getTodayDate()}
            />
          </div>
        </div>

        {/* Number of Persons */}
        <div className="hero-num-persons-container">
          <input
            type="number"
            placeholder="Number of Persons"
            className="hero-num-persons-input"
            min="1"
            value={numPersons}
            onChange={(e) => setNumPersons(e.target.value)}
          />
        </div>

        <button className="hero-search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>
      {error && <p className="hero-error">{error}</p>}
    </div>
  );
};

export default Hero;
