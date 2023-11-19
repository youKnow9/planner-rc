import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './ModalJoin.scss';
import Modal from '@mui/material/Modal';

const ModalJoin = ({ open, onClose, eventInfo }) => {
  if (!open) {
    return null;
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal modal-join">
        <div className="wrapper-login wrapper-join">
          <h2 className='title-join'>Поздравляем!</h2>
          <div className='info-event'>
            <p className='info-bl'>Вы теперь участник события:</p>
            <p className='title-red'>{eventInfo.title}</p>
          </div>
          <button className="next-bt bt" onClick={onClose}>Отлично!</button>
        </div>
      </div>
    </Modal>
  );
};
export default ModalJoin;