import React, { useState } from "react";
import { useEffect } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./BasketModal.module.css";
import axios from "axios";
import { toast } from "react-toastify";
function SuccessModal({
  openModal,
  setOpenModal,

  closeClicked,
  setCloseClicked,
  tokenArray,
  tokenPercentArray,
  transactionSuccess,
  setTransactionSuccess,
}) {
  const appCtx = useSelector((state) => state.app);

  const customStyles = {
    content: {
      top: "53%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      padding: "0",
      borderRadius: "10px",
      transform: "translate(-50%, -50%)",
      overflow: "inherit",
      // width: width > 1200 ? "600px" : "370px",
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
        className={`${styles.popup}  `}
      >
        <div className="px-[40px] py-[50px]">
          {transactionSuccess ? (
            <>
              <h3 className="">
                token purchase successful. Distribution is in progress.
              </h3>
              <div>
                {tokenArray?.map((token, index) => (
                  <div className="flex flex-row gap-4 my-3" key={index}>
                    <div className="w-[100px] ">
                      <h5 className="">{token}</h5>
                    </div>
                    <div className="w-[200px]">
                      <h5 className="">{tokenPercentArray[index]}%</h5>
                    </div>
                  </div>
                ))}
              </div>
              <p>
                Note: Distribution will be completed soon. You can close this
                popup now.
              </p>
            </>
          ) : (
            <>
              <h3 className="">
                Basket Subscription failed. Wait for sometime.
              </h3>
            </>
          )}

          <div className="flex justify-center ">
            <button
              onClick={closeModal}
              className="bg-gradient-to-r from-purple-700 to-purple-900 rounded-full  text-white px-20  py-2 md:py-2 mt-5 "
              type="submit"
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default SuccessModal;
