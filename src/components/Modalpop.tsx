import React, { useState } from "react";
import Modal from "react-modal";
import ModalContent from "../components/ModalContent";

Modal.setAppElement("#__next");

const Modalpop = ({ task, refetch }: any) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
        onClick={openModal}
      >
        Edit
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[92%] md:w-3/5"
        overlayClassName="fixed inset-0 bg-gray-700 bg-opacity-50"
      >
        <ModalContent
          setModalIsOpen={setModalIsOpen}
          task={task}
          refetch={refetch}
          closeModal={closeModal}
        />
      </Modal>
    </div>
  );
};

export default Modalpop;
