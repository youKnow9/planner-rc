import React, { useState } from "react";
import "./CalendarHeader.scss";
import moment from "moment";
import CreateEventModal from "../CreateEventModal/CreateEventModal";

const CustomToolbarAuth = ({ date, onPrevClick, onNextClick, allUsers }) => {
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const currentDate = moment(date);
  const currentMonth = currentDate.format("MMMM");

  return (
    <div className="calendar-header">
      <div className="header-content">
        <div>
          <span className="name-rc">
            planner <span>event</span>
          </span>
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
            <button
              className="custom-button-plus"
              onClick={() => setShowCreateEventModal(true)}
            >
              <img src="https://svgshare.com/i/yXh.svg" alt="add-event" />
            </button>
          </div>
        </div>
      </div>
      {showCreateEventModal && (
        <CreateEventModal
          open={showCreateEventModal}
          onClose={() => setShowCreateEventModal(false)}
          userList={allUsers}
        />
      )}
    </div>
  );
};

export default CustomToolbarAuth;
