import React, { useState, useEffect } from 'react';
import { getDaysInMonth, getFirstDayOfMonth } from '../../utils/dateUtils';
import './CalendarGrid.css';

const CalendarGrid = ({ selectedDate, setSelectedDate, events, setEvents }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [eventDetails, setEventDetails] = useState({ 
    name: '', 
    startTime: '', 
    endTime: '', 
    description: '' 
  });

  const currentDay = new Date();  // Current date for highlighting the day
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
  const daysInMonth = getDaysInMonth(currentMonth);

  const handleDateClick = (day) => {
    const newSelectedDate = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day
    );
    setSelectedDate(newSelectedDate);
    setIsOverlayVisible(true);
  };

  const handleAddEvent = () => {
    if (!selectedDate) return;

    const newEvent = {
      date: selectedDate,
      name: eventDetails.name,
      startTime: eventDetails.startTime,
      endTime: eventDetails.endTime,
      description: eventDetails.description,
    };

    setEvents(prevEvents => [...prevEvents, newEvent]);
    setEventDetails({ name: '', startTime: '', endTime: '', description: '' });
    setIsOverlayVisible(false);
  };

  const eventsOnSelectedDate = events.filter(event => {
    if (!selectedDate || !event.date) return false;
    
    const eventDate = new Date(event.date);
    return (
      eventDate.getDate() === selectedDate.getDate() &&
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  const eventCounts = events.reduce((acc, event) => {
    const eventDate = new Date(event.date);
    if (
      eventDate.getMonth() === currentMonth.getMonth() &&
      eventDate.getFullYear() === currentMonth.getFullYear()
    ) {
      const day = eventDate.getDate();
      acc[day] = (acc[day] || 0) + 1;
    }
    return acc;
  }, {});

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString('en-GB', { 
        weekday: 'long',
        day: 'numeric', 
        month: 'short',
        year: 'numeric'
      })
    : '';

  const gridDays = [];
  for (let i = 1; i <= daysInMonth; i++) {
    gridDays.push(i);
  }

  while (gridDays.length < 42) {
    gridDays.push(null);
  }

  // Handle month navigation
  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)));
  };

  // Days of the week header
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <div>{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</div>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      
      <div className="calendar-weekdays">
        {weekdays.map((day, index) => (
          <div key={index} className="weekday">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {gridDays.map((day, index) => {
          const dayOfMonth = day;
          const isValidDay = dayOfMonth !== null;
          const isCurrentDay = currentDay.getDate() === dayOfMonth && currentMonth.getMonth() === currentDay.getMonth();

          return isValidDay ? (
            <div
              key={index}
              className={`calendar-day ${isCurrentDay ? 'current-day' : ''} ${dayOfMonth === selectedDate?.getDate() ? 'highlight' : ''}`}
              onClick={() => handleDateClick(dayOfMonth)}
            >
              {dayOfMonth}
              {eventCounts[dayOfMonth] && <div className="event-count">{eventCounts[dayOfMonth]}</div>}
            </div>
          ) : (
            <div key={index} className="empty-day"></div>
          );
        })}
      </div>

      {isOverlayVisible && (
        <div className="event-overlay">
          <div className="overlay-content">
            <div className="event-list">
              <h3>Events on {formattedDate}</h3>
              {eventsOnSelectedDate.length > 0 ? (
                eventsOnSelectedDate.map((event, index) => (
                  <div key={index} className="event-item">
                    <div className="event-name">{event.name}</div>
                    <div>{event.startTime} - {event.endTime}</div>
                    <div>{event.description}</div>
                    <button onClick={() => handleDeleteEvent(event)}>Delete</button>
                  </div>
                ))
              ) : (
                <p>No events for this day.</p>
              )}
            </div>
            <div className="event-form">
              <h3>Add Event</h3>
              <input
                type="text"
                placeholder="Event Name"
                value={eventDetails.name}
                onChange={(e) => setEventDetails({ ...eventDetails, name: e.target.value })}
              />
              <input
                type="time"
                value={eventDetails.startTime}
                onChange={(e) => setEventDetails({ ...eventDetails, startTime: e.target.value })}
              />
              <input
                type="time"
                value={eventDetails.endTime}
                onChange={(e) => setEventDetails({ ...eventDetails, endTime: e.target.value })}
              />
              <textarea
                placeholder="Event Description"
                value={eventDetails.description}
                onChange={(e) => setEventDetails({ ...eventDetails, description: e.target.value })}
              />
              <button onClick={handleAddEvent}>Add Event</button>
              <button onClick={() => setIsOverlayVisible(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarGrid;
