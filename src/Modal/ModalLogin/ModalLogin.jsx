import { React, useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import api from "../../../shared/Api/init";
import ModalSuccess from "../ModalSuccess/ModalSuccess";
import ModalRegisterUser from "../ModalRegisterUser/ModalRegisterUser";
import "./ModalLogin.scss";
import Input from "../InputEmail/InputEmail";

const ModalLogin = ({ open, onClose, onNext, setAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const isEmailValid = (email) => {
    const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    return regex.test(email);
  };

  const checkExistsEmail = async (email) => {
    try {
      await api.get(`/taken-emails/${email}`);
      return true;
    } catch (error) {
      if (error.response ) {
        
        return false;
      } else {
        
        throw error;
      }
    }
  };

  const handleNextClick = async () => {
    if (isEmailValid(email)) {
      const isEmailTaken = await checkExistsEmail(email);
      if (isEmailTaken) {
        setShowSuccessModal(true);
      } else {
        setShowRegisterModal(true);
      }
    } else {
      setError(true);
    }
  };
  
  const handleLoginClose = () => {
    setShowSuccessModal(false); // Close ModalSuccess
    onClose(); // Close ModalLogin
  };
  
  return (
    <Modal open={open} onClose={onClose}>
      <div className="wrapper-login">
        <h3>Вход</h3>
        <div className="close">
          <img
            src="https://svgshare.com/i/yFX.svg"
            alt="close"
            onClick={onClose}
          />
        </div>
        <Input
          type="email"
          id="email"
          placeholder="E-mail"
          value={email}
          onChange={setEmail}
          error={error}
          errorMessage="Некорректный e-mail"
        />
        <button className="next-bt" onClick={handleNextClick}>
          Далее
        </button>
        <ModalSuccess
          isOpen={showSuccessModal}
          email={email}
          onClose={() => setShowSuccessModal(false)}
          onLoginClose={handleLoginClose}
          setAuthenticated={setAuthenticated}
        />
        <ModalRegisterUser
          open={showRegisterModal}
          email={email}
          onClose={() => {
            setShowRegisterModal(false);
            onClose(); // Close ModalLogin
          }}
          setAuthenticated={setAuthenticated}
        />
      </div>
    </Modal>
  );
};

export default ModalLogin;
