import React, { useEffect, useState } from "react";
import { fetchEvents, scrapeEvents } from "../services/api.js";
import EventCard from "./EventCard.jsx";
import Pagination from "./Pagination.jsx";
import Otp from "./Otp.jsx";

function EventListing() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isOtpOpen, setIsOtpOpen] = useState(false);

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

  const openOtpModal = (event) => {
    setSelectedEvent(event);
    setIsOtpOpen(true);
  };

  const closeOtpModal = () => {
    setSelectedEvent(null);
    setIsOtpOpen(false);
  };

  return (
    <div
      className="w-full max-w-7xl shadow-md rounded-lg p-6 border border-gray-200"
      style={{ backgroundColor: "#F3F4F6" }}
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

      {loading ? (
        <p
          className="text-center text-lg font-semibold"
          style={{ color: "#1E3A8A" }}
        >
          Loading events...
        </p>
      ) : events.length === 0 ? (
        <p
          className="text-center text-lg font-semibold"
          style={{ color: "#1E3A8A" }}
        >
          No events found.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event, index) => (
            <EventCard key={index} event={event} onView={openOtpModal} />
          ))}
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      <Otp event={selectedEvent} isOpen={isOtpOpen} onClose={closeOtpModal} />
    </div>
  );
}

export default EventListing;
