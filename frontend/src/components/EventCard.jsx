import React from "react";

function EventCard({ event, onView }) {
  return (
    <div
      className="p-4 border border-gray-300 rounded-lg shadow-sm flex flex-col items-center"
      style={{ backgroundColor: "#EBF5FB" }}
    >
      <h2
        className="text-xl font-semibold text-center"
        style={{ color: "#1E3A8A" }}
      >
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
      <button
        onClick={() => onView(event)}
        className="mt-4 px-4 py-2 rounded-lg font-semibold transition"
        style={{ backgroundColor: "#1E3A8A", color: "#FFFFFF" }}
      >
        View Event
      </button>
    </div>
  );
}

export default EventCard;
