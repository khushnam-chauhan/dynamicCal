import React, { useState } from 'react';
import CalendarGrid from './components/CalendarGrid/CalendarGrid';
import Header from './components/Header/Header';
import './App.css';
import EventSearch from './components/EventSearch/EventSearch';
import EventExport from './components/EventExport/EventExport';

const App = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);

  const handleAddEvent = (eventDetails) => {
    // Create a proper date object for the event
    const eventDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate()
    );

    const newEvent = {
      ...eventDetails,
      date: eventDate,
    };

    setEvents(prevEvents => [...prevEvents, newEvent]);
  };

  return (
    <div className="app">
      <div className="main-content">
        <div className="right-section">
          <Header />
          <div className="clock-container">
            <div className="date-info">
              <span>{new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}</span>
            </div>
          </div>

          <CalendarGrid 
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate} 
            events={events} 
            setEvents={setEvents} 
            handleAddEvent={handleAddEvent}
          />
        </div>

        <div className="left-section">
          <div className="upcoming-events">
            <h3>Upcoming Events</h3>
            {events.length > 0 ? (
              events
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map((event, index) => {
                  // Ensure we're working with a proper Date object
                  const eventDate = new Date(event.date);
                  const formattedDate = eventDate.toLocaleDateString('en-GB', { 
                    weekday: 'short',
                    day: 'numeric', 
                    month: 'short',
                    year: 'numeric'
                  });

                  return (
                    <div key={index} className="event-item">
                      <div className="event-date">
                        <span>{formattedDate}</span>
                      </div>
                      <div className="event-name">{event.name}</div>
                      <div>{event.startTime} - {event.endTime}</div>
                      <div>{event.description}</div>
                    </div>
                  );
                })
            ) : (
              <p>No upcoming events.</p>
            )}
          </div>

          <div className='events-ops'>
          <h3>Events</h3>
          <EventSearch events={events} />
          <EventExport events={events} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;