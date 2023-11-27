import React, { useState} from "react";
import "./CalendarHeader.scss";
import moment from "moment";
import { motion } from "framer-motion";
import Model from "./Logo/Logo";
import ModalLogOut from './ModalLogOut/ModalLogOut';

const CustomToolbarAuth = ({ date, onPrevClick, onNextClick, setAuthenticated }) => {
  const [modalLogOutOpen, setModalLogOutOpen] = useState(false);
  const currentDate = moment(date);
  const currentMonth = currentDate.format("MMMM");

  const handleLogOutClose = () => {
    setModalLogOutOpen(false);
  };

  const handleLogOutOpen = () => {
    setModalLogOutOpen(true);
  };
  
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setAuthenticated(false);
  };

  return (
    <div className="calendar-header">
      <div className="header-content">
        <div>
          <Model />
        </div>
        <div className="navi-wrapper">
          <div className="navigation-bt">
            <span className="current-month">{currentMonth}</span>
            <div>
              <button onClick={onPrevClick}>
                <img src="https://svgshare.com/i/yKX.svg" alt="prev" />
              </button>
              <button onClick={onNextClick}>
                <img src="https://svgshare.com/i/yL3.svg" alt="next" />
              </button>
            </div>
          </div>
          <div className="bt-wrapper">
          <motion.div
            className="box"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <button className="custom-button" onClick={handleLogOutOpen}>Выйти</button>
            <ModalLogOut open={modalLogOutOpen} onClose={handleLogOutClose} handleLogout={handleLogout} />
          </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomToolbarAuth;
