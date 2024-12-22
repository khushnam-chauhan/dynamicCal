import React from 'react';
import './EventModal.css';

const EventModal = ({ selectedDate, eventDetails, setEventDetails, handleAddEvent, setIsModalOpen, events }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({ ...eventDetails, [name]: value });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Events for {selectedDate}</h3>
        <div>
          {events.filter(event => event.date === selectedDate).length > 0 ? (
            <div>
              <h4>Existing Events:</h4>
              {events.filter(event => event.date === selectedDate).map((event, index) => (
                <div key={index} className="event">
                  <div>{event.name}</div>
                  <div>{event.startTime} - {event.endTime}</div>
                  <div>{event.description}</div>
                </div>
              ))}
            </div>
          ) : (
            <div>No events for this date.</div>
          )}
        </div>
        <div>
          <h4>Add New Event</h4>
          <label>
            Event Name:
            <input
              type="text"
              name="name"
              value={eventDetails.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Start Time:
            <input
              type="time"
              name="startTime"
              value={eventDetails.startTime}
              onChange={handleChange}
            />
          </label>
          <label>
            End Time:
            <input
              type="time"
              name="endTime"
              value={eventDetails.endTime}
              onChange={handleChange}
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={eventDetails.description}
              onChange={handleChange}
            ></textarea>
          </label>
          <button onClick={handleAddEvent}>Add Event</button>
          <button onClick={closeModal}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
