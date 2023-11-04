import React, { useEffect, useState } from "react";
import { Button, Input, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';
import './CreateEventModal.scss';
import Modal from '@mui/material/Modal';
import api from "../../../shared/Api/init";
import Select from 'react-select';
import { useDropzone } from 'react-dropzone';
import TextField from '@mui/material/TextField';

const CreateEventModal = ({ open, onClose, onSave, userList, setAuthenticated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(startDate.getTime() + 60 * 60 * 1000));
  const [startTime, setStartTime] = useState("");
  const [location, setLocation] = useState('');
  const [participants, setParticipants] = useState([]);
  const [files, setFiles] = useState([]);
  const [time, setTime] = useState('10:00');

  const clearState = () => {
    setTitle('');
    setDescription('');
    setStartDate(new Date());
    setEndDate(new Date());
    setStartTime("");
    setLocation('');
    setParticipants([]);
    setFiles([]);
  }
  
  const users = userList ? userList.map(user => ({ value: user.id, label: user.username })) : []
  
  function getJWTFromLocalStorage() {
    return localStorage.getItem('jwt');
  }
  
  const handleClose = () => {
    clearState();
    onClose();
    console.log(onClose())
  };

  const uploadFile = async (file, jwt) => {
    try {
      const formData = new FormData();
      formData.append('files', file);

      const response = await api.post('/upload', formData, {
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log("Response", response);
      return {
        url: URL.createObjectURL(file),
        serverResponse: response,
        name: file.name // add this line
      };
    } catch (error) {
      console.error("Ошибка при загрузке фотографии:", error);
    }
  }
  

  const uploadProps = {
    beforeUpload: async (file) => {
      const jwt = getJWTFromLocalStorage();
      if (!jwt) {
        console.error("JWT token not found in localStorage.");
        return;
      }
  
      const uploadedFile = await uploadFile(file, jwt);
      setFiles(oldFiles => [...oldFiles, uploadedFile]);
      
      return false;
    },
    multiple: true,
  };

  const handleRemove = (index) => {
    const newArr = [...files];
    newArr.splice(index, 1);
    setFiles(newArr);
  };

  const handleSave = async () => {
    const jwt = getJWTFromLocalStorage();
  
    if (!jwt) {
      console.error("JWT token not found in localStorage.");
      return;
    }

    const preparedDateStart = new Date(startDate);
    preparedDateStart.setHours(parseInt(time.split(':')[0]), parseInt(time.split(':')[1]));
    
    try {
      const photos = files.map(file => ({id: file.serverResponse?.data?.[0]?.id || null}));
      const event = {
        title,
        description,
        dateStart: preparedDateStart.toISOString(),
        location,
        participants: participants.map(participant => participant.value),
        photos
      };
      
      await api.post('/events', event, {
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json'
        }
      });
      setAuthenticated();
      clearState();
      onClose();
    } catch (error) {
      console.error("Ошибка при сохранении события:", error);
    }
  };

  useEffect(() => {
    setEndDate(new Date(startDate.getTime() + 60 * 60 * 1000));
  }, [startDate]);

  const isSaveDisabled = !title || !description || !location;

  return (
    <Modal open={open} onClose={handleClose}>
      <div className="modal-content">
        <div className='close-icon' onClick={onClose}>
          <img src="https://svgshare.com/i/yFX.svg" alt="clouse" />
        </div>
        <h3>Create Event</h3>
        <div className="create-wrapper">
          <div className="info-wrapper">
            <Input
              autoFocus
              placeholder="Название *"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <Input
              placeholder="Описание *"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            <Select
              isMulti
              placeholder="Участники"
              value={participants}
              onChange={(selected) => {setParticipants(selected); console.log(selected);}}
              options={users}
            />
            <Upload.Dragger {...uploadProps}>
              <p className="ant-upload-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Выберите файлы или перетащите их сюда</p>
            </Upload.Dragger>
          </div>
          <div className="time-wrapper">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                locale={ru}
              />
              <TextField
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                InputLabelProps={{
                  shrink: false,
                }}
                inputProps={{
                  step: 300, // 5 min
                  readOnly: true // add this line
                }}
              />
                <Input
                  placeholder="Место проведения *"
                  onChange={(e) => setLocation(e.target.value)}
                  value={location}
                />
              </div>
          </div>
          <Button className="save-bt" type="primary" onClick={handleSave} disabled={isSaveDisabled}>Сохранить</Button>
      </div>
    </Modal>
  );
};

export default CreateEventModal;