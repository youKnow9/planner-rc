import React, { useState } from 'react';
import api from '../../../../shared/Api/init';
import ModalJoin from './ModalJoin/ModalJoin';

const EventAuthBtn = ({ event }) => {
    const [modalJoinOpen, setModalJoinOpen] = useState(false);
    const [eventInfo, setEventInfo] = useState({
        title: event.title,
        date: event.date,
        location: event.location,
    });

    const handleJoinEvent = async () => {
        try {
            console.log(localStorage.getItem('jwt'))
            await api.post(`/events/${event.id}/join`, null, {
                headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
            });
            setModalJoinOpen(true);
        } catch (error) {
            console.error(error);
        }
    };

    const handleModalJoinClose = () => {
        setModalJoinOpen(false);
    };

    return (
        <>
            <button onClick={handleJoinEvent}>Присоединиться к событию</button>
            <ModalJoin open={modalJoinOpen} onClose={handleModalJoinClose} eventInfo={eventInfo} />
        </>
    );
};

export default EventAuthBtn;