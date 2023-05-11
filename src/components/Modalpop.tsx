import React, { useState } from "react";
import Modal from "react-modal";
import ModalContent from "../components/ModalContent";

const Modalpop = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <ModalContent />
        <button onClick={closeModal}>Close Modal</button>
      </Modal>
    </div>
  );
};

export default Modalpop;
