import { React, useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import api from '../shared/Api/init';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Input from './InputEmail/InputEmail';

const ModalSuccess = ({ isOpen, onClose, email, onLoginClose, setAuthenticated }) => {
    // const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPasswords, setShowPasswords] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    // const [error, setError] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    useEffect(() => {
      const doPasswordsMatch = password === confirmPassword;
      setPasswordsMatch(doPasswordsMatch);
    }, [password, confirmPassword]);
    
    const togglePasswordVisibility = () => {
      setShowPasswords(!showPasswords);
    };

    const handleLogin = async (e) => {
      try {
        const responseLogin = await api.post('/auth/local', {
          identifier: email,
          password,
        });
  
        if (responseLogin.status === 200) {
          const jwt = responseLogin.data.jwt;
          localStorage.setItem('jwt', jwt);
          // Вызовите функцию обновления состояния входа из App
          setAuthenticated(true);
          // Закройте модальное окно и другие действия
          onClose(); // Закрыть ModalSuccess
          onLoginClose(); // Закрыть ModalLogin
        }
      } catch (error) {
        console.error(error);
      }
    };


    return (
        <Modal open={isOpen} onClose={onClose}>
          <div className='wrapper-login'>
            <h3>Вход</h3>
            <Input 
              type="password"
              id="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e)}
              IconComponent={showPasswords ? Visibility : VisibilityOff}
              onIconClick={togglePasswordVisibility}
              passwordVisibility={showPasswords}
            />
<button className='next-bt' onClick={() => { 
  handleLogin(); 
  onClose(); // Закрыть ModalSuccess
  onLoginClose(); // Закрыть ModalLogin
}}>Войти</button>
          </div>
        </Modal>
    );
};

export default ModalSuccess;