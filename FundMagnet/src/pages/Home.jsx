import React, { useEffect, useState } from "react";
import { ArrowUpwardRounded, ArrowDownwardRounded } from "@mui/icons-material";
import InvestorsPieChart from "../components/ui/InvestorsPieChart/InvestorsPieChart";
import NewsDisplay from "../components/ui/News/NewsDisplay";
import Update from "../components/ui/Update";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { appActions } from "../context/app-slice";
import AccessModal from "../components/AccessModal/AccessModal";

const Home = () => {
  const [wealthManagerLoaded, setWealthManagerLoaded] = useState(false);
  const [openAccessModal, setOpenAccessModal] = useState(false);
  const appCtx = useSelector((state) => state.app);
  const gain = 27;
  const isPositiveGain = gain > 0;

  const tokenPercentArray = [20, 50, 20, 10]; // Example data for token percentage values
  const tokenArray = ["Accounts", "TVL", "Portfolio", "24hr gains"];
  console.log("appCtx", appCtx);

  const dispatch = useDispatch();

  useEffect(() => {
    if (wealthManagerLoaded && !appCtx.wealthManager?.wmId) {
      setOpenAccessModal(true);
    }
  }, [wealthManagerLoaded]);

  useEffect(() => {
    let config = {
      method: "get",
      url: `${process.env.REACT_APP_NFTVERSE_DEV_API}/wealth/manager/profile?userId=${appCtx?.userDetails?.userId}`,
      headers: {
        "X-Auth-Token": "69184310761b3283bfacb88578ae77cc",
        "Content-Type": "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        dispatch(appActions.setWealthManager(response.data));
        setWealthManagerLoaded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <div className="w-[90%] mx-auto">
      <div className="flex flex-row justify-between pt-10">
        <div className="w-[80%]">
          <h1>Accounts Summary</h1>
          <div className="flex flex-row justify-between items-center  py-10">
            <div className=" p-4">
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
          <div>
            <hr className="bg-black mb-5 w-[50%]" />
          </div>
          <div className="flex flex-row justify-between w-[45%]  ">
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
      {/* Accounts section  */}

      {/* crypto lens section  */}
      <div>
        <h1 className="mt-20">Crypto Lens</h1>
        <NewsDisplay />
        <Update />
      </div>

      <AccessModal
        openModal={openAccessModal}
        setOpenModal={setOpenAccessModal}
      />
    </div>
  );
};

export default Home;
