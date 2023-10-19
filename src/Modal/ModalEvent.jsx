import React from 'react';
import Modal from '@mui/material/Modal';
import Carousel from "../Slider/Carousel";
import './ModalEvent.scss'


const ModalEvent = ({ event, open, onClose, onNext }) => {

    if (!open || !event) return null;

    const formatEventDate = (event) => {
        const options = {
          day: 'numeric',
          month: 'long',
          weekday: 'long',
          hour: '2-digit',
          minute: '2-digit',
        };
        return new Date(event).toLocaleDateString('ru-RU', options);
    };

    const startEventFormatted = formatEventDate(event.start);
    const withoutPreposition = startEventFormatted.replace(' в', ',', '');
    const [dayOfWeek, date, time] = withoutPreposition.split(', ');
    const location = event.location;
    const discription = event.discription;
    const participants = event.participants;
    let shownParticipants = participants.slice(0, 5);
    let additionalParticipants = Math.max(0, participants.length - 5);

    return (
        <Modal open={open} onClose={onClose}>
            <div className='wrapper-slider'>
                <h3>{ event.title }</h3>
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
                        <div className='participants'>
                            {shownParticipants.map(participant => (
                            <div className='participant' key={participant.id}>
                                <img src='https://i.ibb.co/3hhqxwp/Ellipse-1.png' alt="avatar" className='participant-avatar' />
                                <span className='participant-name'>{participant.username}</span>
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
                    <Carousel event={ event } />
                </div>
                <div className='wrapper-auth'>
                    <span onClick= {onNext} className="login-link">Войдите</span>
                    <span>, чтобы присоединиться к событию</span>
                </div>
            </div>
        </Modal>
    );
};

export default ModalEvent;