import React from 'react';

const EventNoAuthBtn = ({ onNext }) => {
    return (
        <div className='wrapper-auth'>
            <span onClick={onNext} className="login-link">Войдите</span>
            <span>, чтобы присоединиться к событию</span>
        </div>
    );
};

export default EventNoAuthBtn;