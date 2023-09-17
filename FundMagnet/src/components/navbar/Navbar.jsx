import React, { useCallback, useState, useEffect } from "react";
import {
  ExpandMore,
  LightMode,
  Menu,
  Person,
  RemoveRedEye,
  Wallet,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { persistor } from "../../context/store";
import logoWhite from "../../assets/logo-white.svg";
import logoBlack from "../../assets/logo-black.svg";
import { useDispatch } from "react-redux";
import { Popover } from "react-tiny-popover";

import "react-dropdown/style.css";
import { toast } from "react-toastify";
import NavbarDropdown from "./NavbarDropdown";
import AddAccountModal from "../AddAccountModal/AddAccountModal";

const Navbar = () => {
  const [isExpanded, setExpanded] = useState(false);
  const appCtx = useSelector((state) => state.app);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [contactUsVisible, setContactUsVisible] = useState(false);
  const [openAddAccountModal, setOpenAddAccountModal] = useState(false);
  const [updateProfileVisible, setUpdateProfileVisible] = useState(false);

  const handleLogoutClick = useCallback(() => {
    localStorage.removeItem("display");
    localStorage.removeItem("contact");
    localStorage.clear();
    persistor.purge().then(() => (window.location.href = "/"));
    // dispatch(appActions.logout())
  }, []);

  return (
    // loading ?<div className='w-screen text-black flex z-[100] justify-center items-center text-3xl font-bold bg-white h-screen fixed top-0'>
    //         Hi ,please wait for a while, as we are configuring your dashboard.
    // </div>
    // :

    <>
      <NavbarDropdown
        contactUsVisible={contactUsVisible}
        setContactUsVisible={setContactUsVisible}
        onLogoutClick={handleLogoutClick}
        visible={isDropdownVisible}
      />

      <div
        className={`${
          isExpanded ? "h-[250px]" : "h-[80px]"
        } fixed z-30 md:h-[90px] w-screen  bg-white  shadow-xl text-black  p-5 transition-all ease-out duration-300 overflow-y-hidden`}
      >
        <div className="flex flex-col md:flex-row justify-between w-[100%] mx-auto">
          <div className="flex justify-between gap-3 items-center ">
            <Link to="/" className="font-extrabold text-2xl no-underline">
              <img
                src="/images/fund-magnet.png"
                alt={"Fundmagnet"}
                className={"w-[150px] "}
              />
            </Link>

            <button
              className="visible md:invisible"
              onClick={() => setExpanded(!isExpanded)}
            >
              <Menu fontSize="large" className="" />
            </button>
          </div>
          {appCtx.isLoggedIn && (
            <div className="flex gap-16">
              <div
                className={`flex flex-col md:flex-row md:items-center gap-3 mt-5 md:mt-0 md:gap-5 transition-all ease-out duration-300 `}
              >
                <Link
                  onClick={(e) => {
                    if (!appCtx.wealthManager?.wmId) {
                      e.preventDefault();
                      return;
                    }
                    setOpenAddAccountModal(!openAddAccountModal);
                  }}
                  to="#"
                  className="no-underline text-black  rounded-lg text-left md:text-center my-auto md:p-2 hover:opacity-70 transition-all ease-out duration-300"
                  disabled={appCtx.wealthManager?.wmId}
                >
                  Add account
                </Link>

                <Link
                  onClick={() => setDropdownVisible(!isDropdownVisible)}
                  to="#"
                  className="no-underline border-sky-500 text-sky-500  rounded-lg text-left md:text-center my-auto md:p-2 hover:opacity-70 transition-all ease-out duration-300"
                >
                  <Person />
                  {/* {appCtx.userDetails.name.split(' ')[0]} */}
                </Link>
              </div>
            </div>
          )}
        </div>
        <AddAccountModal
          openDemoModal={openAddAccountModal}
          setOpenDemoModal={setOpenAddAccountModal}
        />
      </div>
    </>
  );
};

export default Navbar;
