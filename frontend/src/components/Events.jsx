import React, { useEffect, useState } from "react";
import { fetchEvents, scrapeEvents } from "../services/api";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadEvents(page);
  }, [page]);

  const loadEvents = async (currentPage) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchEvents(currentPage);
      setEvents(data.events);
      setTotalPages(data.total_pages);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleScrape = async () => {
    setError(null);
    try {
      await scrapeEvents();
      alert("Scraping started! Refresh events after a while.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div
      className="w-full max-w-7xl shadow-md rounded-lg p-6 border border-gray-200"
      style={{ backgroundColor: "#F3F4F6" }} // Softer background
    >

      <div className="flex gap-4 mb-4 justify-center">
        <button
          onClick={handleScrape}
          className="px-4 py-2 font-semibold rounded-lg transition"
          style={{ backgroundColor: "#1E3A8A", color: "#FFFFFF" }}
        >
          Scrape New Events
        </button>
        <button
          onClick={() => loadEvents(page)}
          className="px-4 py-2 font-semibold rounded-lg transition"
          style={{ backgroundColor: "#60A5FA", color: "#FFFFFF" }}
        >
          Refresh Events
        </button>
      </div>

      {error && <p className="text-red-500 text-sm mb-2">⚠ {error}</p>}

      {/* Loading & Events */}
      {loading ? (
        <p className="text-center text-lg font-semibold" style={{ color: "#1E3A8A" }}>
          Loading events...
        </p>
      ) : events.length === 0 ? (
        <p className="text-center text-lg font-semibold" style={{ color: "#1E3A8A" }}>
          No events found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event, index) => (
            <div
              key={index}
              className="p-4 border border-gray-300 rounded-lg shadow-sm flex flex-col items-center"
              style={{ backgroundColor: "#EBF5FB" }}
            >
              <h2 className="text-xl font-semibold text-center" style={{ color: "#1E3A8A" }}>
                {event.title}
              </h2>
              <p className="text-gray-700 text-sm text-center">{event.description}</p>
              
              {event.image && (
                <img
                  src={event.image}
                  alt={event.title}
                  className="mt-2 w-full h-32 object-cover rounded-lg"
                />
              )}

              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 px-4 py-2 rounded-lg font-semibold transition "
                style={{
                  backgroundColor: "#1E3A8A",
                  color: "#FFFFFF",
                  textAlign: "center",
                  display: "inline-block",
                }}
              >
                View Event
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
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
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
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
    </div>
  );
}

export default Events;
