import {
  Code,
  CreateNewFolder,
  DarkModeRounded,
  DashboardRounded,
  Email,
  KeyboardArrowRightRounded,
} from "@mui/icons-material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Transition } from "react-transition-group";
import SidebarItem from "./SidebarItem";
import useAuthorizedHttp from "../../hooks/use-authorized-http";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import React from "react";

const expandButtonClasses = {
  entering: "rotate-180",
  entered: "rotate-180",
  exiting: "rotate-0",
  exited: "rotate-0",
};

const expandedSidebarClasses = {
  entering: "w-[100vw] md:w-[350px]",
  entered: "w-[100vw] md:w-[350px]",
  exiting: "w-[75px]",
  exited: "w-[75px]",
};

const Sidebar = () => {
  const [marketplace, setMarketplace] = useState(null);
  const location = useLocation();
  const makeRequest = useAuthorizedHttp();
  const [highLightButton, setHighLightButton] = useState("");
  const [currentPage, setCurrentPage] = useState("");
  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);

  const navigate = useNavigate();
  const [expandMarketplaceCustomization, setExpandMarketplaceCustomization] =
    useState(false);
  const [expandNfts, setExpandNfts] = useState(false);
  const [expandToken, setExpandToken] = useState(false);
  const [isExpanded, setExpanded] = useState(false);
  const appCtx = useSelector((state) => state.app);
  const nftLocations = [
    "/asset",
    "/mint",
    "/nft",
    "/collections",
    "/categories",
  ];

  return (
    <Transition in={isExpanded} timeout={500}>
      {(state) => (
        <div
          className={`${expandedSidebarClasses[state]} pt-[70px] z-20 md:relative fixed overflow-x-hidden h-[100vh]  bg-white text-black flex flex-col transition-all ease-out duration-500 shadow-sideBar`}
        >
          <div className="flex flex-row gap-5  p-5 items-center">
            <div className="justify-self-end">
              <Transition in={isExpanded} timeout={500}>
                {(state) => (
                  <button
                    className={`${expandButtonClasses[state]} transition-all ease-in-out duration-500`}
                    onClick={() => {
                      setExpanded(!isExpanded);
                    }}
                  >
                    <KeyboardArrowRightRounded fontSize="large" />
                  </button>
                )}
              </Transition>
            </div>
            <div className="text-xl font-light min-w-[200px]">
              {/* Your statistics */}
            </div>
          </div>

          <>
            <SidebarItem
              icon={
                <div className="flex flex-col items-center text-black">
                  <DashboardRounded fontSize="large" />
                  {!isExpanded && (
                    <div className="text-[10px] text-black">Home</div>
                  )}
                </div>
              }
              navigate="/home"
            >
              Home
            </SidebarItem>
            <SidebarItem
              icon={
                <div className="flex flex-col items-center">
                  <SupervisorAccountIcon fontSize="large" />
                  {!isExpanded && <div className="text-[10px]">Clients</div>}
                </div>
              }
              navigate={appCtx.wealthManager?.wmId ? "/clients" : "/"}
            >
              Clients
            </SidebarItem>
            <SidebarItem
              icon={
                <div className="flex flex-col items-center">
                  <ShoppingBasketIcon fontSize="large" />
                  {!isExpanded && <div className="text-[10px]">Basket</div>}
                </div>
              }
              navigate={appCtx.wealthManager?.wmId ? "/crypto-basket" : "/"}
            >
              Crypto Basket
            </SidebarItem>
          </>
        </div>
      )}
    </Transition>
  );
};

export default Sidebar;
