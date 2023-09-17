import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCryptobasket } from "./useCryptobasket";
import { CircularProgress } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronDown, faX } from "@fortawesome/free-solid-svg-icons";

import styles from "./CreateBasketModal.module.css";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { nativeToken } from "../../config";
import { useWalletView } from "../../hooks/useWalletView";
function CreateBasketModal({
  openModal,
  setOpenModal,

  closeClicked,
  setCloseClicked,
}) {
  const [confirmClicked, setConfirmClicked] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [token, setToken] = useState("");
  const [tokenPercent, setTokenPercent] = useState("");
  const [cryptoBasketTokens, setCryptoBasketTokens] = useState([]);
  const [minAmount, setMinAmount] = useState("");
  const appCtx = useSelector((state) => state.app);
  const [blockchain, setBlockchain] = useState(appCtx.blockchain);

  const navigate = useNavigate();

  const { getAllCoin, allCoin, isCoinLoading } = useWalletView();

  const chains = Object.keys(nativeToken)
    .filter((key) => key !== "ALGORAND")
    .reduce((obj, key) => {
      obj[key] = nativeToken[key];
      return obj;
    }, {});

  useEffect(() => {
    getAllCoin();
  }, [blockchain]);

  const handleAddBasketToken = () => {
    // Check if the selected token already exists in the array
    const existingTokenIndex = cryptoBasketTokens.findIndex(
      (t) => t.tokenId === token[0]
    );

    if (existingTokenIndex !== -1) {
      // If the token exists, update the tokenPercent value
      const updatedTokens = [...cryptoBasketTokens];
      updatedTokens[existingTokenIndex].tokenPercent = tokenPercent;
      setCryptoBasketTokens(updatedTokens);
    } else {
      // If the token doesn't exist, add it to the array
      setCryptoBasketTokens([
        ...cryptoBasketTokens,
        {
          tokenId: token[0],
          token: token[1],
          tokenPercent: tokenPercent,
        },
      ]);
    }

    // Reset the input fields
    setToken([]);
    setTokenPercent("");
  };
  console.log("cryptoBasketTokens", cryptoBasketTokens);

  const handleRemoveBasketToken = (tokenToRemove) => {
    setCryptoBasketTokens(
      cryptoBasketTokens.filter((token) => token.token !== tokenToRemove)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const tokenPercentages = cryptoBasketTokens.map((token) =>
      parseInt(token.tokenPercent)
    );

    const sum = tokenPercentages.reduce(
      (total, percentage) => total + percentage
    );

    if (sum !== 100) {
      toast.warning("Summation of all token percentage should be 100");
      setLoading(false);
      return;
    }

    const data = {
      name,
      description,
      minAmount,
      blockchain,
      minAmountCurrency: "INR",
      cryptoBasketTokens,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL_BLOCKCHAIN_SERVICE}/crypto/basket`,
        data,
        {
          headers: {
            "X-Auth-Token": appCtx.authToken,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      if (response.data.basketId) {
        navigate(`/crypto-basket-details/${response.data.basketId}`);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const customStyles = {
    content: {
      top: "53%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      padding: "0",
      borderRadius: "10px",
      transform: "translate(-50%, -50%)",
      overflow: "inherit",
      // width: width > 1200 ? "600px" : "370px",
    },
  };
  function closeModal() {
    setOpenModal(false);
  }

  console.log("token", token);

  return (
    <div>
      <Modal
        isOpen={openModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
        className={`${styles.popup}  `}
      >
        <div className="w-[100%] flex justify-end mr-[20px] pt-[10px] ">
          <button
            className=" font-medium  text-2xl flex items-center leading-[10px] mr-[10px] mt-[10px]"
            onClick={closeModal}
          >
            X
          </button>
        </div>
        <div className="px-10">
          <form className="  bg-white p-5">
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="name"
              >
                Name of Basket
              </label>
              <input
                className="  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-xl  border-2 border-purple-200 bg-white shadow-md"
                id="name"
                type="text"
                placeholder="Enter Basket Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className=" rounded-xl  border-2 border-purple-200 bg-white shadow-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                placeholder="Enter description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="blockchain"
              >
                Blockchain
              </label>
              <select
                className=" rounded-xl border-2 border-purple-200 bg-white shadow-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="blockchain"
                value={blockchain}
                onChange={(event) => setBlockchain(event.target.value)}
              >
                {Object.keys(chains).map((chain) => (
                  <option key={chain} value={chain.toUpperCase()}>
                    {chain.toUpperCase()}
                  </option>
                ))}
                <span>
                  <FontAwesomeIcon icon={faCircleChevronDown} />
                </span>
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="token"
              >
                Coins
              </label>
              <div className="flex gap-3 flex-wrap justify-between">
                <select
                  className="rounded-xl border-2 border-purple-200 bg-white shadow-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="token"
                  value={JSON.stringify(token)}
                  onChange={(event) => setToken(JSON.parse(event.target.value))}
                >
                  <option value="">
                    <span> Select token</span>
                    <span>
                      <FontAwesomeIcon icon={faCircleChevronDown} />
                    </span>
                  </option>
                  {allCoin.map((coin) => (
                    <option
                      key={coin?.tokenId}
                      value={JSON.stringify([
                        coin?.tokenId,
                        coin?.tokenShortName,
                      ])}
                    >
                      {coin?.tokenName}
                    </option>
                  ))}
                </select>
                <input
                  className="w-[40%]  rounded-xl  border-2 border-purple-200 bg-white shadow-md py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline"
                  id="tokenPercent"
                  type="number"
                  placeholder="Token percentage"
                  value={tokenPercent}
                  onChange={(event) => setTokenPercent(event.target.value)}
                />
                <button
                  className=" text-white font-bold py-2 px-4 rounded-xl  border-2 border-purple-200 shadow-md"
                  style={{
                    background:
                      " linear-gradient(137deg, #6135A6 0%, #A45BDE 100%)",
                  }}
                  type="button"
                  onClick={handleAddBasketToken}
                >
                  Add
                </button>
              </div>
            </div>

            {cryptoBasketTokens?.length > 0 && (
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Tokens
                </label>
                <ul className="flex  justify-start items-center gap-5">
                  {cryptoBasketTokens.map((cryptoBasketToken, index) => {
                    const token = allCoin.find(
                      (coin) => coin.tokenShortName === cryptoBasketToken.token
                    );
                    return (
                      <li
                        key={index}
                        className="list-none flex flex-col items-center justify-between"
                        onMouseEnter={(e) =>
                          e.currentTarget.firstChild.classList.remove(
                            "invisible"
                          )
                        }
                        onMouseLeave={(e) =>
                          e.currentTarget.firstChild.classList.add("invisible")
                        }
                      >
                        <div className="text-gray-400 hover:text-gray-600 cursor-pointer  invisible rounded-md  px-1 mb-[-12px] ml-[18px] bg-purple-700 shadow-md z-20">
                          <FontAwesomeIcon
                            className="w-[8px] text-white"
                            onClick={() =>
                              handleRemoveBasketToken(token?.tokenShortName)
                            }
                            icon={faX}
                          />
                        </div>
                        {token && (
                          <div className="flex flex-col items-center z-10">
                            <img
                              src={token.tokenIcon}
                              alt={token.tokenShortName}
                              className="w-[30px]"
                            />
                            <p>{cryptoBasketToken.tokenPercent}%</p>
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="minAmount"
              >
                Amount
              </label>
              <input
                className=" rounded-xl  border-2 border-purple-200 bg-white shadow-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="minAmount"
                type="number"
                placeholder="Enter amount"
                value={minAmount}
                onChange={(event) => setMinAmount(event.target.value)}
              />
            </div>
            <div className="flex justify-center ">
              <button
                className="bg-gradient-to-r from-purple-700 to-purple-900 rounded-full  text-white px-20  py-2 md:py-2  "
                type="submit"
                onClick={handleSubmit}
              >
                Continue{" "}
                <span>
                  {loading && (
                    <CircularProgress size={20} className="ml-[5px]" />
                  )}
                </span>
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default CreateBasketModal;
