import React, { useState } from "react";
import { Button, Input, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';
import './CreateEventModal.scss';
import Modal from '@mui/material/Modal';
import InputMask from "react-input-mask";
import api from "../../../shared/Api/init";
import Select from 'react-select';

const CreateEventModal = ({ open, onClose, onSave, userList, setAuthenticated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [location, setLocation] = useState('');
  const [participants, setParticipants] = useState([]);
  const [files, setFiles] = useState([]);

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

  const isValid = 
  title.trim() !== "" &&
  description.trim() !== "" &&
  startDate !== null &&
  endDate !== null &&
  startTime.trim() !== "" &&
  location.trim() !== "";
  
  const users = userList ? userList.map(user => ({ value: user.id, label: user.username })) : []
  
  function getJWTFromLocalStorage() {
    return localStorage.getItem('jwt');
  }
  
  const handleClose = () => {
    clearState();
    onClose();
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
      setFiles(oldFiles => [...oldFiles, {
        url: URL.createObjectURL(file),
        serverResponse: response
      }]);
  
      return response;
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
  
      await uploadFile(file, jwt);
      
      return false;
    },
    multiple: true,
    customRequest: () => {}, 
    fileList: files,
    onRemove: (file) => {
      const index = files.indexOf(file);
      if (index >= 0) {
        setFiles(oldFiles => oldFiles.slice(0, index).concat(oldFiles.slice(index + 1)));
      }
    }
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
    preparedDateStart.setHours(parseInt(startTime.split(':')[0]), parseInt(startTime.split(':')[1]));
    
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
              <div className="dataPicker-wrapper">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                locale={ru}
              />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                locale={ru}
              />
              </div>
              <InputMask 
                mask="99:99" 
                maskChar={null} 
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              >
                {(inputProps) => (
                  <input
                    {...inputProps}
                    type="text"
                    placeholder="Время *"
                  />
                )}
            </InputMask>
              <Input
                placeholder="Место проведения *"
                onChange={(e) => setLocation(e.target.value)}
                value={location}
              />
               <div className="preview-images">
                {
                  files.map((file, index) => (
                    <div key={index}>
                      <img className="preview" src={file} alt="preview" />
                      <button className="del-img" onClick={() => handleRemove(index)}><img src="https://svgshare.com/i/yFX.svg" alt="close" /></button>
                    </div>
                  ))
                }
              </div>
            </div>
        </div>
        <Button className="save-bt" type="primary" onClick={handleSave} disabled={!isValid}>Сохранить</Button>
      </div>
    </Modal>
  );
};

export default CreateEventModal;