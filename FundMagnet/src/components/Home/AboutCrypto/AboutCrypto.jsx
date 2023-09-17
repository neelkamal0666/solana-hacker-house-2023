import React from "react";

const AboutCrypto = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row  justify-between items-center w-[80%] mx-auto py-20">
      <div className="w-[100%] md:w-[40%] flex flex-col gap-10">
        <p className="text-5xl font-semibold">About Fund Magnet</p>
        <p className="text-2xl ">
          Fund Magnet lets you in manage cryptos and DeFi portfolios of all your
          clients from a single dashboard.
        </p>
        <p className="text-2xl ">
          With our self-custody wallet and OnChain transactions, you can rest
          assured that your clients' assets are secure and easily accessible.
        </p>
      </div>
      <div className="w-[100%] md:w-[50%]">
        <img src="/images/deckSS.png" alt="" className="" />
      </div>
    </div>
  );
};

export default AboutCrypto;
