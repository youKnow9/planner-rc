import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Carousel from "../../Slider/Carousel";
import './ModalEvent.scss';
import api from '../../../shared/Api/init';
import EventAuthBtn from './EventBtn/EventAuthBtn';
import EventNoAuthBtn from './EventBtn/EventNoAuthBtn';

const ModalEvent = ({ eventSelect, open, onClose, onNext, setAuthenticated, children }) => {
    const [participantsUpdated, setParticipantsUpdated] = useState(false);
    const [newParticipants, setNewParticipants] = useState([]);
    if (!open || !eventSelect) return null; 
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
    // let shownParticipants = participants.slice(0, 5);
    let additionalParticipants = Math.max(0, participants.length - 5);

    const updatePrac = async () => {
        setParticipantsUpdated(true);
        if (participantsUpdated === true) {
            try {
                const response = await api.get("events?populate=*");
                const data = response.data.data;
                const selectedEvent = data.find(el => el.id === eventSelect.id);
                const freshParticipants = selectedEvent.participants.filter(participant => !participants.includes(participant.id));
                setNewParticipants(freshParticipants);
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <div className='wrapper-slider modal-event'>
                <h3>{ eventSelect.title }</h3>
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
                        <p className='disc'>{ discription }</p>
                    </div>
                    </div>
                    <h3>Участники</h3>
                    {participantsUpdated ? (
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
                            {newParticipants.map(participant => (
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
                    ) : 
                    (
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
                    )}
                    </div>
                </div>
                <div className='navi'>
                    <Carousel event={ eventSelect } />
                </div>
                {!localStorage.getItem('jwt') ? (
                    <EventNoAuthBtn onNext={onNext}/>
                ) : (
                    <EventAuthBtn
                        open={setParticipantsUpdated} 
                        event={eventSelect} 
                        setParticipantsUpdated={setParticipantsUpdated}
                        updatePrac={updatePrac}
                        onClose={onClose}
                    />
                )}
            </div>
        </Modal>
    );
};

export default ModalEvent;