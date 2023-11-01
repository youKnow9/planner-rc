import React from 'react';

const ModalJoin = ({ open, onClose, eventInfo }) => {
  if (!open) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Поздравляем!</h2>
        <p>Вы теперь участник события:</p>
        <p>{eventInfo.title}</p>
        <p>{eventInfo.date}</p>
        <p>{eventInfo.location}</p>
        <button onClick={onClose}>отлично!</button>
      </div>
    </div>
  );
};

export default ModalJoin;