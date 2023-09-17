import React, { useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Close } from "@mui/icons-material";

const AccessModal = ({ openModal, setOpenModal }) => {
  const isMobileDevice = window.innerWidth <= 768;
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      zIndex: 9998, // Ensure the overlay is behind the modal content
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      borderRadius: "15px",
      zIndex: 9999,
    },
  };

  function closeModal() {
    setOpenModal(false);
  }

  return (
    <Modal
      isOpen={openModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="flex justify-end">
        <button className="" onClick={closeModal}>
          <Close />
        </button>
      </div>
      <div className="bg-opacity-50 flex justify-center items-center">
        <div className="">
          <div className="px-10 pb-8">
            <h1 className="text-center font-semibold text-2xl pt-5 md:pt-5">
              You don't have access to this platform.
            </h1>
            <p>Drop an email to info@onnftverse.com</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AccessModal;
