import React from "react";
import Footer from "../components/Footer/Footer";
import { AccountAddressBar } from "../components/ui/AccountAddressBar";

const Wallet = () => {
  return (
    <div className="text-black">
      <div className="flex justify-center  ">
        <AccountAddressBar address={"kdjfksdjfdksjfsdlkjf"} />
      </div>
      <div className="flex justify-center items-center gap-5 w-[80%] md:w-[30%] min-h-[70px]  mx-auto mt-5 mb-10 ">
        <div className="min-w-[60px]">
          <img src="images/sol.svg" alt="token logo" className="w-[45px] " />
        </div>
        <div>
          <h4 className="flex justify-start">Balance: 50 sol</h4>
          <h5 className="flex justify-start">Value: 100$</h5>
        </div>
      </div>

      <div className=" w-[100%] bg-white rounded-tl-[40px] md:rounded-tl-[80px] rounded-tr-[40px] md:rounded-tr-[80px]">
        <div className="flex gap-5 justify-center my-5 md:my-10 pt-10">
          <button>
            <img
              src="/images/buyicon.svg"
              alt="Button Image"
              className="w-15"
            />
            <h5>Buy</h5>
          </button>
          <button
          // onClick={() => {
          //   // showTaleData();
          //   allCoin &&
          //     allCoinPrice &&
          //     usersToken &&
          //     setOpenSendAlgosModal(true);
          // }}
          >
            <img
              src="/images/sendicon.svg"
              alt="Button Image"
              className="w-15 "
            />
            <h5>Send</h5>
          </button>
          <button
            onClick={() => {
              const url = "https://onramp.money/main/sell/?appId=1";
              window.open(url, "_blank");
            }}
          >
            <img
              src="/images/sellicon.svg"
              alt="Button Image"
              className="w-15"
            />
            <h5>Sell</h5>
          </button>

          <button
          // onClick={() => {
          //   setopenSwapModal(true);
          // }}
          >
            <img src="/images/swap.svg" alt="Button Image" className="w-15" />
            <h5>Swap</h5>
          </button>
        </div>

        <div className="pb-20">
          <h1 className="text-center">Tokens</h1>
          <div
            className="flex justify-start items-center w-[90%] mx-auto border border-gray-200 bg-gray-50 px-[30px] py-[10px] rounded-full rounded-l-full rounded-r-full  cursor-pointer mt-[20px]"
            style={{
              background: "linear-gradient(180deg, #F1ECF5 0%, #F2EEF5 100%)",
            }}
          >
            <div className="w-[100%] flex justify-between ">
              <div className="w-[100%] flex justify-start items-center">
                <div className="pr-[10px] md:pr-[20px]">
                  <img
                    src="images/sol.svg"
                    className="w-[30px] md:w-[40px]"
                    alt="tail_coin"
                  />
                </div>
                <div
                  className="flex flex-col justify-start 
                    "
                >
                  <div className="font-medium text-[18px] flex justify-start">
                    sol
                  </div>
                  <div className="flex justify-start font-medium	text-bold">
                    {"$0.0000"}
                    (0.0000)
                  </div>
                </div>
              </div>
              {/* right side  */}
              <div className="flex w-[170px] justify-between items-center  gap-5">
                <div className="flex flex-col justify-start w-[70%]">
                  <h5 className="font-medium text-left">$100</h5>
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex justify-start items-center w-[90%] mx-auto border border-gray-200 bg-gray-50 px-[30px] py-[10px] rounded-full rounded-l-full rounded-r-full  cursor-pointer mt-[20px]"
            style={{
              background: "linear-gradient(180deg, #F1ECF5 0%, #F2EEF5 100%)",
            }}
          >
            <div className="w-[100%] flex justify-between ">
              <div className="w-[100%] flex justify-start items-center">
                <div className="pr-[10px] md:pr-[20px]">
                  <img
                    src="images/sol.svg"
                    className="w-[30px] md:w-[40px]"
                    alt="tail_coin"
                  />
                </div>
                <div
                  className="flex flex-col justify-start 
                    "
                >
                  <div className="font-medium text-[18px] flex justify-start">
                    sol
                  </div>
                  <div className="flex justify-start font-medium	text-bold">
                    {"$0.0000"}
                    (0.0000)
                  </div>
                </div>
              </div>
              {/* right side  */}
              <div className="flex w-[170px] justify-between items-center  gap-5">
                <div className="flex flex-col justify-start w-[70%]">
                  <h5 className="font-medium text-left">$100</h5>
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex justify-start items-center w-[90%] mx-auto border border-gray-200 bg-gray-50 px-[30px] py-[10px] rounded-full rounded-l-full rounded-r-full  cursor-pointer mt-[20px]"
            style={{
              background: "linear-gradient(180deg, #F1ECF5 0%, #F2EEF5 100%)",
            }}
          >
            <div className="w-[100%] flex justify-between ">
              <div className="w-[100%] flex justify-start items-center">
                <div className="pr-[10px] md:pr-[20px]">
                  <img
                    src="images/sol.svg"
                    className="w-[30px] md:w-[40px]"
                    alt="tail_coin"
                  />
                </div>
                <div
                  className="flex flex-col justify-start 
                    "
                >
                  <div className="font-medium text-[18px] flex justify-start">
                    sol
                  </div>
                  <div className="flex justify-start font-medium	text-bold">
                    {"$0.0000"}
                    (0.0000)
                  </div>
                </div>
              </div>
              {/* right side  */}
              <div className="flex w-[170px] justify-between items-center  gap-5">
                <div className="flex flex-col justify-start w-[70%]">
                  <h5 className="font-medium text-left">$100</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        {" "}
        <Footer />
      </div>
    </div>
  );
};

export default Wallet;
