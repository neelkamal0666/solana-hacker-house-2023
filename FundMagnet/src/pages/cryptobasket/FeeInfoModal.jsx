import React, { useState } from "react";
import { useEffect } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./BasketModal.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { usehandleBuyTaleCoin } from "../../hooks/handleBuyTaleCoin";
import { useCryptobasket } from "./useCryptobasket";
import SuccessModal from "./SuccessModal";
import { nativeToken } from "../../config";
function FeeInfoModal({
  openModal,
  setOpenModal,
  singleBasket,

  fees,
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
        <div className="w-[100%] flex justify-end mr-[20px] pt-[10px] ">
          <button
            className=" font-medium  text-2xl flex items-center leading-[10px] mr-[10px] mt-[10px]"
            onClick={closeModal}
          >
            X
          </button>
        </div>
        <div className="px-20 py-5">
          <h4 className="font-semibold mb-2">List of Fee's</h4>

          <div className="flex flex-row gap-2">
            <p className="font-semibold">Gas Fee: </p>
            <p>
              {fees?.gasFee} {nativeToken[appCtx?.blockchain]}
            </p>
          </div>
          <div className="flex flex-row gap-2">
            <p className="font-semibold"> Platform Fee: </p>
            <p>
              {fees?.platformFee} {nativeToken[appCtx?.blockchain]}
            </p>
          </div>
          <div className="flex flex-row gap-2">
            <p className="font-semibold"> Onramp Fee:</p>
            <p>
              {fees?.onrampFee} {nativeToken[appCtx?.blockchain]}
            </p>
          </div>
          <div className="flex flex-row gap-2">
            <p className="font-semibold"> Total Fee:</p>
            <p>
              {fees?.total} {singleBasket?.minAmountCurrency}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default FeeInfoModal;
