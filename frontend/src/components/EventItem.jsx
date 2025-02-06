import React from 'react';

const EventItem = ({ event }) => {
  return (
    <div>
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <a href={event.link} target="_blank" rel="noopener noreferrer">
        Get Tickets
      </a>
    </div>
  );
};

export default EventItem;
