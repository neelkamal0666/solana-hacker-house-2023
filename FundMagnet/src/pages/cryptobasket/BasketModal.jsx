import React, { useState } from "react";
import { useEffect } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./BasketModal.module.css";
import { toast } from "react-toastify";
import { usehandleBuyTaleCoin } from "../../hooks/handleBuyTaleCoin";

function BasketModal({
  openModal,
  setOpenModal,
  closeClicked,
  setCloseClicked,
  singleBasket,
  tokenPercentArray,
  tokenArray,
  successcloseClicked,
  setSuccessCloseClicked,
  openSuccessModal,
  setopenSuccessModal,
  transactionSuccess,
  setTransactionSuccess,
  fees,
  setOpenContinueInWebModal,
}) {
  const [investmentAmount, setInvestmentAmount] = useState(null);
  const [totalInvestment, setTotalInvestment] = useState(null);
  const appCtx = useSelector((state) => state.app);

  const [editable, setEditable] = useState(false);
  const { handleBuyNativeToken } = usehandleBuyTaleCoin(appCtx);

  useEffect(() => {
    setInvestmentAmount(singleBasket?.minAmount);
  }, [singleBasket?.minAmount]);

  useEffect(() => {
    setTotalInvestment(investmentAmount + fees?.total);
  }, [investmentAmount, singleBasket?.minAmount, appCtx?.isLoggedIn]);

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

  const handleOrderPlaced = () => {
    let fiatAmount = parseInt(totalInvestment);
    if (fiatAmount < singleBasket?.minAmount) {
      toast.error(
        "Investment Amount should be greater or equal to minimum amount"
      );
      return;
    }

    handleBuyNativeToken(
      fiatAmount,
      singleBasket?.basketId,
      singleBasket?.minAmountCurrency,
      successcloseClicked,
      setSuccessCloseClicked,
      openSuccessModal,
      setopenSuccessModal,
      transactionSuccess,
      setTransactionSuccess,
      singleBasket?.blockchain
    );
  };

  console.log("appCtx", appCtx);

  const handlePlaceOrder = () => {
    if (appCtx.isLoggedIn) {
      handleOrderPlaced();
      closeModal();
    } else {
      setOpenContinueInWebModal(true);
      closeModal();
    }
  };

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
        <div className="m-10">
          {/* {!confirmClicked && !orderPlaced && (
            <div className="">
              <h4 className="font-semibold">Confirm invest more amount</h4>
              <p className="my-3">This amount will be invested right away.</p>
              <div className="flex gap-10">
                <div className="">
                  <p>Min. Investment amount </p>
                  <div className="flex gap-2 justify-center items-center">
                    <img src="/images/ph_currency-inr.svg" alt="" />
                    <h4>1,000</h4>
                  </div>
                </div>
                <div className="">
                  <p>85% users invest Min. </p>
                  <div className="flex gap-2 justify-center items-center">
                    <img src="/images/ph_currency-inr.svg" alt="" />
                    <h4 className="">3,000</h4>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-5 ">
                <button
                  onClick={() => {
                    setConfirmClicked(true);
                  }}
                  className="bg-gradient-to-r from-purple-700 to-purple-900 rounded-full  text-white px-20  py-2 md:py-2 "
                >
                  Confirm Invest
                </button>
              </div>
            </div>
          )} */}
          {/* {JSON.stringify(tokenPercentArray)} */}

          {
            <div>
              <div className="flex gap-3 items-center">
                <h4 className="font-semibold">Investment Amount :</h4>{" "}
                <div className="flex gap-2 justify-center items-center">
                  <img src="/images/ph_currency-inr.svg" alt="" />
                  {editable ? (
                    <input
                      type="number"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(e.target.value)}
                    />
                  ) : (
                    <h4 className="" onClick={() => setEditable(true)}>
                      {singleBasket?.minAmount}
                    </h4>
                  )}
                  <img
                    src="/images/pen.svg"
                    alt=""
                    onClick={() => setEditable(true)}
                  />
                </div>
              </div>
              <p className="mt-3 mb-5">
                Adjusted to maintain stock/ETFs in the suggested proportion.
              </p>

              <div className="">
                <h4 className="font-semibold">Review Order</h4>{" "}
                <table>
                  <thead>
                    <tr className="">
                      <th className=" py-2 mr-3">Constituents</th>
                      <th className=" py-2">Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tokenArray?.map((token, index) => (
                      <tr className="bg-gray-100" key={index}>
                        <td className="py-2">{token}</td>
                        <td className="py-2">{tokenPercentArray[index]}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex gap-3 items-center">
                  <h4 className="font-semibold">Total Payable Amount :</h4>
                  <div className="flex gap-2 justify-center items-center">
                    <img src="/images/ph_currency-inr.svg" alt="" />
                    <h4 className="">{totalInvestment}</h4>
                  </div>
                </div>
                <div className="flex justify-center mt-5 ">
                  <button
                    onClick={() => {
                      handlePlaceOrder();
                    }}
                    className="bg-gradient-to-r from-purple-700 to-purple-900 rounded-full text-white px-20 py-2 md:py-2"
                  >
                    Place Orders
                  </button>
                </div>
              </div>
            </div>
          }
          {/* { (
            <div>
              <div className="flex flex-col gap-3 justify-center items-center">
                <img src="/images/ok.svg" alt="" />
                <h2>Order placed!</h2>
              </div>
              <div className="my-10 w-[500px] mx-auto">
                <p>
                  Hooray! Your orders have been successfully placed. Stay tuned
                  for updates on the status of your order when the markets open
                  next. We'll keep you informed every step of the way.
                </p>
              </div>
              <div className="flex gap-5">
                <div className="flex  mt-5 ">
                  <button
                    // onClick={() => {
                    //   setOrderPlaced(true);
                    // }}
                    className="bg-gradient-to-r from-purple-700 to-purple-900 rounded-full  text-white px-20  py-2 md:py-2 "
                  >
                    View Investments
                  </button>
                </div>
                <div className="flex  mt-5 ">
                  <button
                    // onClick={() => {
                    //   setOrderPlaced(true);
                    // }}
                    className="bg-gradient-to-r from-purple-700 to-purple-900 rounded-full  text-white px-20  py-2 md:py-2 "
                  >
                    See Orders
                  </button>
                </div>
              </div>
            </div>
          )} */}
        </div>
      </Modal>
    </div>
  );
}

export default BasketModal;
