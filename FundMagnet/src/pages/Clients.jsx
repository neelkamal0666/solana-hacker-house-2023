import React, { useEffect, useState } from "react";
import { ArrowUpwardRounded, ArrowDownwardRounded } from "@mui/icons-material";
import InvestorsPieChart from "../components/ui/InvestorsPieChart/InvestorsPieChart";
import Areachart from "../components/ui/Areachart/Areachart";
import InvestorsAccounts from "../components/ui/InvestorsAccounts/InvestorsAccounts";
import { useSelector } from "react-redux";
import axios from "axios";

const Clients = () => {
  const appCtx = useSelector((state) => state.app);
  const gain = 27;
  const isPositiveGain = gain > 0;

  const tokenPercentArray = [20, 50, 20, 10]; // Example data for token percentage values
  const tokenArray = ["Accounts", "TVL", "Portfolio", "24hr gains"];

  return (
    <div className="w-[90%] mx-auto">
      <div className="flex flex-row justify-between pt-10">
        <div className="w-[48%] ">
          <h1>Investors Summary</h1>
          <div className="flex flex-row justify-between items-center  py-10">
            <div className="">
              <p className="text-lg">Accounts 27</p>
              <p className="text-lg">TVL inr 50 cr</p>
              <p className="text-lg">Portfolio 27</p>
              <p className="text-lg">
                24hr gains: {gain}%{" "}
                {isPositiveGain ? (
                  <ArrowUpwardRounded className="text-green-500 inline-block text-sm" />
                ) : (
                  <ArrowDownwardRounded className="text-red-500 inline-block text-sm" />
                )}
              </p>
            </div>
            <div>
              <InvestorsPieChart
                tokenPercentArray={tokenPercentArray}
                tokenArray={tokenArray}
              />
            </div>
          </div>
        </div>
        <div className="w-[48%]  ">
          <h1>Overall performance</h1>
          <div className="py-10">
            <Areachart />
          </div>
          <div className="flex flex-row justify-between w-[60%] mx-auto ">
            <div>
              <h6>AVG CAGR</h6>
              <p>17.2%</p>
            </div>
            <div>
              <h6>Best CAGR</h6>
              <p>17.2%</p>
            </div>
            <div>
              <h6>Worst CAGR</h6>
              <p>17.2%</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h1 className="pt-10 ">Clients List</h1>
        <InvestorsAccounts />
      </div>
    </div>
  );
};

export default Clients;
