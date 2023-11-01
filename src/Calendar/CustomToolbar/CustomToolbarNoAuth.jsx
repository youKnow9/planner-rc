import React from 'react';
import './CalendarHeader.scss';
import moment from 'moment';
import Modal from '@mui/material/Modal';

const CustomToolbarNoAuth = ({ date, allUsers, onPrevClick, onNextClick, onNext  }) => {
    const [showLoginModal, setShowLoginModal] = React.useState(false);
  
    const currentDate = moment(date);
    const currentMonth = currentDate.format("MMMM");
    
    return (
      <div className='calendar-header'>
        <div className='header-content'>
          <div>
            <span className='name-rc'>planner <span>event</span></span>
          </div>
          <div className='navigation-bt'>
            <span className='current-month'>{currentMonth}</span>
            <div className='navigation-buttons'>
                <button onClick={onPrevClick}><img src="https://svgshare.com/i/yKX.svg" alt="prev" /></button> {/* Предыдущий месяц */}
                <button onClick={onNextClick}><img src="https://svgshare.com/i/yL3.svg" alt="next" /></button> {/* Следующий месяц */}
            </div>
            <button className='custom-button' onClick={onNext}>Войти</button>
          </div>
        </div>
      </div>
    );
  }
  
  export default CustomToolbarNoAuth;