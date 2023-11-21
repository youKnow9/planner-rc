import React, { useState, useContext } from 'react';
import api from '../../../../shared/Api/init';
import ModalJoin from './ModalJoin/ModalJoin';
import EventOwnerBtns from './EventOwnerBtns/EventOwnerBtns';
import './EventAuthBtn.scss';
import { Context } from '../../../Context';

const EventAuthBtn = ({ event, open, onClose, onNext, onClick, setNewParticipants }) => {
  const [modalJoinOpen, setModalJoinOpen] = useState(false);
  const [eventInfo, setEventInfo] = useState({
    title: event.title,
    location: event.location,
  });
  const { participantsUpdated , setUpdateParticipants } = useContext(Context);
  
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
        <EventOwnerBtns event={event} onDelete={handleDeleteEvent} onClose={onClose} />
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