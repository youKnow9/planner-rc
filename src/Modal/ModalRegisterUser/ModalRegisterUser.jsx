import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import api from "../../../shared/Api/init";
import "./ModalRegisterUser.scss";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Input from "../InputEmail/InputEmail";

const ModalRegisterUser = ({ email, open, onClose, handleLogin, setAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const passwordRules = `В пароле используйте от 8 до 32 символов: строчные и прописные латинские буквы (A-z), цифры (0-9) и спец символы ( . , : ; ? ! * + % - < > @ [ ] { } / \ _ {} $ # )`;
  useEffect(() => {
    const doPasswordsMatch = password === confirmPassword;
    setPasswordsMatch(doPasswordsMatch);
  }, [password, confirmPassword]);

  const togglePasswordVisibility = () => {
    setShowPasswords(!showPasswords);
  };

  const isPasswordValid = (password) => {
    const passwordRegex =
      /r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$'/;
    return passwordRegex.test(password);
  };

  const isFormValid = () => {
    return (
      username.length > 0 &&
      password.length >= 6 &&
      password.length <= 32 &&
      isPasswordValid(password) &&
      passwordsMatch
    );
  };

  const handleRegister = async () => {
    // if (!isFormValid()) {
    //   setError(true);
    //   return;
    // }
    const userData = {
      username: username,
      email: email,
      password: password,
    };console.log(userData)
    api
      .post(`/auth/local/register`, userData)
      .then((response) => {
        onClose();
        setAuthenticated(true);
        console.log("User registered successfully:", response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="wrapper-login">
        <div className="close" onClick={onClose}>
          <img src="https://svgshare.com/i/yFX.svg" alt="close" />
        </div>
        <h2>Регистрация</h2>
        <div className="input-container">
          <div className="password-rules-wrapper">
            <span>
              <img src="https://svgshare.com/i/yWb.svg" alt="info" />
            </span>
            <p className="password-rules">{passwordRules}</p>
          </div>
          <Input
            type="text"
            id="username"
            placeholder="Ваше имя"
            value={username}
            onChange={(e) => {
              console.log(e), setUsername(e);
            }}
          />
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
          <Input
            type="password"
            id="confirmPassword"
            placeholder="Повторить пароль"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e)}
            IconComponent={showPasswords ? Visibility : VisibilityOff}
            onIconClick={togglePasswordVisibility}
            passwordVisibility={showPasswords}
            error={!passwordsMatch}
            errorMessage="Пароли не совпадают"
          />
          <button className="reg-bt" onClick={handleRegister} >
            Зарегистрироваться
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalRegisterUser;
// disabled={!isFormValid()}