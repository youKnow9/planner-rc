import React from 'react';
import './CalendarHeader.scss';

const CalendarHeader = ({ date, label, onPrevClick, onNextClick, onCustomButtonClick }) => {

  return (
    <div className='calendar-header'>
      <div className='header-content'>
        <div>
          {/* <img className='logo' src='https://svgshare.com/i/yJX.svg' alt='logo' /> */}
          <span className='name-rc'>planner <span>event</span></span>
        </div>
        <div className='navigation-buttons'>
          <span className='title'>{label}</span>
          <button onClick={onNextClick}><img src="https://svgshare.com/i/yKX.svg" alt="prev" /></button>
          <button onClick={onPrevClick}><img src="https://svgshare.com/i/yL3.svg" alt="next" /></button>
        </div>
        <button className='custom-button' onClick={onCustomButtonClick}>Войти</button>
      </div>
    </div>
  );
}

export default CalendarHeader;