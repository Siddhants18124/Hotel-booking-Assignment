import React, { useState } from "react";
import "./Filters.css";

const Filters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    price: [],
    rating: [],
    city: [],
  });

  const handleFilterChange = (category, value, checked) => {
    const updatedFilters = { ...filters };
    if (checked) {
      updatedFilters[category] = [...updatedFilters[category], value];
    } else {
      updatedFilters[category] = updatedFilters[category].filter(
        (item) => item !== value
      );
    }
    setFilters(updatedFilters);
    onFilterChange(updatedFilters); // Pass updated filters to the parent
  };

  const handleClearAll = () => {
    const clearedFilters = { price: [], rating: [], city: [] };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const handleRemoveFilter = (category, value) => {
    const updatedFilters = { ...filters };
    updatedFilters[category] = updatedFilters[category].filter(
      (item) => item !== value
    );
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="filters">
      <div className="filters-header">
        <h3>Filters</h3>
        <span
          className="clear-all-text"
          onClick={handleClearAll}
          style={{ color: "#0A66BB", cursor: "pointer" }}
        >
          Clear All
        </span>
      </div>

      <div className="active-filters">
        {Object.keys(filters).map((category) =>
          filters[category].map((filter) => (
            <span
              key={filter}
              className="filter-pill"
              style={{
                backgroundColor: "#0A66BB",
                color: "white",
                padding: "5px 10px",
                borderRadius: "20px",
                display: "inline-flex",
                alignItems: "center",
                margin: "5px",
              }}
            >
              {filter}
              <button
                className="remove-filter-button"
                style={{
                  background: "none",
                  border: "none",
                  color: "white",
                  marginLeft: "8px",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
                onClick={() => handleRemoveFilter(category, filter)}
              >
                &times;
              </button>
            </span>
          ))
        )}
      </div>

      <hr className="separator" />

      <div className="filter-group">
        <h4>Price Range</h4>
        <label>
          <input
            type="checkbox"
            value="1000"
            onChange={(e) =>
              handleFilterChange("price", e.target.value, e.target.checked)
            }
          />
          Up to ₹1000
        </label>
        <label>
          <input
            type="checkbox"
            value="1001 - 2000"
            onChange={(e) =>
              handleFilterChange("price", e.target.value, e.target.checked)
            }
          />
          ₹1001 to ₹2000
        </label>
        <label>
          <input
            type="checkbox"
            value="2001 - 5000"
            onChange={(e) =>
              handleFilterChange("price", e.target.value, e.target.checked)
            }
          />
          ₹2001 to ₹5000
        </label>
        <label>
          <input
            type="checkbox"
            value="5000"
            onChange={(e) =>
              handleFilterChange("price", e.target.value, e.target.checked)
            }
          />
          Above ₹5000
        </label>
      </div>

      <div className="filter-group">
        <h4>Rating</h4>
        <label>
          <input
            type="checkbox"
            value="1 - 2 Stars"
            onChange={(e) =>
              handleFilterChange("rating", e.target.value, e.target.checked)
            }
          />
          1 - 2 Stars
        </label>
        <label>
          <input
            type="checkbox"
            value="3 - 4 Stars"
            onChange={(e) =>
              handleFilterChange("rating", e.target.value, e.target.checked)
            }
          />
          3 - 4 Stars
        </label>
        <label>
          <input
            type="checkbox"
            value="4 - 5 Stars"
            onChange={(e) =>
              handleFilterChange("rating", e.target.value, e.target.checked)
            }
          />
          4 - 5 Stars
        </label>
      </div>

      <div className="filter-group">
        <h4>City</h4>
        <label>
          <input
            type="checkbox"
            value="Mumbai"
            onChange={(e) =>
              handleFilterChange("city", e.target.value, e.target.checked)
            }
          />
          Mumbai
        </label>
        <label>
          <input
            type="checkbox"
            value="Kolkata"
            onChange={(e) =>
              handleFilterChange("city", e.target.value, e.target.checked)
            }
          />
          Kolkata
        </label>
        <label>
          <input
            type="checkbox"
            value="Bangalore"
            onChange={(e) =>
              handleFilterChange("city", e.target.value, e.target.checked)
            }
          />
          Bangalore
        </label>
        <label>
          <input
            type="checkbox"
            value="Jaipur"
            onChange={(e) =>
              handleFilterChange("city", e.target.value, e.target.checked)
            }
          />
          Jaipur
        </label>
      </div>
    </div>
  );
};

export default Filters;
