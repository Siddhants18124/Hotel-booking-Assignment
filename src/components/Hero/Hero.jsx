import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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

  return (
    <div className="hero-section">
      <h1>Find the Perfect Deal, Always.</h1>
      <p>Search for the best hotels and deals in your favorite destinations.</p>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Type city, place, or hotel name"
          className="search-input"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        {showSuggestions && searchQuery && filteredSuggestions.length > 0 && (
          <ul className="suggestions-list">
            {filteredSuggestions.map((item, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(item)}
                className="suggestion-item"
              >
                {item.name} ({item.city})
              </li>
            ))}
          </ul>
        )}
        <input
          type="date"
          className="date-input"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
        />
        <input
          type="date"
          className="date-input"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
        />
        <input
          type="number"
          placeholder="Number of Persons"
          className="num-persons-input"
          min="1"
          value={numPersons}
          onChange={(e) => setNumPersons(e.target.value)}
        />
        <button className="search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Hero;
