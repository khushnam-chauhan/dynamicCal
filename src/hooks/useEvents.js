import { useState, useEffect } from 'react';

const useEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem('events')) || [];
    setEvents(savedEvents);
  }, []);

  const saveEvent = (event) => {
    const newEvents = [...events, event];
    setEvents(newEvents);
    localStorage.setItem('events', JSON.stringify(newEvents));
  };

  const getEventsByDate = (date) => {
    return events.filter(event => event.date === date);
  };

  return {
    events,
    saveEvent,
    getEventsByDate
  };
};

export default useEvents;
