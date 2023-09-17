import axios from "axios";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";

export const useCryptobasket = () => {
  const [publicBasket, setPublicBasket] = useState([]);
  const [privateBasket, setPrivateBasket] = useState([]);
  const [singleBasket, setSingleBasket] = useState([]);
  const [privateBasketLoading, setPrivateBasketLoading] = useState(false);
  const [publicBasketLoading, setPublicBasketLoading] = useState(false);
  const [singleBasketLoading, setSingleBasketLoading] = useState(false);
  const [allCoin, setAllcoin] = useState([]);
  const [openBasketModal, setopenBasketModal] = useState(false);
  const [closeClicked, setCloseClicked] = useState(false);
  const [successcloseClicked, setSuccessCloseClicked] = useState(false);
  const [openSuccessModal, setopenSuccessModal] = useState(false);
  const [transactionSuccess, setTransactionSuccess] = useState(false);
  const [userId, setUserId] = useState(null);
  const [basketOwner, setBasketOwner] = useState(null);
  const [ownerDataLoading, setOwnerDataLoading] = useState(false);

  const appCtx = useSelector((state) => state.app);

  const fetchPublicBasket = () => {
    setPublicBasketLoading(true);

    let data = "";

    let config = {
      method: "get",
      url: `${process.env.REACT_APP_URL_BLOCKCHAIN_SERVICE}/crypto/basket/list?privacy=PUBLIC`,
      headers: {
        ...(appCtx.authToken
          ? { "X-Auth-Token": appCtx.authToken }
          : { "X-App-Token": process.env.REACT_APP_X_APP_TOKEN }),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setPublicBasket(response.data.content);
        setPublicBasketLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setPublicBasketLoading(false);
      });
  };
  const fetchPrivateBasket = () => {
    setPrivateBasketLoading(true);
    let data = "";

    let config = {
      method: "get",
      url: `${process.env.REACT_APP_URL_BLOCKCHAIN_SERVICE}/crypto/basket/list?privacy=PRIVATE`,
      headers: {
        "X-Auth-Token": appCtx.authToken,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setPrivateBasket(response.data.content);
        setPrivateBasketLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setPrivateBasketLoading(false);
      });
  };

  const fetchBasketOwner = (userId) => {
    setOwnerDataLoading(true);
    const axios = require("axios");

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.REACT_APP_NFTVERSE_DEV_API}/wealth/manager/profile?userId=${userId}`,
      headers: {
        "X-Auth-Token": appCtx.authToken,
        "Content-Type": "application/json",
      },
    };

    return axios
      .request(config)
      .then((response) => {
        setBasketOwner(response.data);
        setOwnerDataLoading(false);

        return response.data;
      })

      .catch((error) => {
        console.log(error);
        setOwnerDataLoading(false);
      });
  };

  const fetchBasketById = (id) => {
    setSingleBasketLoading(true);
    let data = "";

    let config = {
      method: "get",
      url: `${process.env.REACT_APP_URL_BLOCKCHAIN_SERVICE}/crypto/basket/list/${id}`,

      headers: {
        ...(appCtx.authToken
          ? { "X-Auth-Token": appCtx.authToken }
          : { "X-App-Token": process.env.REACT_APP_X_APP_TOKEN }),
        "Content-Type": "application/json",
      },
      data: data,
    };

    return axios
      .request(config)
      .then((response) => {
        setSingleBasket(response.data);
        setUserId(response.data.userId);
        setSingleBasketLoading(false);
        return response;
      })
      .catch((error) => {
        console.log(error);
        setSingleBasketLoading(false);
      });
  };

  return {
    fetchPublicBasket,
    publicBasket,
    privateBasket,
    fetchPrivateBasket,
    privateBasketLoading,
    publicBasketLoading,
    fetchBasketById,
    singleBasket,
    singleBasketLoading,
    allCoin,
    setopenBasketModal,
    openBasketModal,
    closeClicked,
    setCloseClicked,
    openSuccessModal,
    setopenSuccessModal,
    successcloseClicked,
    setSuccessCloseClicked,
    transactionSuccess,
    setTransactionSuccess,
    fetchBasketOwner,
    userId,
    basketOwner,
    ownerDataLoading,
  };
};
