import React from 'react';
import './CalendarHeader.scss';
import moment from 'moment';
import { motion } from "framer-motion";
import Model from "./Logo/Logo";

const CustomToolbarNoAuth = ({ date, allUsers, onPrevClick, onNextClick, onNext  }) => {
    const currentDate = moment(date);
    const currentMonth = currentDate.format("MMMM");
    
    return (
      <div className='calendar-header'>
        <div className='header-content'>
          <div>
            <Model />
          </div>
          <div className='navigation-bt'>
            <span className='current-month'>{currentMonth}</span>
            <div className='navigation-buttons'>
                <button onClick={onPrevClick}><img src="https://svgshare.com/i/yKX.svg" alt="prev" /></button>
                <button onClick={onNextClick}><img src="https://svgshare.com/i/yL3.svg" alt="next" /></button>
            </div>
            <motion.div
              className="box"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <button className='custom-button' onClick={onNext}>Войти</button>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }
  
  export default CustomToolbarNoAuth;