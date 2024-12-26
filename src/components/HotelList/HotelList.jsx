import React, { useEffect, useState } from "react";
import Filters from "../Filters/Filters";
import HotelCard from "../HotelCard/HotelCard";
import Pagination from "../Pagination/Pagination";
import HeroSection from "../Hero/Hero";
import "./HotelList.css";

const HotelList = () => {
  const [allHotels, setAllHotels] = useState([]); // All hotels fetched
  const [filteredHotels, setFilteredHotels] = useState([]); // Hotels after filtering
  const [page, setPage] = useState(1); // Current page number
  const [size] = useState(6); // Number of hotels per page
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchHotels = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://www.gocomet.com/api/assignment/hotels?page=1&size=30`
      ); // Fetch all hotels
      if (!response.ok) throw new Error("Failed to fetch hotels");
      const data = await response.json();
      if (data.success) {
        setAllHotels(data.hotels);
        setFilteredHotels(data.hotels);
      } else {
        setError("Failed to fetch hotels");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (filters) => {
    const { price, rating, city } = filters;

    const filtered = allHotels.filter((hotel) => {
      const withinPrice =
        !price.length ||
        price.some((range) => {
          // Ensure range is a string before processing
          if (typeof range !== "string") return false;

          const [min, max] = range
            .split("-")
            .map((s) => parseInt(s.trim().replace("₹", "")) || 0);
          return hotel.rooms.some(
            (room) => room.price >= min && room.price <= (max || Infinity)
          );
        });

      const withinRating =
        !rating.length ||
        rating.some((range) => {
          // Ensure range is a string before processing
          if (typeof range !== "string") return false;

          const [min, max] = range.split("-").map((r) => parseFloat(r.trim()));
          return hotel.rating >= min && hotel.rating <= max;
        });

      const inCity = !city.length || city.includes(hotel.city);

      return withinPrice && withinRating && inCity;
    });

    setFilteredHotels(filtered);
    setPage(1); // Reset to first page after applying filters
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const paginatedHotels = filteredHotels.slice((page - 1) * size, page * size);

  return (
    <div>
      <HeroSection />
      <div className="hotel-list">
        <aside className="filters-section">
          <Filters onFilterChange={applyFilters} />
        </aside>
        <main className="hotels-section">
          <h2>Explore Hotels</h2>
          {loading && <p>Loading hotels...</p>}
          {error && <p className="error">{error}</p>}
          {!loading && !error && filteredHotels.length === 0 && (
            <p>No hotels found</p>
          )}
          <div className="hotels-grid">
            {paginatedHotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                id={hotel.id} // Pass the ID
                name={hotel.name}
                location={hotel.city}
                rating={hotel.rating}
                priceRange={`₹${hotel.rooms[0]?.price} - ₹${
                  hotel.rooms[hotel.rooms.length - 1]?.price
                }`}
                images={[hotel.image_url]}
              />
            ))}
          </div>
          <Pagination currentPage={page} onPageChange={setPage} />
        </main>
      </div>
    </div>
  );
};

export default HotelList;
