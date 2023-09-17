import axios from "axios";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export const useWalletView = () => {
  const [accountAsset, setAccountAsset] = useState([]);
  const [otheraccountAsset, setOtherAccountAsset] = useState([]);
  const [assetLoader, setAssetLoader] = useState(false);
  const [otherassetLoader, setOtherAssetLoader] = useState(false);
  const [amount, setAmount] = useState(0);
  const [assetUrl, setAssetUrl] = useState([]);
  const [optedIn, setOptIn] = useState(false);
  const [taleAmount, setTaleAmount] = useState(0);
  const [optInSuccessfull, setOptInSuccessfull] = useState(false);
  const [minBalance, setMinBalance] = useState(0);
  const [token, setToken] = useState(null);
  const [allCoin, setAllcoin] = useState([]);
  const [allCoinPrice, setAllcoinPrice] = useState([]);
  const [usersToken, setUsersToken] = useState([]);
  const [isAssetLoading, setIsAssetLOading] = useState(false);
  const [isCoinLoading, setIsCoinLOading] = useState(false);
  const [openSwapModal, setopenSwapModal] = useState(false);
  const [openSellModal, setopenSellModal] = useState(false);

  const [icon, setIcon] = useState("");
  const dispatch = useDispatch();

  const appCtx = useSelector((state) => state.app);

  const address = appCtx?.walletAddress?.find(
    (addr) => addr?.blockchain === appCtx?.blockchain
  )?.address;

  const getAllCoin = () => {
    setIsCoinLOading(true);

    let config = {
      method: "get",
      url: `${process.env.REACT_APP_URL_BLOCKCHAIN_SERVICE}/token/list?blockchain=${appCtx.blockchain}`,
      headers: {
        "X-Auth-Token": appCtx.authToken,
      },
    };
    axios
      .request(config)
      .then((response) => {
        setAllcoin(response.data.content);
        const token =
          appCtx.blockchain === "POLYGON"
            ? "MATIC"
            : appCtx.blockchain === "BSC"
            ? "BNB"
            : appCtx.blockchain === "ETHEREUM"
            ? "ETH"
            : "";
        const icon = response.data.content.find(
          (coin) => coin.symbol === token
        ).tokenIcon;
        setIcon(icon);
        setIsCoinLOading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getAllCoinPrice = () => {
    let config = {
      method: "get",
      url: `${process.env.REACT_APP_URL_BLOCKCHAIN_SERVICE}/token/price?blockchain=${appCtx.blockchain}`,
      headers: {
        "X-Auth-Token": appCtx.authToken,
      },
    };
    axios
      .request(config)
      .then((response) => {
        setAllcoinPrice(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getUsersToken = () => {
    let config = {
      method: "get",
      url: `${process.env.REACT_APP_URL_BLOCKCHAIN_SERVICE}/user/token?blockchain=${appCtx.blockchain}`,
      headers: {
        "X-Auth-Token": appCtx.authToken,
      },
    };
    axios
      .request(config)
      .then((response) => {
        setUsersToken(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showAllcoin = useCallback(async () => {
    getAllCoin();
    getAllCoinPrice();
    getUsersToken();
  }, [appCtx.walletAddress, appCtx.blockchain, optedIn]);

  const handleCustodialOptIn = () => {
    if (amount >= 0.451) {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_URL_BLOCKCHAIN_SERVICE}/asset/${process.env.REACT_APP_TAIL_COIN_TOKEN}/optin`,
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": appCtx.authToken,
        },
      })
        .then((res) => {
          setOptInSuccessfull(false);
          setOptIn(true);
        })
        .catch(() => {
          setOptInSuccessfull(false);
          toast.error("Failed to optIn asset unsuccessfull");
        });
    } else {
      toast.error(
        "Your wallet should have atleast 0.451 ALGOS to opt In Tale Coin Token"
      );
      setOptInSuccessfull(false);
    }
  };

  return {
    address,
    token,
    accountAsset,
    setAccountAsset,
    amount,
    setAmount,
    assetUrl,
    setAssetUrl,
    appCtx,
    optedIn,
    taleAmount,
    setOptInSuccessfull,
    optInSuccessfull,
    handleCustodialOptIn,
    minBalance,
    assetLoader,
    showAllcoin,
    allCoin,
    allCoinPrice,
    usersToken,
    isAssetLoading,
    isCoinLoading,
    icon,
    otheraccountAsset,
    otherassetLoader,
    setIsAssetLOading,
    openSwapModal,
    setopenSwapModal,
    openSellModal,
    setopenSellModal,
    getAllCoin,
    getAllCoinPrice,
    getUsersToken,
  };
};
