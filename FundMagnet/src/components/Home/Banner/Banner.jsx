import React, { useState } from "react";
import DemoModal from "../../DemoModal/DemoModal";

const Banner = () => {
  const [openDemoModal, setOpenDemoModal] = useState(false);
  return (
    <div className="pt-[30%] md:pt-[10%] ">
      <h1 className="text-center text-2xl font-semibold w-[90%] mx-auto">
        For Wealth Mangers & Financial Advisors
      </h1>
      <h1 className="text-center text-2xl md:text-7xl font-bold w-[90%] md:w-[70%] mx-auto">
        Diversify Your Clients Portfolio with Cryptos
      </h1>
      <div className="flex justify-center my-10 ">
        <button
          onClick={() => setOpenDemoModal(true)}
          className="text-gray-800 hover:text-blue-400 text-2xl font-semibold duration-500 flex items-center gap-2 rounded-full px-7 py-3 border-[3px]  border-black"
        >
          Join Waitlist
        </button>
      </div>
      <img src="/images/deckSS.png" alt="" className="w-[60%] mx-auto" />
   
      <DemoModal
        openDemoModal={openDemoModal}
        setOpenDemoModal={setOpenDemoModal}
      />
    </div>
  );
};

export default Banner;
