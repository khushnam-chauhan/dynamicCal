import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import './EventExport.css'
const EventExport = ({ events }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const handleMonthChange = (e) => {
    setSelectedMonth(Number(e.target.value));
  };

  // Format date helper function
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getFilteredEvents = () => {
    return events.filter((event) => {
      if (event.date) {
        const eventDate = new Date(event.date);
        return eventDate.getMonth() === selectedMonth;
      }
      return false;
    });
  };

  const exportEvents = (format) => {
    const filteredEvents = getFilteredEvents();

    if (filteredEvents.length === 0) {
      alert('No events available to export for the selected month');
      return;
    }

    if (format === 'json') {
      const exportData = filteredEvents.map(event => ({
        date: formatDate(event.date),
        startTime: event.startTime || '',
        endTime: event.endTime || '',
        name: event.name || '',
        description: event.description || ''
      }));

      const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
        type: 'application/json' 
      });
      saveAs(blob, `events-${months[selectedMonth]}.json`);
    } else if (format === 'csv') {
      const header = 'Date,Start Time,End Time,Title,Description\n';
      const rows = filteredEvents
        .map((event) => {
          const formattedDate = formatDate(event.date);
          const name = (event.name || '').replace(/"/g, '""'); // Escape quotes in CSV
          const description = (event.description || '').replace(/"/g, '""');
          return `"${formattedDate}","${event.startTime || ''}","${event.endTime || ''}","${name}","${description}"`;
        })
        .join('\n');

      if (rows) {
        const csv = header + rows;
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
        saveAs(blob, `events-${months[selectedMonth]}.csv`);
      } else {
        alert('Error processing events data');
      }
    }
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const filteredEvents = getFilteredEvents();

  return (
    <div className="event-export">
      <div className="month-selector">
        <label>Select Month:</label>
        <select onChange={handleMonthChange} value={selectedMonth}>
          {months.map((month, index) => (
            <option key={index} value={index}>
              {month}
            </option>
          ))}
        </select>
      </div>

      <div style={{ fontSize: '0.8em', color: '#666', marginTop: '8px', marginBottom: '8px' }}>
        Total Events: {events?.length || 0}
        <br />
      </div>

      <button onClick={() => exportEvents('json')}>Export to JSON</button>
      <button onClick={() => exportEvents('csv')}>Export to CSV</button>
    </div>
  );
};

export default EventExport;