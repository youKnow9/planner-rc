import React, { useState, useEffect } from "react";
import {
  Calendar,
  momentLocalizer,
} from "react-big-calendar";
import moment from "moment";
import CreateEventModal from "../Modal/CreateEventModal/CreateEventModal";
import "moment/locale/ru";
import CustomDateHeader from "./CustomDateHeader/CustomDateHeader";
import "react-big-calendar/lib/css/react-big-calendar.css";
import api from "../../shared/Api/init";
import ModalEvent from "../Modal/ModalEvent/ModalEvent";
import ModalLogin from "../Modal/ModalLogin/ModalLogin";
import ModalRegisterUser from "../Modal/ModalRegisterUser/ModalRegisterUser";
import CustomToolbarNoAuth from "./CustomToolbar/CustomToolbarNoAuth";
import CustomToolbarAuth from "./CustomToolbar/CustomToolbarAuth";
import styles from "./MainCalendar.scss";
import { format } from "date-fns";
import { Context } from '../Context';
moment.locale('ru');


const localizer = momentLocalizer(moment);
moment.updateLocale("ru", {
  week: {
    dow: 1,
    doy: 4,
  }
});

function MainCalendar() {
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
  const [emailUser, setEmailUser] = useState('');
  const [participantsUpdated, setParticipantsUpdated] = useState(false);
  const [eventsDelite, setEventsDelite] = useState([])

  function getJWTFromLocalStorage() {
    return localStorage.getItem("jwt");
  }

  useEffect(() => {
    const jwt = getJWTFromLocalStorage();
    if (jwt) {
      setIsAuthenticated(true);
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

  const handleModalLoginNext = (email) => {
    setModalLoginOpen(false);
    setModalRegisterOpen(true);
    setEmailUser(email);
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
            id: el.id,
            title: el.title,
            start: start,
            end: end,
            discription: el.description,
            photos: el.photos,
            location: el.location,
            participants: el.participants,
            owner: el.owner,
          };
        });
        let resolvedEvents = await Promise.all(formattedEvents);
        setEvents(resolvedEvents);
        setEventsDelite(resolvedEvents);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataAndHandleError();
  }, [showCreateEventModal, participantsUpdated]);

  const customEventPropGetter = (event, start, end) => {
    const currentDate = new Date();
    const currentDateFormatted = format(currentDate, "yyyy-MM-dd");
    const startFormatted = format(start, "yyyy-MM-dd");
    const endFormatted = format(end, "yyyy-MM-dd");

    if (startFormatted === currentDateFormatted && endFormatted === currentDateFormatted) {
      return {
        className: "event-today",
      };
    }
  };

  return (
    <div className={styles.appContainer}>
      {isAuthenticated ? (
        <CustomToolbarAuth
          date={currentDate}
          onPrevClick={handlePrevClick}
          onNextClick={handleNextClick}
          allUsers={allUsers}
          open={showCreateEventModal}
          onSave={handleSaveEvent}
          userList={allUsers}
          setAuthenticated={setIsAuthenticated}
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
        setAuthenticated={setIsAuthenticated}
      />
      <Context.Provider value={{ 
          setEvents: setEvents, 
          updateParticipants: participantsUpdated, 
          setUpdateParticipants: setParticipantsUpdated, 
          setEventsDelite: setEventsDelite,
          eventsDelite: eventsDelite 
          }}>
        <ModalEvent
          eventSelect={selectedEvent}
          open={modalEventOpen}
          onClose={handleModalEventClose}
          onNext={handleModalEventNext}
          setAuthenticated={setIsAuthenticated}
        />
      </Context.Provider>
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

export default MainCalendar;