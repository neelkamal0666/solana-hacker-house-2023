import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddAccountModal = ({ openDemoModal, setOpenDemoModal }) => {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pan, setPan] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [loader, setLoader] = useState(false);
  const [progress, setProgress] = useState(0);
  const [usserId, setUserId] = useState("");
  const appCtx = useSelector((state) => state.app);
  const navigate = useNavigate();

  const isMobileDevice = window.innerWidth <= 768;
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      zIndex: 9998, // Ensure the overlay is behind the modal content
    },
    content: {
      top: "56%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      // marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      width: isMobileDevice ? "90%" : "50%",
      borderRadius: "15px",
      zIndex: 9999,
    },
  };
  function closeModal() {
    setOpenDemoModal(false);
    setEmail("");
    setMobile("");
    setFirstName("");
    setLastName("");
    setPan("");
    setAadhar("");
    setProgress(0);
  }

  const setupUserWallet = (id) => {
    setProgress(3);
    let data = JSON.stringify({
      wallet: "TALEWALLET",
      userId: id,
      blockchain: "SOLANA",
    });

    let config = {
      method: "post",
      url: `${process.env.REACT_APP_URL_BLOCKCHAIN_SERVICE}/fundMagnet/client/blockchain/wallet/setup`,
      headers: {
        "X-Auth-Token": appCtx.authToken,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setProgress(4);
      })
      .catch((error) => {
        closeModal();
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProgress(1);
    setLoader(true);

    let data = JSON.stringify({
      email: email,
      mobile: mobile,
      wmId: appCtx.wealthManager.wmId,
      firstName: firstName,
      lastName: lastName,
      pan: pan,
      aadhar: aadhar,
    });

    let config = {
      method: "post",

      url: `${process.env.REACT_APP_NFTVERSE_DEV_API}/fundMagnet/client/add`,
      headers: {
        "X-Auth-Token": appCtx.authToken,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify());
        setProgress(2);
        setLoader(false);
        setupUserWallet(response.data?.userId);
        setUserId(response.data?.userId);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Request failed. Please try again.");
        closeModal();
      });
  };
  useEffect(() => {
    if (progress > 3) {
      const timer = setTimeout(() => {
        closeModal();
        navigate(`/wallet?address=${usserId}`);
        toast.success("New account added successfully");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [progress]);
  return (
    <Modal
      isOpen={openDemoModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {progress === 0 && (
        <div className={` bg-opacity-50 flex justify-center items-center  `}>
          <div className="">
            <div className="mb-3">
              <h1 className=" text-center font-semibold text-2xl  pt-5 md:pt-5">
                Add Account
              </h1>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col md:flex-row flex-wrap justify-around my-5"
            >
              <div className="flex flex-col w-[100%] md:w-[40%]">
                <label htmlFor="name" className="text-sm font-medium  mb-1 ">
                  First Name:
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  placeholder="Enter your first name"
                  className="border border-gray-400 py-2 px-3 rounded-lg mb-3 focus:outline-none focus:border-gray-500 bg-gray-200"
                />
              </div>
              <div className="flex flex-col w-[100%] md:w-[40%]">
                <label htmlFor="name" className="text-sm font-medium  mb-1 ">
                  Last Name:
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  placeholder="Enter your last name"
                  className="border border-gray-400 py-2 px-3 rounded-lg mb-3 focus:outline-none focus:border-gray-500 bg-gray-200"
                />
              </div>

              <div className="flex flex-col w-[100%] md:w-[40%]">
                <label htmlFor="email" className="text-sm font-medium  mb-1">
                  Email:
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your Email"
                  className="border border-gray-400 py-2 px-3 rounded-lg mb-3 focus:outline-none focus:border-gray-500  bg-gray-200"
                />
              </div>

              <div className="flex flex-col w-[100%] md:w-[40%]">
                <label htmlFor="phone" className="text-sm font-medium  mb-1 ">
                  Phone Number:
                </label>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                  placeholder="Enter your Phone Number"
                  className="border border-gray-400 py-2 px-3 rounded-lg mb-3 focus:outline-none focus:border-gray-500 bg-gray-200"
                />
              </div>

              <div className="flex flex-col w-[100%] md:w-[40%]">
                <label htmlFor="pan" className="text-sm font-medium  mb-1">
                  PAN card number:
                </label>
                <input
                  type="text"
                  value={pan}
                  onChange={(e) => setPan(e.target.value)}
                  required
                  placeholder="Enter your PAN card number"
                  className="border border-gray-400 py-2 px-3 rounded-lg mb-3 focus:outline-none focus:border-gray-500  bg-gray-200"
                />
              </div>

              <div className="flex flex-col w-[100%] md:w-[40%]">
                <label htmlFor="name" className="text-sm font-medium  mb-1 ">
                  Aadhaar Number:
                </label>
                <input
                  type="text"
                  value={aadhar}
                  onChange={(e) => setAadhar(e.target.value)}
                  required
                  placeholder="Enter your Aadhaar Number"
                  className="border border-gray-400 py-2 px-3 rounded-lg mb-3 focus:outline-none focus:border-gray-500 bg-gray-200"
                />
              </div>

              <button
                type="submit"
                className=" border-black border-2 rounded-full px-12 py-2 mt-5   "
              >
                Add account
                <span>
                  {loader && (
                    <CircularProgress
                      size={20}
                      className="ml-[5px] text-black"
                    />
                  )}
                </span>
              </button>
            </form>
          </div>
        </div>
      )}
      {progress > 0 && (
        <div className="h-[280px] py-10">
          {progress > 0 && (
            <div className="w-[70%] mx-auto mb-1 text-center bg-blue-200">
              <p className="text-lg font-semibold p-3">Adding Account</p>
            </div>
          )}
          {progress > 1 && (
            <div className="w-[70%] mx-auto mb-1 text-center bg-green-200">
              <p className="text-lg font-semibold  p-3">Account Added</p>
            </div>
          )}
          {progress > 2 && (
            <div className="w-[70%] mx-auto mb-1 text-center bg-yellow-200">
              <p className="text-lg font-semibold  p-3">Setting up Wallet</p>
            </div>
          )}
          {progress > 3 && (
            <div className="w-[70%] mx-auto mb-1 text-center bg-pink-200">
              <p className="text-lg font-semibold  p-3">Setup Complete</p>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
};

export default AddAccountModal;
