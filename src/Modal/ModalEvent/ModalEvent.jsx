import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Carousel from "../../Slider/Carousel";
import './ModalEvent.scss';
import api from '../../../shared/Api/init';
import EventAuthBtn from './EventBtn/EventAuthBtn';
import EventNoAuthBtn from './EventBtn/EventNoAuthBtn';
import { Context } from '../../Context';

const ModalEvent = ({ eventSelect, open, onClose, onNext, setAuthenticated, children }) => {

    const [newParticipants, setNewParticipants] = useState(null);

    if (!open || !eventSelect) return null;
    console.log(newParticipants)

    const formatEventDate = (eventSelect) => {
        const options = {
            day: 'numeric',
            month: 'long',
            weekday: 'long',
            hour: '2-digit',
            minute: '2-digit',
        };
        return new Date(eventSelect).toLocaleDateString('ru-RU', options);
    };
    const startEventFormatted = formatEventDate(eventSelect.start);
    const withoutPreposition = startEventFormatted.replace(' в', ',', '');
    const [dayOfWeek, date, time] = withoutPreposition.split(', ');
    const location = eventSelect.location;
    const discription = eventSelect.discription;
    const participants = eventSelect.participants;
    let additionalParticipants = Math.max(0, participants.length - 5);

    const clearNewPrac = () => {
        newParticipants(null)
    }

    return (
        <Modal open={open} onClose={onClose}>
            <div className='wrapper-slider modal-event'>
                <h3>{eventSelect.title}</h3>
                <div className='close-icon' onClick={onClose}>
                    <img src="https://svgshare.com/i/yFX.svg" alt="clouse" />
                </div>
                <div className='wrapper-data'>
                    <div className='data'>
                        <div className='data-event'>
                            <div className='data-location'>
                                <div>
                                    <p className='time'>{dayOfWeek}</p>
                                    <p className='time'>{date}</p>
                                    <p className='time'>{time}</p>
                                </div>
                                <p className='location'>{location}</p>
                            </div>
                            <div>
                                <p className='disc'>{discription}</p>
                            </div>
                        </div>
                        <h3>Участники</h3>
                            <div className='participants'>
                                {eventSelect.owner && (
                                    <div className='participant' key={eventSelect.owner.id}>
                                        <img src='https://i.ibb.co/3hhqxwp/Ellipse-1.png' alt="avatar" className='participant-avatar' />
                                        <div>
                                            <span className='participant-name'>{eventSelect.owner.username}</span>
                                            <p className='owner-name'>Организатор</p>
                                        </div>
                                    </div>
                                )}
                                {newParticipants !== null && newParticipants.idEvent === eventSelect.id? (
                                    <div className='participant' key={newParticipants.id}>
                                        <img src='https://i.ibb.co/3hhqxwp/Ellipse-1.png' alt="avatar" className='participant-avatar' />
                                        <span className='participant-name'>{newParticipants.username}</span>
                                    </div>
                                    
                                ):(null)}
                                {participants.map(participant => (
                                    <div className='participant' key={participant.id}>
                                        {eventSelect.owner && participant.id === eventSelect.owner.id ? null : (
                                            <>
                                                <img src='https://i.ibb.co/3hhqxwp/Ellipse-1.png' alt="avatar" className='participant-avatar' />
                                                <span className='participant-name'>{participant.username}</span>
                                            </>
                                        )}
                                    </div>
                                ))}
                                {additionalParticipants > 0 && (
                                    <div className="additional-participants">
                                        <div className='participant-avatar-stack'>
                                            <img src='https://i.ibb.co/3hhqxwp/Ellipse-1.png' alt="avatar" className='participant-avatar' />
                                            <img src='https://i.ibb.co/3hhqxwp/Ellipse-1.png' alt="avatar" className='participant-avatar' />
                                            <img src='https://i.ibb.co/3hhqxwp/Ellipse-1.png' alt="avatar" className='participant-avatar' />
                                        </div>
                                        <p className='participant-num'>Еще +{additionalParticipants}</p>
                                    </div>
                                )}
                            </div>
                        
                    </div>
                </div>
                <div className='navi'>
                    <Carousel event={eventSelect} />
                </div>
                    {!localStorage.getItem('jwt') ? (
                        <EventNoAuthBtn onNext={onNext} />
                    ) : (
                        <EventAuthBtn
                            event={eventSelect}
                            onClose={onClose}
                            setNewParticipants={setNewParticipants}
                        />
                    )}
            </div>
        </Modal>
    );
};

export default ModalEvent;