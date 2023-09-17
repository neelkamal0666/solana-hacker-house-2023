import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import React from "react";
import { Popover } from "react-tiny-popover";
import InfoModal from "./InfoModal";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";

const AuthorizedPageCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openInfoModal, setOpenInfoModal] = useState(false);
  const appCtx = useSelector((state) => state.app);

  useEffect(() => {
    if (location.pathname === "/") navigate("/home");
  });

  return (
    <div className={`${appCtx.isDarkMode ? "dark" : ""} w-screen`}>
      <div className="h-screen  text-gray-600 w-screen">
        <Navbar />
        <div className="flex flex-row w-screen">
          <Sidebar />
          <div className="bg-slate-100 overflow-y-scroll ml-[75px] md:ml-[0px]   w-screen h-screen pt-[110px] py-10 px-5">
            {/*{props.children}*/}
            <Outlet />
          </div>
        </div>
      </div>
      <Popover
        isOpen={openInfoModal}
        positions={["left"]} // if you'd like, you can limit the positions
        // padding={10} // adjust padding here!
        reposition={false} // prevents automatic readjustment of content position that keeps your popover content within its parent's bounds
        onClickOutside={() => setOpenInfoModal(false)} // handle click events outside of the popover/target here!
        content={(
          { position, nudgedLeft, nudgedTop } // you can also provide a render function that injects some useful stuff!
        ) => (
          <div className="ml-[-1px] absolute bottom-[29px] right-0 w-[20rem] shadow-lg bg-white rounded-3xl">
            <InfoModal />
          </div>
        )}
      >
        <div className="cursor-pointer overflow-hidden scroll-smooth fixed bottom-7 w-7 h-7 right-7 z-50">
          <img
            src="/images/Info.svg"
            alt="logo"
            className="h-full w-full bg-white rounded-full"
            onClick={() => {
              setOpenInfoModal(!openInfoModal);
            }}
          />
        </div>
      </Popover>
    </div>
  );
};

export default AuthorizedPageCard;
