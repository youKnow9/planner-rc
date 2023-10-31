import React, { useState, useEffect, useRef } from "react";
import {
  Calendar,
  momentLocalizer,
  dateFnsLocalizer,
} from "react-big-calendar";
import moment from "moment";
import CreateEventModal from "../CreateEventModal/CreateEventModal";
import "moment/locale/ru";
import CustomDateHeader from "./CustomDateHeader/CustomDateHeader";
import "react-big-calendar/lib/css/react-big-calendar.css";
import api from "../../shared/Api/init";
import ModalEvent from "../Modal/ModalEvent";
import ModalLogin from "../Modal/ModalLogin";
import ModalRegisterUser from "../Modal/ModalRegisterUser";
import CustomToolbarNoAuth from "../CustomToolbar/CustomToolbarNoAuth";
import CustomToolbarAuth from "../CustomToolbar/CustomToolbarAuth";
import styles from "./Calendar.scss";

const messages = {
  date: "Дата",
  time: "Время",
  event: "Событие",
  allDay: "Весь день",
  week: "Неделя",
  month: "Месяц",
  day: "День",
  agenda: "Повестка дня",
};

const localizer = momentLocalizer(moment);
moment.updateLocale("ru", {
  week: {
    dow: 1,
    doy: 4,
  },
  weekdaysMin: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
});

function App() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [modalEventOpen, setModalEventOpen] = useState(false);
  const [modalLoginOpen, setModalLoginOpen] = useState(false);
  const [modalRegisterOpen, setModalRegisterOpen] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);

  function getJWTFromLocalStorage() {
    return localStorage.getItem("jwt");
  }

  useEffect(() => {
    const jwt = getJWTFromLocalStorage();
    if (jwt) {
      setIsAuthenticated(true);
      // localStorage.removeItem('jwt');
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      api
        .get("/users", {
          headers: { Authorization: `Bearer ${getJWTFromLocalStorage()}` },
        })
        .then((response) => {
          setAllUsers(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [isAuthenticated]);

  const openCreateEventModal = () => {
    if (isAuthenticated) {
      setShowCreateEventModal(true);
    } else {
      console.log("Пользователь не авторизован");
    }
  };

  const handleLoginClick = () => {
    setModalLoginOpen(true);
  };

  const setAuthenticated = () => {
    setIsAuthenticated(true);
  };

  const handleModalEventClose = () => {
    setModalEventOpen(false);
  };

  const handlePrevClick = () => {
    setCurrentDate(moment(currentDate).subtract(1, "M").toDate());
  };

  const handleNextClick = () => {
    setCurrentDate(moment(currentDate).add(1, "M").toDate());
  };

  const handleModalEventNext = () => {
    setModalEventOpen(false);
    setModalLoginOpen(true);
  };

  const handleModalLoginClose = () => {
    setModalLoginOpen(false);
  };

  const handleModalLoginNext = () => {
    setModalLoginOpen(false);
    setModalRegisterOpen(true);
  };

  const handleModalRegisterClose = () => {
    setModalRegisterOpen(false);
  };

  const handleEventClick = async (event) => {
    setSelectedEvent(event);
    setModalEventOpen(true);
  };

  const closeCreateEventModal = () => {
    setShowCreateEventModal(false);
  };

  const handleSaveEvent = async (eventData) => {
    try {
      await api.post("events", eventData);
      setEvents((prevEvents) => [...prevEvents, eventData]);
      closeCreateEventModal();
    } catch (error) {
      console.error(error);
    }
  };

  const customEventPropGetter = (event, start, end, isSelected) => {
    const currentDate = new Date();
    if (start < currentDate) {
      return {
        className: "past-event",
      };
    }
    return {};
  };

  const dayStyleGetter = (date, now) => {
    const style = {
      height: "128px",
    };
    return {
      style,
    };
  };

  useEffect(() => {
    const fetchDataAndHandleError = async () => {
      try {
        const response = await api.get("events?populate=*");
        const data = response.data.data;
        const formattedEvents = data.map(async (el, i) => {
          const start = new Date(el.dateStart);
          let end = new Date(start);
          end = new Date(end.setHours(start.getHours() + 1));
          if (el.photos !== null) {
            el.photos.forEach((elem) => {
              elem.src = "http://localhost:1337" + elem.url;
            });
          }
          return {
            title: el.title,
            start: start,
            end: end,
            discription: el.description,
            photos: el.photos,
            location: el.location,
            participants: el.participants,
          };
        });
        const resolvedEvents = await Promise.all(formattedEvents);
        setEvents(resolvedEvents);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataAndHandleError();
  }, [showCreateEventModal]);

  return (
    <div className={styles.appContainer}>
      {isAuthenticated ? (
        <CustomToolbarAuth
          date={currentDate}
          onPrevClick={handlePrevClick}
          onNextClick={handleNextClick}
          allUsers={allUsers}
        />
      ) : (
        <CustomToolbarNoAuth
          date={currentDate}
          onPrevClick={handlePrevClick}
          onNextClick={handleNextClick}
          onNext={handleModalEventNext}
        />
      )}
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        date={currentDate}
        endAccessor="end"
        selectable
        eventPropGetter={customEventPropGetter}
        onSelectEvent={handleEventClick}
        dayPropGetter={dayStyleGetter}
        onSelectSlot={(slotInfo) => {
          setSelectedSlot(slotInfo);
          openCreateEventModal();
        }}
        components={{
          month: {
            dateHeader: CustomDateHeader,
          },
        }}
        onNavigate={(newDate) => {
          setCurrentDate(newDate);
        }}
      />
      <CreateEventModal
        open={showCreateEventModal}
        onClose={closeCreateEventModal}
        onSave={handleSaveEvent}
        userList={allUsers}
      />
      <ModalEvent
        event={selectedEvent}
        open={modalEventOpen}
        onClose={handleModalEventClose}
        onNext={handleModalEventNext}
      />
      <ModalLogin
        open={modalLoginOpen}
        onClose={handleModalLoginClose}
        onNext={handleModalLoginNext}
        setAuthenticated={setIsAuthenticated}
      />
      <ModalRegisterUser
        open={modalRegisterOpen}
        onClose={handleModalRegisterClose}
        setAuthenticated={setIsAuthenticated}
      />
    </div>
  );
}

export default App;