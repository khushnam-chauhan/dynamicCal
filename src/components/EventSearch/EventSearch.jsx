import React, { useState } from 'react';

const EventSearch = ({ events }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filter events based on the search query
    if (query) {
      const filtered = events.filter(event =>
        event.name.toLowerCase().includes(query.toLowerCase()) ||
        event.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents([]); // Show no events when there's no search query
    }
  };

  return (
    <div className="event-search">
      <input
        type="text"
        placeholder="Search events..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <div className="search-results">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <div key={index} className="event-item">
              <div>{event.name}</div>
              <div>{event.startTime} - {event.endTime}</div>
              <div>{event.description}</div>
            </div>
          ))
        ) : (
          <p>No events found.</p>
        )}
      </div>
    </div>
  );
};

export default EventSearch;
