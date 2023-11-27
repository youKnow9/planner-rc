import React, { useState } from 'react';
import { motion } from "framer-motion";
import Modal from '@mui/material/Modal'
import LogOut from '../../../../shared/Img/LogOut.png';

const ModalLogOut = ({ open, onClose, eventInfo, handleLogout }) => {
if (!open) {
	return null;
}

return (
	<Modal open={open} onClose={onClose}>
		<div className="modal modal-join">
			<div className="wrapper-login wrapper-join">
			
			<div className='wrapper-png'><img src={LogOut} alt="LogOut" /></div>
					<h2 className='title-join del'>Вы уверены, что хотите выйти?</h2>
					<div className='wrapper-btn'>
						<motion.div
							className="box"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.9 }}
							transition={{ type: "spring", stiffness: 400, damping: 17 }}
						>
							<button className="next-bt del-bt" onClick={handleLogout}>Да</button>
						</motion.div>
						<motion.div
							className="box"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.9 }}
							transition={{ type: "spring", stiffness: 400, damping: 17 }}
						>
							<button className="next-bt del-bt " onClick={onClose}>Нет</button>
						</motion.div>
					</div>
					
			</div>
		</div>
	</Modal>
);
};



export default ModalLogOut