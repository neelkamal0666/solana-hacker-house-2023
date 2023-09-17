import React, { useEffect, useState } from "react";
import { useCryptobasket } from "./useCryptobasket";
import { Link } from "react-router-dom";
import { Button, Skeleton } from "@mui/material";
import CreateBasketModal from "./CreateBasketModal";
import { useSelector } from "react-redux";
import MybasketCard from "./MybasketCard";
import HowitWorksModal from "./HowitWorksModal";
import CustomButton from "../../components/CustomButton";

const CryptoBasket = () => {
  const [openCreateBasketModal, setOpenCreateBasketModal] = useState(false);
  const [closeClicked, setCloseClicked] = useState(false);
  const [howItWorksModal, setHowItWorksModal] = useState(false);
  const {
    fetchPublicBasket,
    publicBasket,
    privateBasket,
    fetchPrivateBasket,
    privateBasketLoading,
    publicBasketLoading,
    openBasketModal,
    setopenBasketModal,
  } = useCryptobasket();
  const appCtx = useSelector((state) => state.app);

  useEffect(() => {
    fetchPublicBasket();
    fetchPrivateBasket();
  }, []);
  return (
    <div
      className=""
      // style={{
      //   background: "linear-gradient(180deg, #3C0B8C 0%, #FFFFFF 119.14%)",
      // }}
    >
      <div className="flex flex-col justify-between min-h-screen h-fit  home">
        <div className="w-[100%] pt-5 flex flex-col justify-center">
          <div className=" w-[100%] rounded-tl-[40px] md:rounded-tl-[80px] rounded-tr-[40px] md:rounded-tr-[80px]">
            <div className="">
              <h1 className="font-bold text-center"> Crypto Basket</h1>
              <h5 className="font-bold text-center text-slate-500">
                {" "}
                A theme-based group of different crypto tokens
              </h5>
            </div>

            <CreateBasketModal
              openModal={openCreateBasketModal}
              setOpenModal={setOpenCreateBasketModal}
              closeClicked={closeClicked}
              setCloseClicked={setCloseClicked}
            />
            {/* my basket card  */}

            <div className="w-[80%] mx-auto flex flex-col md:flex-row justify-center md:justify-between mt-10 gap-5">
              {!privateBasketLoading && privateBasket?.length > 0 && (
                <div className="">
                  <h3 className=" font-semibold ">My Basket</h3>
                  <p className="font-semibold text-slate-500">
                    Simplest way to diversify your crypto investment across
                    multiple crypto tokens
                  </p>
                </div>
              )}
              {!privateBasketLoading && (
                <div className="flex justify-center md:justify-end">
                  <CustomButton
                    onClick={() => {
                      setOpenCreateBasketModal(true);
                    }}
                    primary={true}
                    className={`px-5 w-[150px] font-medium`}
                  >
                    Create
                  </CustomButton>
                </div>
              )}
            </div>

            <div className=" my-5 flex flex-col md:flex-row  justify-between flex-wrap gap-y-5 ">
              {privateBasketLoading ? (
                <div className="w-[80%] mx-auto flex flex-col md:flex-row gap-5 justify-center">
                  {Array.from({ length: 2 }, (_, index) => (
                    <div
                      key={index}
                      className="flex flex-col w-[90%]  md:w-[40%] mx-auto md:mx-0"
                    >
                      <Skeleton variant="rectangular" height={150} />
                      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                    </div>
                  ))}
                </div>
              ) : (
                <MybasketCard privateBasket={privateBasket} />
              )}
            </div>

            {/* publicBasket  */}

            {!publicBasketLoading && publicBasket?.length > 0 && (
              <div className="w-[80%] mx-auto flex flex-col md:flex-row items-center justify-between gap-5 ">
                <div className="">
                  <h3 className=" font-semibold  pt-5">
                    Public Basket by Crypto Advisor
                  </h3>
                  <p className="font-semibold text-slate-500">
                    Subscribe to crypto baskets created by Crypto Adviser to
                    keep yourself safe from fraud.
                  </p>
                </div>
                {!publicBasketLoading && (
                  <div>
                    <div className="">
                      <Button
                        onClick={() => {
                          setHowItWorksModal(true);
                        }}
                      >
                        How it Works
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div>
              <div className="w-[90%] md:w-[70%] mx-auto my-10 flex flex-col md:flex-row  justify-between flex-wrap gap-y-5 ">
                {publicBasketLoading ? (
                  <div className="w-[100%] mx-auto flex flex-col md:flex-row gap-5 justify-center">
                    {Array.from({ length: 2 }, (_, index) => (
                      <div
                        key={index}
                        className="flex flex-col w-[85%]  md:w-[45%] mx-auto md:mx-0"
                      >
                        <Skeleton variant="rectangular" height={150} />
                        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                      </div>
                    ))}
                  </div>
                ) : (
                  publicBasket.map((basket) => (
                    <Link
                      to={`/crypto-basket-details/${basket?.basketId}`}
                      key={basket?.basketId}
                      className="bg-cover bg-center w-[100%] md:w-[48%] border rounded-3xl pt-5 pb-10  px-5 md:px-10 no-underline text-black "
                      style={{
                        backgroundImage: `url(/images/basketbg.svg)`,
                      }}
                    >
                      <div>
                        <div className="flex flex-row overflow-hidden items-center gap-5 pb-3 h-[80px] ">
                          {basket?.icon ? (
                            <img
                              src={basket?.icon}
                              alt=""
                              className="w-[70px]"
                            />
                          ) : (
                            <img src="/images/basketimage.svg" alt="" />
                          )}
                          <div className="flex flex-col justify-start items-start">
                            <h4 className="font-bold ">
                              {basket?.name && basket?.name?.length > 20
                                ? `${basket?.name.substring(0, 20)}...`
                                : basket?.name}
                            </h4>
                            <h6>
                              {basket?.wealthManagerName &&
                              basket?.wealthManagerName?.length > 20
                                ? `${basket?.wealthManagerName.substring(
                                    0,
                                    20
                                  )}...`
                                : basket?.wealthManagerName}
                            </h6>
                          </div>
                        </div>
                        <div className="h-[50px]">
                          <p className="text-left">
                            {basket?.description &&
                            basket.description?.length > 70
                              ? `${basket.description.substring(0, 70)}...`
                              : basket.description}
                          </p>
                        </div>

                        <div className="flex flex-row justify-between items-center mt-5">
                          <div className="text-left">
                            <p>Min Amount</p>
                            <p className="font-semibold ">
                              {basket?.minAmountCurrency} {basket?.minAmount}
                            </p>
                          </div>
                          {/* <div>
                              <h5>Active Subs</h5>
                              <h3>3k+</h3>
                            </div> */}
                          {/* <div>
                              <img
                                src="/images/bookmark.svg"
                                alt=""
                                className=" w-[40px]"
                              />
                            </div> */}
                          <div>
                            <button
                              className="bg-gradient-to-r from-purple-700 to-purple-900 rounded-full  text-white py-2 px-5 "
                              type="submit"
                            >
                              {appCtx?.userDetails?.userId === basket?.userId
                                ? "Invest"
                                : " Subscribe"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <HowitWorksModal
        openModal={howItWorksModal}
        setOpenModal={setHowItWorksModal}
      />
    </div>
  );
};

export default CryptoBasket;
