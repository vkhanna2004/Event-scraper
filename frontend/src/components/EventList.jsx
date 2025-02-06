import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EventItem from './EventItem.jsx';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from the Flask API
    axios.get('http://localhost:5000/events')
      .then(response => setEvents(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      {events.map(event => (
        <EventItem key={event._id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
