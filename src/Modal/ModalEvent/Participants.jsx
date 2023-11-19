// import React, { useState, useEffect } from 'react';
// import api from "../../../shared/Api/init";

// const Participants = ({ eventSelect, isAuthenticated }) => {
// 	const [participants, setParticipants] = useState([]);
// 	const [newParticipants, setNewParticipants] = useState([]);
// 	if (!eventSelect || !eventSelect.participants) return null;

// 	console.log(eventSelect)
// 	useEffect(() => {
// 		const getParticipants = async () => {
// 		try {
// 			const response = await api.get(`/events/${eventSelect.id}/participants`);
// 			setParticipants(response.data);
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	};
// 	getParticipants();
// 	}, [eventSelect.id]);

// 	useEffect(() => {
// 		const getNewParticipants = async () => {
// 		try {
// 			const response = await api.get("/users");
// 			const allUsers = response.data;
// 			const newParticipants = allUsers.filter(user => !participants.some(participant => participant.id === user.id));
// 			setNewParticipants(newParticipants);
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	};

// 		// if (isAuthenticated) {
// 		// 	getNewParticipants();
// 		// }
// 	}, [participants]);

// 	const handleAuthenticated = () => {
// 		setParticipants(prevParticipants => [...prevParticipants, { id: 1, username: 'Current User' }]);
// 	};

// 	return (
// 	<>
// 	<h3>Участники</h3>
// 	<div className='participants'>
// 		{eventSelect?.owner && (
// 		<div className='participant' key={eventSelect.owner.id}>
// 		<img src='https://i.ibb.co/3hhqxwp/Ellipse-1.png' alt="avatar" className='participant-avatar' />
// 		<div>
// 		<span className='participant-name'>{eventSelect.owner.username}</span>
// 		<p className='owner-name'>Организатор</p>
// 		</div>
// 		</div>
// 		)}
// 		{participants.map(participant => (
// 		<div className='participant' key={participant.id}>
// 		{eventSelect?.owner && participant.id === eventSelect.owner.id ? null : (
// 		<>
// 			<img src='https://i.ibb.co/3hhqxwp/Ellipse-1.png' alt="avatar" className='participant-avatar' />
// 			<span className='participant-name'>{participant.username}</span>
// 		</>
// 		)}
// 		</div>
// 		))}
// 		{isAuthenticated && newParticipants.length > 0 && (
// 		<div className='participant' onClick={handleAuthenticated}>
// 		<img src='https://i.ibb.co/3hhqxwp/Ellipse-1.png' alt="avatar" className='participant-avatar' />
// 		<span className='participant-name'>Присоединиться</span>
// 		</div>
// 		)}
// 	</div>
// 	</>
// 	);
// };

// export default Participants;