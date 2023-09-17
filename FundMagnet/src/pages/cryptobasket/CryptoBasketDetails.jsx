import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCryptobasket } from "./useCryptobasket";
import { CircularProgress, Skeleton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import BasketModal from "./BasketModal";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import EditBasketModal from "./EditBasketModal";
import SuccessModal from "./SuccessModal";
import FeeInfoModal from "./FeeInfoModal";
import { appActions } from "../../context/app-slice";
import Pricechart from "../../components/ui/Pricechart/Pricechart";
import Piechart from "../../components/ui/Piechart/Piechart";

const CryptoBasketDetails = () => {
  const [selectedChartTab, setSelectedChartTab] = useState(0);
  const [subscribed, setSubscribed] = useState(false);
  const [subscribeLoading, setSubscribeLoading] = useState(false);
  const [portfolio, setPortfolio] = useState("");
  const [subscribedData, setSubscribedData] = useState("");
  const [fees, setFees] = useState("");
  const [distributionProgress, setDistributionProgress] = useState(false);
  const [openEditBasketModal, setOpenEditBasketModal] = useState(false);
  const [openFeeInfoModal, setOpenFeeInfoModal] = useState(false);

  // const [closeClicked, setCloseClicked] = useState(false);
  const appCtx = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const { id } = useParams();

  const [openTalewalletModal, setOpenTalewalletModal] = useState(false);
  const [openHaveAnAccountOptionModal, setOpenHaveAnAccountOptionModal] =
    useState(false);
  const [openContinueInWebModal, setOpenContinueInWebModal] = useState(false);

  useEffect(() => {
    if (appCtx?.isLoggedIn === true) {
      if (appCtx.authToken) {
        let config = {
          url: `${process.env.REACT_APP_URL_BLOCKCHAIN_SERVICE}/user/blockchain/account`,
          method: "get",
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": appCtx.authToken,
          },
        };
        axios(config)
          .then((response) => {
            let data = response.data;
            console.log(data);
            const walletData = data?.filter(
              (account) => account.wallet === "TALEWALLET"
            );
            dispatch(appActions.setCustodial(walletData[0]?.custodial));
            if (walletData?.length > 0) {
              dispatch(appActions.setWalletAddress(walletData));
            }
          })
          .catch((error) => {});
      }

      setOpenContinueInWebModal(false);
      setOpenHaveAnAccountOptionModal(false);
      setOpenTalewalletModal(false);
      dispatch(appActions.setBlockChain("BSC"));
      // window.location.reload();
    }
  }, [appCtx?.isLoggedIn]);

  const createAccount = async () => {
    setOpenTalewalletModal(true);
  };

  const {
    fetchBasketById,
    singleBasket,
    singleBasketLoading,
    setopenBasketModal,
    openBasketModal,
    closeClicked,
    setCloseClicked,
    successcloseClicked,
    fetchBasketOwner,
    ownerDataLoading,
    basketOwner,
    transactionSuccess,
    setTransactionSuccess,
    setSuccessCloseClicked,
    openSuccessModal,
    setopenSuccessModal,
  } = useCryptobasket();

  useEffect(() => {
    const config = {
      method: "get",
      url: `${process.env.REACT_APP_URL_BLOCKCHAIN_SERVICE}/crypto/basket/${id}/fees`,
      headers: {
        ...(appCtx.authToken
          ? { "X-Auth-Token": appCtx.authToken }
          : { "X-App-Token": process.env.REACT_APP_X_APP_TOKEN }),
        "Content-Type": "application/json",
      },
    };

    const fetchData = async () => {
      try {
        const response = await axios.request(config);
        setFees(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    fetchBasketById(id)
      .then((response) => {
        const userId = response.data.userId;
        return fetchBasketOwner(userId);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (appCtx.isLoggedIn) {
      setSubscribeLoading(true);

      let config = {
        method: "get",
        url: `${process.env.REACT_APP_URL_BLOCKCHAIN_SERVICE}/crypto/basket/${id}/subscribed`,
        headers: {
          "X-Auth-Token": appCtx.authToken,
          "Content-Type": "application/json",
        },
      };

      axios
        .request(config)
        .then((response) => {
          if (response.data.subscribed === true) {
            setSubscribed(true);
            setSubscribeLoading(false);
          } else {
            setSubscribed(false);
            setSubscribeLoading(false);
          }
          setSubscribedData(JSON.parse(response?.data?.tokenDistribution));
        })
        .catch((error) => {
          console.log(error);
          setSubscribeLoading(false);
        });
    }
  }, [successcloseClicked, transactionSuccess]);

  const lastToken =
    singleBasket?.cryptoBasketTokens?.[
      singleBasket?.cryptoBasketTokens?.length - 1
    ];
  const lastRevision = lastToken?.revision || null;

  const filteredTokens = singleBasket?.cryptoBasketTokens?.filter(
    (token) => token.revision === lastRevision
  );

  const tokenPercentArray = filteredTokens?.map((token) => token?.tokenPercent);
  const tokenArray = filteredTokens?.map((token) => token?.token);

  // for rebalance time line
  const uniqueDates = [];
  const revisions = new Set();

  singleBasket.cryptoBasketTokens?.forEach((token) => {
    if (!revisions.has(token.revision)) {
      uniqueDates.push(token.updatedDate);
      revisions.add(token.revision);
    }
  });

  const sortedDates = uniqueDates.sort((a, b) => b - a);

  useEffect(() => {
    if (appCtx.isLoggedIn) {
      let config = {
        method: "get",
        url: `${process.env.REACT_APP_URL_BLOCKCHAIN_SERVICE}/crypto/basket/${id}/portfolio`,
        headers: {
          "X-Auth-Token": appCtx.authToken,
          "Content-Type": "application/json",
        },
      };

      axios
        .request(config)
        .then((response) => {
          if (response.status === 200) {
            setPortfolio(response.data);
          }
        })
        .catch((error) => {
          if (error.response.data.status === 500) {
            setDistributionProgress(true);
          } else {
            console.log(error);
          }
        });
    }
  }, [subscribed]);

  const description = singleBasket?.description ?? "";
  const sections = description.split(".").reduce((acc, curr, i, arr) => {
    if (i % 2 === 0) {
      acc.push(arr.slice(i, i + 2).join(".") + ".");
    }
    return acc;
  }, []);

  return (
    <div>
      <div className="">
        <div className="flex flex-col justify-between min-h-screen h-fit text-gray-800 home">
          <div className="w-[100%] pt-[30px] flex flex-col justify-center">
            <div className=" w-[100%]  rounded-tl-[40px] md:rounded-tl-[80px] rounded-tr-[40px] md:rounded-tr-[80px]">
              {/* portfolio card  */}

              {singleBasketLoading || ownerDataLoading ? (
                <div className="pt-[5%] w-[80%] mx-auto">
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "2rem" }}
                    className="w-[80%] mx-auto"
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "2rem" }}
                    className="w-[80%] mx-auto"
                  />

                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem" }}
                    className="w-[60%] mx-auto mt-3"
                  />

                  <Skeleton
                    variant="rectangular"
                    height={300}
                    className="w-[70%] mx-auto mt-5"
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem" }}
                    className="w-[60%] mx-auto mt-3"
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem" }}
                    className="w-[60%] mx-auto "
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem" }}
                    className="w-[60%] mx-auto "
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem" }}
                    className="w-[60%] mx-auto "
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem" }}
                    className="w-[60%] mx-auto "
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1rem" }}
                    className="w-[60%] mx-auto "
                  />
                  <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
                </div>
              ) : (
                <div className="  w-[90%] md:w-[80%] mx-auto py-10">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-5  items-center">
                      {singleBasket?.icon ? (
                        <img
                          src={singleBasket?.icon}
                          alt=""
                          className="w-[70px]"
                        />
                      ) : (
                        <img src="/images/basketimage.svg" alt="" />
                      )}

                      <div className="">
                        <h1 className="font-bold">{singleBasket?.name}</h1>
                        {basketOwner?.name && <p>by {basketOwner?.name}</p>}

                        <div className="flex gap-4">
                          {singleBasket?.annualCAGR && (
                            <h5 className="text-green-600 font-semibold text-normal">
                              1 Y CAGR {singleBasket?.annualCAGR}%
                            </h5>
                          )}

                          {/* <h5>
                          <FontAwesomeIcon
                            icon={faArrowUp}
                            className="ml-2 text-base"
                            aria-hidden="true"
                          />
                          +1.3%
                        </h5>
                        <h5>24h</h5> */}
                        </div>
                      </div>
                    </div>
                    {appCtx?.userDetails?.userId === singleBasket?.userId && (
                      <div className="flex justify-center md:justify-end">
                        {/* <CustomButton
                          onClick={() => {
                            setOpenEditBasketModal(true);
                          }}
                          primary={true}
                          className={`px-5 w-[150px] font-medium`}
                        >
                          Edit Basket
                        </CustomButton> */}
                      </div>
                    )}
                  </div>

                  <div className="py-10">{singleBasket?.title}</div>
                  <div className="flex flex-row justify-between w-[100%] mb-5">
                    <div className="">
                      <p className="font-semibold text-sm">Subscription Cost</p>
                      <h5 className="font-bold text-md">
                        {singleBasket?.subscriptionCost === null ||
                        singleBasket?.subscriptionCost <= 0
                          ? "Free"
                          : `${singleBasket?.subscriptionCost} /month`}
                        {singleBasket?.subscriptionCostUnit}
                      </h5>
                    </div>

                    <div className="">
                      <p className="font-semibold text-sm">Min.Amount </p>
                      <h5 className="font-bold text-md">
                        {singleBasket?.minAmount}{" "}
                        {singleBasket?.minAmountCurrency}
                      </h5>
                    </div>
                    <div className="">
                      <div className="flex flex-row justify-between">
                        <p className="font-semibold text-sm">Total Fee </p>
                        <FontAwesomeIcon
                          icon={faCircleInfo}
                          onClick={() => {
                            setOpenFeeInfoModal(true);
                          }}
                          className="cursor-pointer"
                        />
                      </div>
                      <h5 className="font-bold text-md">
                        {fees?.total?.toFixed(3)}
                        {singleBasket?.minAmountCurrency}
                      </h5>
                    </div>
                    <div className="">
                      <p className="font-semibold text-sm">Blockchain </p>
                      <h5 className="font-bold text-md">
                        {singleBasket?.blockchain}
                      </h5>
                    </div>
                  </div>

                  <div className="flex justify-center ">
                    {subscribed ? (
                      ""
                    ) : (
                      <button
                        onClick={() => {
                          setopenBasketModal(true);
                        }}
                        className="bg-gradient-to-r from-purple-700 to-purple-900 rounded-full  text-white px-20  py-2 md:py-2 my-5 "
                        type="submit"
                      >
                        {appCtx?.userDetails?.userId === singleBasket?.userId
                          ? "Invest"
                          : " Subscribe"}
                        <span>
                          {subscribeLoading && (
                            <CircularProgress size={20} className="ml-[5px]" />
                          )}
                        </span>
                      </button>
                    )}
                  </div>
                  {subscribed && (
                    <div className="flex flex-col md:flex-row justify-between gap-y-5 my-5">
                      <div
                        className="   bg-cover bg-center w-[90%] md:w-[45%] rounded-3xl   p-10  "
                        style={{
                          backgroundImage: `url(/images/basketbg.svg)`,
                        }}
                      >
                        {distributionProgress ? (
                          <div>
                            <h4 className="font-semibold text-center my-10">
                              Token distribution in progress
                            </h4>
                          </div>
                        ) : (
                          <div className="flex flex-col gap-4">
                            <div className="flex flex-row justify-between ">
                              <div className="flex flex-col items-start">
                                <p className="text-base font-medium">
                                  Invested
                                </p>
                                <h3 className="text-lg font-normal">
                                  Rs {portfolio?.invested}
                                </h3>
                              </div>
                              <div className="flex flex-col items-end">
                                <h4 className="text-base font-medium">
                                  Current
                                </h4>
                                <h3 className="text-lg font-normal">
                                  Rs {portfolio?.current?.toFixed(5)}
                                </h3>
                              </div>
                            </div>
                            <div className="flex flex-row justify-between">
                              <div className="flex flex-col items-start">
                                <h4 className="text-base font-medium">
                                  Return
                                </h4>
                                Rs {portfolio?.pnl?.toFixed(5)}
                              </div>
                              <div className="flex flex-col items-end">
                                <h4 className="text-base font-medium">
                                  Return in %
                                </h4>
                                Rs {portfolio?.pnlPercent?.toFixed(5)}%
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* second card  */}
                      <div
                        class="  bg-cover bg-center w-[90%] md:w-[45%] rounded-3xl p-10  "
                        style={{
                          backgroundImage: `url(/images/basketbg.svg)`,
                        }}
                      >
                        {!subscribedData || subscribedData?.length === 0 ? (
                          <div className="py-5">
                            <h3>Token Distribution is in progress</h3>
                          </div>
                        ) : (
                          subscribedData.map(({ token, amount }) => (
                            <div key={token}>
                              <span className="font-semibold">{token}</span>:{" "}
                              {amount}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-row justify-center w-[80%] md:w-[40%] mx-auto ">
                    {singleBasket?.gasFee && (
                      <div className="flex flex-col justify-center items-center">
                        <h5 className="font-semibold text-sm">
                          Estimated gas fees
                        </h5>
                        <h4 className="font-bold text-md">
                          {singleBasket?.gasFeeUnit}
                          {singleBasket?.gasFee}
                        </h4>
                      </div>
                    )}

                    {/* <div className="flex flex-col justify-center items-center">
                      <img src="/images/overvalued.svg" alt="" />
                      <h4>Overvalued</h4>
                    </div> */}
                  </div>

                  <div className="flex justify-center flex-row gap-5 md:gap-10 w-[100%] md:w-[50%] mx-auto my-10">
                    {singleBasket?.volatility && (
                      <div
                        className="flex gap-4 rounded-lg py-2 px-5"
                        style={{
                          background:
                            "linear-gradient(180deg, #E4D3FF 0%, rgba(171, 139, 224, 0.67) 100%)",
                        }}
                      >
                        <img src="/images/volatile1.svg" alt="" />
                        <h5>{singleBasket?.volatility}</h5>
                      </div>
                    )}

                    {singleBasket?.risk && (
                      <div
                        className="flex gap-4 rounded-lg py-2 px-5"
                        style={{
                          background:
                            "linear-gradient(180deg, #E4D3FF 0%, rgba(171, 139, 224, 0.67) 100%)",
                        }}
                      >
                        <img src="/images/volatile2.svg" alt="" />
                        <h5>{singleBasket?.risk}</h5>
                      </div>
                    )}
                  </div>

                  <div className="mt-5">
                    <h3 className="font-semibold">Description</h3>
                    {/* <p className="py-3">{singleBasket?.description ?? ""}</p> */}

                    {sections.map((section, index) => (
                      <p key={index} style={{ marginBottom: "1em" }}>
                        {section}
                      </p>
                    ))}
                  </div>

                  <div className="w-[100%]  mx-auto">
                    <h3 className="font-semibold mt-5">Price Chart</h3>
                    <Pricechart id={id} />
                  </div>

                  <div className="">
                    <h3 className="font-semibold mt-5">Tokens</h3>
                    <div className="flex justify-center py-10">
                      {" "}
                      {tokenPercentArray && tokenArray && (
                        <Piechart
                          tokenPercentArray={tokenPercentArray}
                          tokenArray={tokenArray}
                        />
                      )}
                    </div>
                  </div>
                  {sortedDates?.length > 0 && (
                    <div className="">
                      <h3 className="font-semibold">Rebalance Timeline</h3>
                      <div className="flex gap-5 font-medium">
                        {" "}
                        {basketOwner?.name && (
                          <p>Updates by {basketOwner?.name}</p>
                        )}
                      </div>
                      <div
                        className="flex flex-col py-5 w-[90%] md:w-[60%] mx-auto my-10"
                        style={{
                          borderRadius: "10px",
                          background:
                            "linear-gradient(135deg, rgba(107, 83, 147, 0.20) 0%, rgba(78, 40, 142, 0.20) 100%)",
                        }}
                      >
                        {sortedDates?.map((revision) => (
                          <div
                            key={revision}
                            className="flex justify-between  py-4 px-5"
                          >
                            <div className="flex gap-4 items-center">
                              <img src="/images/tickmarkgreen.svg" alt="" />
                              <h4>
                                {moment
                                  .unix(revision / 1000)
                                  .format("YYYY-MM-DD HH:mm:ss")}
                              </h4>
                            </div>

                            {/* <div className="flex items-center">
                              <h5>Next Review</h5>
                            </div> */}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* <div className="">
                    <h3 className="font-semibold">Tags</h3>
                    <p className="py-5">
                      Proof of work, Gold , Fixed Supply, Windmill Capital
                    </p>
                  </div> */}
                  <div className="my-5 flex flex-col gap-4">
                    {basketOwner && (
                      <h3 className="font-semibold">About the manager</h3>
                    )}

                    {/* <p className="py-5">
                      Proof of work, Gold , Fixed Supply, Windmill Capital
                    </p> */}
                    <div className="flex gap-5">
                      {basketOwner?.profilePic && (
                        <img
                          src="/images/manager.svg"
                          alt=""
                          className="w-[50px]"
                        />
                      )}

                      <div className="">
                        {basketOwner?.name && (
                          <h4 className="font-semibold ">
                            {basketOwner?.name}
                          </h4>
                        )}

                        {/* <p>Manages smallcases</p> */}
                      </div>
                    </div>
                    {basketOwner?.biobio && <p>{basketOwner?.bio}</p>}

                    {/* <div className="flex flex-wrap gap-y-5 w-[100%] md:w-[40%] mx-auto">
                      <div className="flex flex-row gap-4 w-[50%]">
                        <img src="/images/managericon1.svg" alt="" />
                        <p>Risk analysis</p>
                      </div>
                      <div className="flex flex-row gap-4 w-[50%]">
                        <img src="/images/managericon2.svg" alt="" />
                        <p>Investment management</p>
                      </div>
                      <div className="flex flex-row gap-4 w-[50%]">
                        <img src="/images/managericon3.svg" alt="" />
                        <p>Sector tracker</p>
                      </div>
                      <div className="flex flex-row gap-4 w-[50%]">
                        <img src="/images/managericon4.svg" alt="" />
                        <p>Monitoring performance</p>
                      </div>
                    </div>
                    <div className="w-[40%] mx-auto">
                      <p className="text-right">view all</p>
                    </div> */}

                    <div className="flex justify-center ">
                      {subscribed ? (
                        <button
                          className="bg-gradient-to-r from-purple-700 to-purple-900 rounded-full  text-white px-20  py-2 md:py-2 my-5 "
                          type="submit"
                        >
                          Subscribed
                          <span>
                            {subscribeLoading && (
                              <CircularProgress
                                size={20}
                                className="ml-[5px]"
                              />
                            )}
                          </span>
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setopenBasketModal(true);
                          }}
                          className="bg-gradient-to-r from-purple-700 to-purple-900 rounded-full  text-white px-20  py-2 md:py-2 my-5 "
                          type="submit"
                        >
                          {appCtx?.userDetails?.userId === singleBasket?.userId
                            ? "Invest"
                            : " Subscribe"}
                          <span>
                            {subscribeLoading && (
                              <CircularProgress
                                size={20}
                                className="ml-[5px]"
                              />
                            )}
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <BasketModal
        openModal={openBasketModal}
        setOpenModal={setopenBasketModal}
        closeClicked={closeClicked}
        setCloseClicked={setCloseClicked}
        singleBasket={singleBasket}
        tokenPercentArray={tokenPercentArray}
        tokenArray={tokenArray}
        successcloseClicked={successcloseClicked}
        setSuccessCloseClicked={setSuccessCloseClicked}
        openSuccessModal={openSuccessModal}
        setopenSuccessModal={setopenSuccessModal}
        transactionSuccess={transactionSuccess}
        setTransactionSuccess={setTransactionSuccess}
        fees={fees}
        setOpenContinueInWebModal={setOpenContinueInWebModal}
      />
      <FeeInfoModal
        openModal={openFeeInfoModal}
        setOpenModal={setOpenFeeInfoModal}
        singleBasket={singleBasket}
        fees={fees}
      />
      {singleBasket.cryptoBasketTokens && (
        <EditBasketModal
          openModal={openEditBasketModal}
          setOpenModal={setOpenEditBasketModal}
          singleBasket={singleBasket}
          tokenPercentArray={tokenPercentArray}
          tokenArray={tokenArray}
        />
      )}
      {openSuccessModal && (
        <SuccessModal
          openModal={openSuccessModal}
          setOpenModal={setopenSuccessModal}
          closeClicked={successcloseClicked}
          setCloseClicked={setSuccessCloseClicked}
          tokenArray={tokenArray}
          tokenPercentArray={tokenPercentArray}
          transactionSuccess={transactionSuccess}
          setTransactionSuccess={setTransactionSuccess}
        />
      )}
    </div>
  );
};

export default CryptoBasketDetails;
