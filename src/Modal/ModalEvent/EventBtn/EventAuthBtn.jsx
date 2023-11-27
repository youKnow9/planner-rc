import React, { useState, useContext } from 'react';
import api from '../../../../shared/Api/init';
import ModalJoin from './ModalJoin/ModalJoin';
import ModalDelete from './ModalDelete/ModalDelete';
// import EventOwnerBtns from './EventOwnerBtns/EventOwnerBtns';
import './EventAuthBtn.scss';
import { Context } from '../../../Context';
import { motion } from "framer-motion";
import { useSetEvents } from "../../../Context";

const EventAuthBtn = ({ event, open, onClose, onNext, onClick, setNewParticipants }) => {
  const [modalJoinOpen, setModalJoinOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [eventInfo, setEventInfo] = useState({
    title: event.title,
    location: event.location,
  });
  // const { setUpdateParticipants, setEventsDelite, setEvents } = useContext(Context);
  const [setEventsDelite, eventsDelite] = useSetEvents();

  const handleJoinEvent = async () => {
    try {
      await api.post(`/events/${event.id}/join`, null, {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
      });

      const response = await api.get('/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
      });
      const currentUserEmail = localStorage.getItem('email');
      const currentUser = response.data.find(user => user.email === currentUserEmail);
      currentUser['idEvent'] = event.id;
      setNewParticipants(currentUser);
      setModalJoinOpen(true);
      setUpdateParticipants(prev => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLeaveEvent = async () => {
    try {
      await api.post(`/events/${event.id}/leave`, null, {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
      });

      const response = await api.get('/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
      });
      const currentUserEmail = localStorage.getItem('email');
      const currentUser = null;
      // currentUser = null;
      setNewParticipants(currentUser);
      // setModalJoinOpen(true);
      setUpdateParticipants(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteEvent = async () => {
    try {
      await api.delete(`/events/${event.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
      });
      // setEventsDelite(event.id);
      onClose();
      // setEvents()
      setEventsDelite(event.id);
      setEventsDelite(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleModalJoinClose = () => {
    setModalJoinOpen(false);
  };

  const handleModalDeleteClose = () => {
    setModalDeleteOpen(false);
  };

  const handleModalDeleteOpen = () => {
    setModalDeleteOpen(true);
  };

  const currentUserEmail = localStorage.getItem("email");
  const isOwner = event.owner && event.owner.email === currentUserEmail;

  const isAlreadyJoined = () => {
    const currentUserEmail = localStorage.getItem("email");
    return event.participants && event.participants.some(participant => participant.email === currentUserEmail);
  };

  return (
    <>
      <motion.div
        className="box"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {isOwner ? (
          <>
            <button className='next-bt bl-btn' onClick={handleModalDeleteOpen}>Удалить</button>
            <ModalDelete open={modalDeleteOpen} onClose={handleModalDeleteClose} eventInfo={eventInfo} handleDeleteEvent={handleDeleteEvent}/>
          </>
        ) : (
          <>
          {isAlreadyJoined() ? (
              <>
                <div className='wrapper-auth'>
                  <span>Вы можете </span>
                  <span onClick={handleLeaveEvent} className="login-link"> отменить участие </span>
                  <span> в событии</span>
                </div>
              </>
            ) : (
              <>
                <button className='next-bt bl-btn' onClick={handleJoinEvent}>Присоединиться к событию</button>
                <ModalJoin open={modalJoinOpen} onClose={handleModalJoinClose} eventInfo={eventInfo} />
              </>
            ) }
          </>
        )}
      </motion.div>
    </>
  );
};

export default EventAuthBtn;