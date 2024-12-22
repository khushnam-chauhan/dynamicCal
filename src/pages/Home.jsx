import React, { useState } from 'react';
import CalendarGrid from '../components/CalendarGrid/CalendarGrid';
import EventModal from '../components/EventModal';
import useEvents from '../hooks/useEvents';

const Home = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { events, saveEvent, getEventsByDate } = useEvents();

  const handleSaveEvent = (event) => {
    saveEvent({ ...event, date: selectedDate });
  };

  return (
    <div className="home">
      <div className="left-section">
        <CalendarGrid setSelectedDate={setSelectedDate} />
        <div className="event-list">
          <h3>Events on {selectedDate}</h3>
          {getEventsByDate(selectedDate).map(event => (
            <div key={event.eventName}>
              <div>{event.eventName}</div>
              <div>{event.startTime} - {event.endTime}</div>
              <div>{event.description}</div>
            </div>
          ))}
        </div>
      </div>
      {showModal && (
        <EventModal
          selectedDate={selectedDate}
          onClose={() => setShowModal(false)}
          onSave={handleSaveEvent}
        />
      )}
    </div>
  );
};

export default Home;
