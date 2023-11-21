import React from 'react';
import api from '../../../../../shared/Api/init';
// import './EventOwnerBtns.scss';

const EventOwnerBtns = ({ event, onDelete }) => {	
		// const handleDeleteEvent = async () => {
		// try {
		// 	await api.delete(`/events/${event.id}`, {
		// 	headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` }
		// 	});
		// 	onDelete();
		// 	onClose();
		// } catch (error) {
		// 	console.error(error);
		// }
		// };
	
		return (
		<div className="event-owner-btns">
			<button className='next-bt bl-btn' onClick={onDelete}>Удалить</button>
		</div>
		);
};

export default EventOwnerBtns;