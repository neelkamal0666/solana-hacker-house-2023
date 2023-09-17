import { OnrampWebSDK } from "@onramp.money/onramp-web-sdk";
import axios from "axios";
import { toast } from "react-toastify";

export const usehandleBuyTaleCoin = (appCtx) => {
  const address = appCtx.walletAddress?.find(
    (addr) => addr.blockchain === appCtx.blockchain
  )?.address;

  const handleBuyAlgos = () => {
    console.log("handle buy algo" + appCtx.blockchain);
    var network = "spl";
    var coincode = "sol";
    console.log(address)

    const onrampInstance = new OnrampWebSDK({
      appId: 335304, // replace this with the appID you got during onboarding process
      walletAddress: address, // replace with user's wallet address
      flowtype: 1, // 1 -> onramp || 2 -> offramp || 3 -> NFT checkout
      // ... pass other configs here
      // paymentMethod: 1-> UPI , 2-> IMPS
      network: network,
      coinCode: coincode,
      // fiatAmount: 15000
    });

    // when you are ready to show the widget, call show method
    onrampInstance.show();
    var fiatAmount = 0;

    // event log
    onrampInstance.on("TX_EVENTS", (e) => {
      fiatAmount = e.data.fiatAmount;
      var cryptoAmount = e.data.cryptoAmount;
      if (!cryptoAmount) {
        cryptoAmount = e.data.actualCryptoAmount;
      }

      let data = JSON.stringify({
        event: e.type,
        fiatAmount: fiatAmount,
        cryptoAmount: cryptoAmount,
        fiatCurrency: "INR",
        blockchain: appCtx.blockchain,
      });

      let config = {
        method: "post",
        url: `${process.env.REACT_APP_URL_BLOCKCHAIN_SERVICE}/onramp/event/log`,
        headers: {
          "X-Auth-Token": appCtx.authToken,
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  const handleBuyNativeToken = (
    fiatAmount,
    basketId,
    minAmountCurrency,
    successcloseClicked,
    setSuccessCloseClicked,
    openSuccessModal,
    setopenSuccessModal,
    transactionSuccess,
    setTransactionSuccess,
    blockchain
  ) => {
    var token;
    var network;
    if (blockchain === "POLYGON") {
      token = "matic";
      network = "matic20";
    } else if (blockchain === "BSC") {
      token = "bnb";
      network = "bep20";
    } else if (blockchain === "ETHEREUM") {
      token = "eth";
      network = "erc20";
    } else {
      token = "";
      network = "";
    }
    const onrampInstance = new OnrampWebSDK({
      appId: 335304, // replace this with the appID you got during onboarding process
      walletAddress: address, // replace with user's wallet address
      flowtype: 1, // 1 -> onramp || 2 -> offramp || 3 -> NFT checkout
      // ... pass other configs here
      // paymentMethod: 1-> UPI , 2-> IMPS
      network: network,
      coinCode: token,
      fiatAmount: fiatAmount,
    });
    let purchaseStatus = "started";

    // when you are ready to show the widget, call show method
    onrampInstance.show();

    onrampInstance.on("TX_EVENTS", (e) => {
      console.log(cryptoAmount);
      var distributeToken = false;
      var cryptoAmount = e.data.cryptoAmount;
      if (!cryptoAmount) {
        cryptoAmount = e.data.actualCryptoAmount;
      }
      // event log
      let data = JSON.stringify({
        event: e.type,
        fiatAmount: fiatAmount,
        cryptoAmount: cryptoAmount,
        fiatCurrency: "INR",
        blockchain: blockchain,
      });

      let config = {
        method: "post",
        url: `${process.env.REACT_APP_URL_BLOCKCHAIN_SERVICE}/onramp/event/log`,
        headers: {
          "X-Auth-Token": appCtx.authToken,
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });

      console.log("token :" + token);
      console.log("onrampInstance TX_EVENTS", e);
      if (
        e.type === "ONRAMP_WIDGET_TX_COMPLETED" ||
        e.type === "ONRAMP_WIDGET_TX_SENDING"
      ) {
        // Transaction successful, make API call here
        // var cryptoAmount = e.data.cryptoAmount;
        if (e.type === "ONRAMP_WIDGET_TX_COMPLETED") {
          distributeToken = true;
        }
        var cryptoAmount1 = e.data.actualCryptoAmount;
        // Transaction successful, make API call here
        // event log

        console.log(cryptoAmount1);

        let data = JSON.stringify({
          basketId: basketId,
          totalAmount: fiatAmount,
          currency: minAmountCurrency,
        });
        console.log(data);
        let config = {
          method: "post",
          url: `${process.env.REACT_APP_URL_BLOCKCHAIN_SERVICE}/crypto/basket/subscribe?nativeToken=${token}&nativeTokenQuantity=${cryptoAmount1}&distributeToken=${distributeToken}`,
          headers: {
            "X-Auth-Token": appCtx.authToken,
            "Content-Type": "application/json",
          },
          data: data,
        };

        axios
          .request(config)
          .then((response) => {
            if (response.status === 200) {
              if (e.type === "ONRAMP_WIDGET_TX_COMPLETED") {
                // onrampInstance.close();
                setSuccessCloseClicked(true);
                setTransactionSuccess(true);
                setopenSuccessModal(true);
                console.log("subscribed");
                console.log(response);
              }
              //show a popup with message "Token purchase successful. Distribution is in progress.
            }
          })
          .catch((error) => {
            onrampInstance.close();
            //show a popup with error message "Basket Subscription failed. Wait for sometime."
            console.log(error);
            setTransactionSuccess(false);
          });
      } else if (
        e.type === "ONRAMP_WIDGET_TX_SENDING_FAILED" ||
        e.type === "ONRAMP_WIDGET_TX_PURCHASING_FAILED" ||
        e.type === "ONRAMP_WIDGET_TX_FINDING_FAILED" ||
        e.type === "ONRAMP_WIDGET_TX_FAILED"
      ) {
        console.log(purchaseStatus);
        if (
          purchaseStatus === "ONRAMP_WIDGET_TX_PURCHASING" ||
          purchaseStatus === "ONRAMP_WIDGET_TX_SENDING"
        ) {
          let data = JSON.stringify({
            basketId: basketId,
            totalAmount: fiatAmount,
            currency: minAmountCurrency,
          });
          distributeToken = true;
          let config = {
            method: "post",
            url: `${process.env.REACT_APP_URL_BLOCKCHAIN_SERVICE}/crypto/basket/subscribe?nativeToken=${token}&nativeTokenQuantity=${cryptoAmount}&distributeToken=${distributeToken}`,
            headers: {
              "X-Auth-Token": appCtx.authToken,
              "Content-Type": "application/json",
            },
            data: data,
          };
          console.log(data);
          axios
            .request(config)
            .then((response) => {
              if (response.status === 200) {
                onrampInstance.close();
                setSuccessCloseClicked(true);
                setTransactionSuccess(true);
                setopenSuccessModal(true);
                console.log("subscribed");
                console.log(response);

                //show a popup with message "Token purchase successful. Distribution is in progress.
              }
            })
            .catch((error) => {
              onrampInstance.close();
              //show a popup with error message "Basket Subscription failed. Wait for sometime."
              console.log(error);
              setTransactionSuccess(false);
            });
        }
        // close the onramp popup and show message
        console.log("Transaction failed");
        onrampInstance.close();
        setTransactionSuccess(false);
        //event log
        //show a popup with error message "Token purchase failed. Try again."
      } else {
        purchaseStatus = e.type;
      }
    });
  };

  return {
    handleBuyAlgos,
    handleBuyNativeToken,
  };
};
