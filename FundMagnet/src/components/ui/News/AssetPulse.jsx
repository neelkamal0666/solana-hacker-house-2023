import React from "react";

const AssetPulse = (props) => {
  return (
    <div className="flex flex-col gap-5 p-2 border border-gray-400/30 animate-pulse">
      <div className="bg-gray-400/30 w-full h-[200px]"></div>
      <div className="h-[10px] rounded-xl bg-gray-400/30"></div>
      <div className="h-[10px] rounded-xl bg-gray-400/30"></div>
      <div className="h-[10px] rounded-xl bg-gray-400/30"></div>
      <div className="h-[10px] rounded-xl bg-gray-400/30"></div>
      <div className="h-[50px] rounded bg-gray-400/30"></div>
    </div>
  );
};

export default AssetPulse;
