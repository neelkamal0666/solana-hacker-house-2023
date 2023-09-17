import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const useCryptolens = () => {
  const [openlensModal, setopenlensModal] = useState(false);

  const [subscribed, setSubscribed] = useState(false);
  const [success, setSuccess] = useState(false);
  const [closeClicked, setCloseClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [postloading, setPostLoading] = useState(false);
  const [content, setContent] = useState([]);

  const appCtx = useSelector((state) => state.app);
  // checking whether user is subscribed or not
  const isSubscribed = () => {
    setLoading(true);
    let config = {
      method: "get",
      url: `${process.env.REACT_APP_URL_MARKETPLACE_SERVICE}/crypto/lens/subscribed?email=${appCtx?.userDetails?.email}`,
      headers: {
        "Content-Type": "application/json",
        ...(appCtx.authToken
          ? { "X-Auth-Token": appCtx.authToken }
          : { "X-App-Token": process.env.REACT_APP_X_APP_TOKEN }),
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setLoading(false);

        if (response.data.status === true) {
          setSubscribed(true);
        }
        if (response.data.status === false) {
          setSubscribed(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleUnSubscribe = () => {
    setLoading(true);
    let data = JSON.stringify({
      email: appCtx?.userDetails?.email,
    });

    let config = {
      method: "put",
      url: `${process.env.REACT_APP_URL_MARKETPLACE_SERVICE}/crypto/lens/unsubscribe`,
      headers: {
        "X-Auth-Token": appCtx.authToken,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        if (response.data?.status === true) {
          toast.success(`${response.data?.message}`);
          setSubscribed(false);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  // fetching post content

  const fetchPostContent = () => {
    setPostLoading(true);

    const axios = require("axios");
    let data = "";

    let config = {
      method: "get",
      url: `${process.env.REACT_APP_URL_MARKETPLACE_SERVICE}/crypto/lens/post/list`,
      headers: {
        "X-Auth-Token": appCtx.authToken,
        "Content-Type": "application/json",
      },

      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setContent(response.data?.content);
        setPostLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setPostLoading(false);
      });
  };

  return {
    openlensModal,
    setopenlensModal,
    subscribed,
    setSubscribed,
    success,
    setSuccess,
    closeClicked,
    setCloseClicked,
    loading,
    setLoading,
    postloading,
    setPostLoading,
    content,
    setContent,
    isSubscribed,
    handleUnSubscribe,
    fetchPostContent,
  };
};
