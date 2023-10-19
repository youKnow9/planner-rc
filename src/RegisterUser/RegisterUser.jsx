import React, { useState } from 'react';
import axios from 'axios';
import api from '../shared/Api/init';

const RegisterUser = ({handleCloseRegisterModal, setShowLoginModal}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false);

  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[.,:;?!*+%\-<>\@\[\]{}\/\\_{}$#])[a-zA-Z0-9.,:;?!*+%\-<>\@\[\]{}\/\\_{}$#]{8,32}$/;
    return passwordRegex.test(password);
  };
  const handleLogin = async () => {
    if (!isEmailValid(email)) {
      setError(true);
      return;
    }
    try {
      const response = await registerUser(email);
      handleCloseLoginModal(); // toggle off the login modal
      handleCloseEventModal(); // also toggle off the event modal before opening the register modal
      return response;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setShowRegisterModal(true); // then open the register modal
      } else {
        console.error(error);
      }
    }
  };
  const isFormValid = () => {
    return (
      username.length > 0 && 
      isPasswordValid(password) && 
      password === confirmPassword 
    );
  };

  const handleRegister = async () => {
    if (!isFormValid()) {
      setError(true);
      return;
    }
    setError(false);
    const userData = {
      username: username,
      email: props.email,
      password: password,
    };
    api.post(`/auth/local/register`, userData)
      .then((response) => {
        
        console.log('User registered successfully:', response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div className='close' onClick={() => {
        handleCloseRegisterModal()
        setShowLoginModal(true);
      }}>
        <img src="https://svgshare.com/i/yFX.svg" alt="close" />
      </div>
      <h2>Регистрация</h2>
      <label htmlFor="username">Имя пользователя:</label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">Пароль:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label htmlFor="confirmPassword">Повторите пароль:</label>
      <input
        type="password"
        id="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {error && <p style={{ color: 'red' }}>Пароли не совпадают или не удовлетворяют условиям</p>}
      <button onClick={handleLogin} disabled={!isFormValid()}>Зарегистрироваться</button>
    </div>
  );
};

export default RegisterUser;
