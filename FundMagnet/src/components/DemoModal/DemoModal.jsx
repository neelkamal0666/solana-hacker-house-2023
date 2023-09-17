import React from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
const DemoModal = ({ openDemoModal, setOpenDemoModal }) => {
  const isMobileDevice = window.innerWidth <= 768;
  const customStyles = {
    content: {
      top: "53%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      // marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#B009FF",
      width: isMobileDevice ? "90%" : "50%",
      borderRadius: "15px",
      zIndex: 9999,
    },
  };
  function closeModal() {
    setOpenDemoModal(false);
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // console.log(JSON.stringify(data));
    fetch(`${process.env.REACT_APP_NFTVERSE_DEV_API}/demo/request`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "x-app-token": process.env.REACT_APP_X_APP_TOKEN,
        "content-type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success(
            "Request Successful. We will reach out to you for scheduling a demo."
          );
          setOpenDemoModal(false);
        }
      })
      .catch((e) => {
        console.log(e);
        toast.error("Request failed. Please try again.");
      });
  };

  return (
    <Modal
      isOpen={openDemoModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div
        className={` bg-opacity-50 flex justify-center items-center text-white `}
      >
        <div className="">
          <div className="mb-3">
            <h1 className=" text-center font-semibold text-2xl text-white pt-5 md:pt-5">
              Want a Demo
            </h1>
            <p className=" text-center font-medium text-white">
              Fill out the form to schedule your demo now.
            </p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col md:flex-row flex-wrap justify-around my-5"
          >
            <div className="flex flex-col w-[100%] md:w-[40%]">
              <label
                htmlFor="name"
                className="text-sm font-medium  mb-1 text-white"
              >
                Name:
              </label>
              <input
                type="text"
                name="name"
                required
                {...register("name")}
                placeholder="Enter your name"
                className="border border-gray-400 py-2 px-3 rounded-lg mb-3 focus:outline-none focus:border-blue-500 bg-gradient-to-r from-purple-700 to-purple-900"
              />
            </div>
            {/* <div className="flex flex-col w-[40%]">
              <label
                htmlFor="orgName"
                className="text-sm font-medium text-white mb-1"
              >
                Organisation Name:
              </label>
              <input
                type="text"
                name="orgName"
                {...register("orgName")}
                placeholder="Enter your Organisation Name"
                className="border border-gray-400 py-2 px-3 rounded-lg mb-3 focus:outline-none focus:border-blue-500 bg-[#9348ce] "
              />
            </div> */}
            <div className="flex flex-col w-[100%] md:w-[40%]">
              <label
                htmlFor="email"
                className="text-sm font-medium text-white mb-1"
              >
                Email:
              </label>
              <input
                type="email"
                name="email"
                required
                {...register("email")}
                placeholder="Enter your Email"
                className="border border-gray-400 py-2 px-3 rounded-lg mb-3 focus:outline-none focus:border-blue-500  bg-gradient-to-r from-purple-700 to-purple-900"
              />
            </div>
            <div className="flex flex-col w-[100%] md:w-[90%]">
              <label
                htmlFor="mobile"
                className="text-sm font-medium text-white mb-1"
              >
                Phone Number:
              </label>
              <input
                type="tel"
                name="mobile"
                required
                {...register("mobile")}
                placeholder="Enter your Phone Number"
                className="border py-2 px-3 rounded-lg mb-3 focus:outline-none focus:border-blue-500 bg-gradient-to-r from-purple-700 to-purple-900"
              />
            </div>
            <div className="flex flex-col w-[100%] md:w-[90%] mx-auto">
              <label
                htmlFor="Message"
                className="text-sm font-medium text-white mb-1"
              >
                Message:
              </label>
              <textarea
                required
                name="Message"
                rows="4"
                {...register("message")}
                placeholder="Enter your Message"
                className="border border-gray-400 py-2 px-3 rounded-lg mb-3 focus:outline-none focus:border-blue-500 bg-gradient-to-r from-purple-700 to-purple-900"
              />
            </div>

            <button
              type="submit"
              className="bg-gradient-to-r from-purple-700 to-purple-900  border-white border-2 rounded-full px-12 py-2  text-white"
            >
              Request Demo
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default DemoModal;
