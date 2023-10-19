import React, {useState} from 'react';
import IconButton from '@mui/material/IconButton';
import './InputEmail.scss';

export const Input = ({ id, type, setEmail, value, onChange, error, errorMessage, passwordVisibility, placeholder, IconComponent, onIconClick }) => {
  const [localType, setLocalType] = useState(type);

  const handleClearInput = (e) => {
      const parent = e.target.parentNode
      parent.querySelector('input').value=''
      onChange('');
  };
  
  const handleClick = () => {
    if (type === 'password') {
      setLocalType(localType === 'password' ? 'text' : 'password');
    }
    if (onIconClick) {
      onIconClick();
    }
  }

  return (
    <div>
      <div className={`input-container ${error ? 'error' : ''}`}>
        <div className='container'>
          <span id={`${id}`} htmlFor={id}>{placeholder}</span>
          <input
            id={id}
            type={passwordVisibility !== undefined ? (passwordVisibility ? 'text' : 'password') : localType}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className='custom-input'
          />
          { IconComponent  ?
            <IconButton onClick={handleClick} className='eye-icon-wrapper'>
              <IconComponent className='eye-icon'/>
            </IconButton>
            :
            id==='email' &&
            <img className='icon-close' 
              src="https://svgshare.com/i/yFX.svg" 
              alt="close" 
              onClick={handleClearInput} 
            />
          }
        </div>
        <div className='error-message-container'> 
          {error && <span className="error-message">{errorMessage}</span>}
        </div>
      </div>
      <>
      </>
    </div>
  );
};

export default Input;