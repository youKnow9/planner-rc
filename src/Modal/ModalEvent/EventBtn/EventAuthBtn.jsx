import React, { useState } from 'react';
import api from '../../../../shared/Api/init';
import ModalJoin from './ModalJoin/ModalJoin';
import EventOwnerBtns from './EventOwnerBtns/EventOwnerBtns';
import './EventAuthBtn.scss';

const EventAuthBtn = ({ event, open, onClose, onNext, onClick, setParticipantsUpdated, updatePrac }) => {
  const [modalJoinOpen, setModalJoinOpen] = useState(false);
  const [eventInfo, setEventInfo] = useState({
    title: event.title,
    location: event.location,
  });

  const handleJoinEvent = async () => {
    try {
      await api.post(`/events/${event.id}/join`, null, {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
      });
      setModalJoinOpen(true);
      updatePrac();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditEvent = () => {
    // Действия при нажатии на кнопку "Редактировать"
  };

  const handleDeleteEvent = async () => {
    try {
      await api.delete(`/events/${event.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
      });
      onClose()
    } catch (error) {
      console.error(error);
    }
  };

  const handleModalJoinClose = () => {
    setModalJoinOpen(false);
  };

  const currentUserEmail = localStorage.getItem("email");
  const isOwner = event.owner.email === currentUserEmail;

  return (
    <>
      {isOwner ? (
        <EventOwnerBtns event={event} onDelete={handleDeleteEvent} onEdit={handleEditEvent} onClose={onClose}/>
      ) : (
        <>
          <button className='next-bt bl-btn' onClick={handleJoinEvent}>Присоединиться к событию</button>
          <ModalJoin open={modalJoinOpen} onClose={handleModalJoinClose} eventInfo={eventInfo} />
        </>
      )}
    </>
  );
};

export default EventAuthBtn;