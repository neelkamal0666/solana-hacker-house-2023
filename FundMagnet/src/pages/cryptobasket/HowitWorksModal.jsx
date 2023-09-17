import React, { useState } from "react";
import Modal from "react-modal";


import styles from "./BasketModal.module.css";

function HowitWorksModal({ openModal, setOpenModal }) {


  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      padding: "0",
      borderRadius: "10px",
      transform: "translate(-50%, -50%)",
      overflow: "inherit",
    },
  };

  function closeModal() {
    setOpenModal(false);
  }

  return (
    <div>
      <Modal
        isOpen={openModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
        className={`${styles.popup} w-[600px] p-10 `}
      >
        <div className="w-full flex justify-end mr-4 pt-2">
          <button
            className="font-medium text-2xl flex items-center leading-10 mr-2 mt-2"
            onClick={closeModal}
          >
            X
          </button>
        </div>
        <div className="pb-10 px-10">
          <h3 className="text-lg font-semibold mb-4">
            Crypto Baskets is a theme-based group of different crypto tokens
            whose proportion within the basket, with respect to each other, is
            maintained by the crypto advisor.
          </h3>
          <ul className="list-disc my-3">
            <li>
              Subscribers’ assets are bought and kept in their own Defi wallet.
            </li>
            <li>
              When a basket’s proportion is altered by the creator, a
              notification is sent to the subscriber to rebalance its holding.
              Accepting the rebalancing or ignoring that is up to the
              subscriber.
            </li>
            <li>
              A creator can make their basket public if the creator KYCs
              themselves as financial advisor
            </li>
          </ul>
          <h4 className="text-lg font-semibold mt-6">
            This is one of its kind ways to take exposure to crypto assets with
            the help of experts while still keeping custody of your assets.
          </h4>
        </div>
      </Modal>
    </div>
  );
}

export default HowitWorksModal;
