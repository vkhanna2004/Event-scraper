import React from "react";

function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="flex items-center justify-center space-x-4 mt-6">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-4 py-2 rounded font-semibold transition"
        style={{
          backgroundColor: page === 1 ? "#CCCCCC" : "#60A5FA",
          color: "#FFFFFF",
          cursor: page === 1 ? "not-allowed" : "pointer",
        }}
      >
        ⬅ Previous
      </button>
      <span className="font-semibold text-lg" style={{ color: "#1E3A8A" }}>
        Page {page} of {totalPages}
      </span>
      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-4 py-2 rounded font-semibold transition"
        style={{
          backgroundColor: page === totalPages ? "#CCCCCC" : "#60A5FA",
          color: "#FFFFFF",
          cursor: page === totalPages ? "not-allowed" : "pointer",
        }}
      >
        Next ➡
      </button>
    </div>
  );
}

export default Pagination;
