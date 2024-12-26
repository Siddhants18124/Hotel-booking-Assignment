import React from "react";
import "./Pagination.css";

const Pagination = ({ currentPage, onPageChange }) => {
  const totalPages = 5; // Total number of pages

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="pagination">
      <button
        className="page-btn"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {Array.from({ length: totalPages }, (_, index) => {
        const pageNum = index + 1;
        return (
          <button
            key={pageNum}
            className={`page-btn ${currentPage === pageNum ? "active" : ""}`}
            onClick={() => onPageChange(pageNum)}
          >
            {pageNum}
          </button>
        );
      })}
      <button
        className="page-btn"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
