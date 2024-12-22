import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    // Update the time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Format the date as '22 Dec 2024'
    const date = new Date();
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    setFormattedDate(date.toLocaleDateString('en-GB', options));

    // Cleanup the interval on component unmount
    return () => clearInterval(timeInterval);
  }, []);

  const currentDay = currentTime.getDate();
  const currentMonth = currentTime.getMonth(); // 0-based
  const currentYear = currentTime.getFullYear();

  const currentDateFormatted = `${currentDay} ${currentTime.toLocaleString('default', { month: 'short' })} ${currentYear}`;

  return (
    <header className="header">
      <div className="time-date">
        <div className="digital-time">
          <div className="round-clock">
            {currentTime.toLocaleTimeString()}
            <div className="water-drop"></div>
          </div>
        </div>
        <div className="date-info">
          <div>{formattedDate}</div>
        </div>
        <h3>Dynamic calendar</h3>
      </div>
    </header>
  );
};

export default Header;
