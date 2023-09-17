import {
  ContactPhone,
  KeyboardArrowRightRounded,
  LightMode,
  LogoutRounded,
  SettingsRounded,
} from "@mui/icons-material";
import { useCallback, useState } from "react";
import { appActions } from "../../context/app-slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import React from "react";

const NavbarDropdown = (props) => {
  const appCtx = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const changeMode = useCallback(() => {
    dispatch(appActions.toggleDarkMode());
  }, []);
  const openInNewTab = (url) => {
    window.open(url);
  };
  return (
    <div
      className={`${
        !props.visible && "hidden"
      } w-[90%] sm:w-[400px] h-fit rounded absolute right-5 top-[150px] sm:top-[75px]  bg-slate-50 shadow-lg z-50 flex flex-col`}
    >
      <button
        className={
          "text-left border-b p-4  border-gray-200 flex justify-between hover:bg-gray-200  transition-all ease-out duration-300"
        }
        onClick={() => props.setContactUsVisible(true)}
      >
        <div className="flex gap-5">
          <ContactPhone />
          <div>Contact US</div>
        </div>
      </button>
      <button
        onClick={props.onLogoutClick}
        className={
          "text-left border-b p-4  border-gray-200 flex justify-between hover:bg-gray-200  transition-all ease-out duration-300"
        }
      >
        <div className={"flex gap-5"}>
          <LogoutRounded />
          <div>Log Out</div>
        </div>
        <div>
          <KeyboardArrowRightRounded />
        </div>
      </button>
    </div>
  );
};

export default NavbarDropdown;
