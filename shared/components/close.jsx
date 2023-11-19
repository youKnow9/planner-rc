import React from 'react';

const CloseButton = ({ onClose }) => {
    return (
        <div className="close">
            <img
                src="https://svgshare.com/i/yFX.svg"
                alt="close"
                onClick={onClose}
            />
        </div>
    );
};

export default CloseButton;