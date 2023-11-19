import React, { createContext, useState } from 'react';

export const ModalContext = createContext();

const ModalContextProvider = ({ children }) => {
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [modalEventOpen, setModalEventOpen] = useState(false);
  const [modalLoginOpen, setModalLoginOpen] = useState(false);
  const [modalRegisterOpen, setModalRegisterOpen] = useState(false);

  const openCreateEventModal = () => {
    setShowCreateEventModal(true);
  };

  const closeCreateEventModal = () => {
    setShowCreateEventModal(false);
  };

  const openModalEvent = () => {
    setModalEventOpen(true);
  };

  const closeModalEvent = () => {
    setModalEventOpen(false);
  };

  const openModalLogin = () => {
    setModalLoginOpen(true);
  };

  const closeModalLogin = () => {
    setModalLoginOpen(false);
  };

  const openModalRegister = () => {
    setModalRegisterOpen(true);
  };

  const closeModalRegister = () => {
    setModalRegisterOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        showCreateEventModal,
        openCreateEventModal,
        closeCreateEventModal,
        modalEventOpen,
        openModalEvent,
        closeModalEvent,
        modalLoginOpen,
        openModalLogin,
        closeModalLogin,
        modalRegisterOpen,
        openModalRegister,
        closeModalRegister,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;