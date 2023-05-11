import React from "react";
import Modal from "react-modal";

type ModalContentProps = {
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalContent = ({ setModalIsOpen }: ModalContentProps) => {
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="bg-slate-500">
      <h2>Modal Title</h2>
      <p>Modal Content</p>
      <button onClick={closeModal} className="text-stone-100">close</button>
    </div>
  );
};

export default ModalContent;