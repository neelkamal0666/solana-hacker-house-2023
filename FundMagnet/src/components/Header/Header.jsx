import React, { useState } from "react";
import {
  Bars3BottomRightIcon,
  XMarkIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { Link, animateScroll as scroll } from "react-scroll";
import DemoModal from "../DemoModal/DemoModal";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [openDemoModal, setOpenDemoModal] = useState(false);

    
  let Links = [
    { name: "About", section: "" },
    { name: "Speakers", section: "" },
    { name: "Topics", section: "" },
  ];
  let [open, setOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="w-full fixed top-0 left-0 z-50">
      <div className="md:flex items-center justify-between bg-[#FFFFFF] py-2 md:px-10 px-7">
        {/* logo section */}
        <a
          href="/"
          className="font-semibold text-2xl cursor-pointer flex items-center gap-1"
        >
          <img
            src="/images/fund-magnet.png"
            alt=""
            srcSet=""
            className="w-[150px]"
          />
        </a>
        {/* Menu icon */}
        <div
          onClick={() => setOpen(!open)}
          className="absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7"
        >
          {open ? <XMarkIcon /> : <Bars3BottomRightIcon />}
        </div>
        {/* link items */}
        <div
          className={`md:flex md:items-center md:pb-0 pb-12 pr-0 md:pr-20 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-12" : "top-[-490px]"
          }`}
        >
          <div className="md:ml-20 md:my-0 my-7 font-semibold">
            <button
              onClick={() => navigate("/login")}
              className="text-gray-800 hover:text-blue-400 text-sm duration-500 flex items-center gap-2 rounded-full px-5 py-2 border-2 border-black"
            >
              Login
            </button>
          </div>
          <div className="md:ml-20 md:my-0 my-7 font-semibold">
            <button
              onClick={() => setOpenDemoModal(true)}
              className="text-gray-800 hover:text-blue-400 text-sm duration-500 flex items-center gap-2 rounded-full px-5 py-2 border-2 border-black"
            >
              Join Waitlist
            </button>
          </div>
        </div>
        {/* button */}
      </div>
      <DemoModal
        openDemoModal={openDemoModal}
        setOpenDemoModal={setOpenDemoModal}
      />
    </div>
  );
};

export default Header;
