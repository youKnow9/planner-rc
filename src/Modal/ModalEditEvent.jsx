import React, { useState } from 'react';
import Modal from '@mui/material/Modal';

const ModalEditEvent = ({ event, open, onClose, onSave }) => {
  const [editedEvent, setEditedEvent] = useState(event);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent({
      ...editedEvent,
      [name]: value,
    });
  };

  const handleSave = () => {
    onSave(editedEvent); // Pass the edited event data to the parent component for saving
    onClose(); // Close the modal after saving changes
  };

  if (!open || !event) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <div>
        <h3>Edit Event: {event.title}</h3>
        <form>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={editedEvent.title}
            onChange={handleFieldChange}
          />
          {/* Add more fields for other event details like date, location, description, etc. */}
          <button onClick={handleSave}>Save Changes</button>
        </form>
      </div>
    </Modal>
  );
};

export default ModalEditEvent;