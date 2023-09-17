import React from "react";
import { UserIcon, FingerPrintIcon } from "@heroicons/react/24/solid";

const WhyChoose = () => {
  return (
    <div className="w-[80%] mx-auto  ">
      <h1 className="text-center text-2xl md:text-6xl font-bold w-[90%] md:w-[60%] mx-auto pb-20">
        Why Choose Crypto Board
      </h1>
      <div className="w-[100%]  flex flex-row justify-between gap-y-5 flex-wrap">
        <div className="flex flex-row gap-5 justify-start w-[45%]">
          <div>
            <img src="/images/get users.png" alt="" className="w-[100px]" />
          </div>
          <div>
            <p className="text-2xl font-semibold">Manage Multiple Clients</p>
            <p className="text-lg ">
              We provide you with a single dashboard where you can create defi
              accounts for your clients and manage each of their portfolio
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-5 justify-start w-[45%]">
          <div>
            <img src="/images/onRamp.png" alt="" className="w-[100px]" />
          </div>
          <div>
            <p className="text-2xl font-semibold">OnChain Transperancy</p>
            <p className="text-lg ">
              We create DeFi self custody wallet and keep all your transaction
              OnChain
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-5 justify-start w-[45%]">
          <div>
            <img src="/images/details.png" alt="" className="w-[100px]" />
          </div>
          <div>
            <p className="text-2xl font-semibold">Discover New Clients</p>
            <p className="text-lg ">
              You can create accounts for your existing HNI clients but at the
              same time gain new clients from the Tale Wallet app where your
              Crypto Baskets will be visible
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-5 justify-start w-[45%]">
          <div>
            <img
              src="/images/multiple accounts.png"
              alt=""
              className="w-[100px]"
            />
          </div>
          <div>
            <p className="text-2xl font-semibold">Adher to Regulation</p>
            <p className="text-lg ">
              We constantly stay in touch with Government Regulations to keep
              crypto investment in accordance with government regulations
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-5 justify-start w-[45%]">
          <div>
            <img src="/images/learn.png" alt="" className="w-[100px]" />
          </div>
          <div>
            <p className="text-2xl font-semibold">Learn with Crypto Lens</p>
            <p className="text-lg ">
              Get regular update on Cryptos and Learn about the Industry and how
              to evaluate this with crypto Lens
            </p>
          </div>
        </div>
      </div>
      <div className=" my-10 ">
        <button className="text-gray-800 hover:text-blue-400 text-2xl font-semibold duration-500 flex items-center gap-2 rounded-full px-7 py-3 border-[3px]  border-black">
          Reserve My Spot
        </button>
      </div>
    </div>
  );
};

export default WhyChoose;
