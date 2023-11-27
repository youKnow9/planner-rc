import React, { useState } from 'react';
import { motion } from "framer-motion";
import Confirmation from "../ModalDelete/ModalDelete"
import Modal from '@mui/material/Modal';


const EventOwnerBtns = ({ onClose, onDelete }) => {
	const handleDelete = () => {
		setIsConfirmationOpen(true);
	};

	const handleDeleteConfirmation = () => {
		onDelete();
		setIsConfirmationOpen(false);
	};
	
	const handleCancelConfirmation = () => {
		setIsConfirmationOpen(false);
	};
	return (
		<motion.div
			className="box"
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.9 }}
			transition={{ type: "spring", stiffness: 400, damping: 17 }}
		>
			<div className="event-owner-btns">
				<button className='next-bt bl-btn' onClick={handleDelete}>Удалить</button>
			</div>
			{isConfirmationOpen && (
				<Confirmation onClose={onClose} isOpen={isConfirmationOpen} onDelete={handleDeleteConfirmation} onCancel={handleCancelConfirmation} />
			)}
		</motion.div>
	);
};

export default EventOwnerBtns;