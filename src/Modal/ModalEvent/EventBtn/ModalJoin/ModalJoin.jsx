import React, { useEffect } from 'react';
import './ModalJoin.scss';
import Modal from '@mui/material/Modal';
import { motion } from "framer-motion";
import pngJoin from '../../../../../shared/Img/Join.png';

const ModalJoin = ({ open, onClose, eventInfo }) => {
  if (!open) {
    return null;
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal modal-join">
        <div className="wrapper-login wrapper-join">
        <div className='wrapper-png'><img src={pngJoin} alt="pngJoin" /></div>
          <h2 className='title-join'>Поздравляем!</h2>
          <div className='info-event'>
            <p className='info-bl'>Вы теперь участник события:</p>
            <p className='title-red'>{eventInfo.title}</p>
          </div>
          <motion.div
            className="box"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <button className="next-bt bt" onClick={onClose}>Отлично!</button>
          </motion.div>
        </div>
      </div>
    </Modal>
  );
};
export default ModalJoin;