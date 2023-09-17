import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./MybasketCard.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicbasketCard = ({ publicBasket }) => {
  const appCtx = useSelector((state) => state.app);

  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <img
      src="/images/arrowleft.svg"
      className="w-[50px] bg-red-500"
      alt="prevArrow"
      {...props}
    />
  );

  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <img src="/images/arrowright.svg" alt="nextArrow" {...props} />
  );
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: publicBasket?.length > 1 ? 2 : 1,
    slidesToScroll: 1,
    initialSlide: 0,
    prevArrow: <SlickArrowLeft />,
    nextArrow: <SlickArrowRight />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="card__container">
      <Slider {...settings} className="w-[75%] ">
        {publicBasket.map((basket) => {
          return (
            <div
              // to={`/crypto-basket-details/${basket?.basketId}`}
              key={basket?.basketId}
              className=""
            >
              <div
                className={`p-5 bg-cover bg-center border rounded-3xl ${
                  publicBasket?.length === 1 ? "mr-[55%]" : "m-5"
                }`}
                style={{
                  backgroundImage: `url(/images/basketbg.svg)`,
                }}
              >
                <Link
                  to={`/crypto-basket-details/${basket?.basketId}`}
                  className=" no-underline text-black "
                >
                  <div>
                    <div className="flex flex-row overflow-hidden items-center gap-5 pb-3 h-[80px] ">
                      {basket?.icon ? (
                        <img src={basket?.icon} alt="" className="w-[70px]" />
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
                            ? `${basket?.wealthManagerName.substring(0, 20)}...`
                            : basket?.wealthManagerName}
                        </h6>
                      </div>
                    </div>
                    <div className="h-[50px]">
                      <p className="text-left">
                        {basket?.description && basket.description?.length > 70
                          ? `${basket.description.substring(0, 70)}...`
                          : basket.description}
                      </p>
                    </div>

                    <div className="flex flex-row justify-between items-center mt-5 ">
                      <div className="text-left">
                        <p>Min.Amount</p>
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
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default PublicbasketCard;
