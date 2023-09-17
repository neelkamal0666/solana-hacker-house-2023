import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCryptobasket } from "./useCryptobasket";
import { CircularProgress } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import styles from "./CreateBasketModal.module.css";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { useWalletView } from "../../hooks/useWalletView";
function EditBasketModal({
  openModal,
  setOpenModal,
  singleBasket,
  tokenPercentArray,
  tokenArray,
}) {
  const [confirmClicked, setConfirmClicked] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [token, setToken] = useState("");
  const [tokenPercent, setTokenPercent] = useState("");
  const [cryptoBasketTokens, setCryptoBasketTokens] = useState(
    singleBasket.cryptoBasketTokens
  );
  const [minAmount, setMinAmount] = useState("");
  const appCtx = useSelector((state) => state.app);
  const [blockchain, setBlockchain] = useState(appCtx.blockchain);

  const navigate = useNavigate();

  const { getAllCoin, allCoin, isCoinLoading } = useWalletView();

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

  const handleRemoveBasketToken = (event, tokenToRemove) => {
    event.preventDefault();
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

  console.log("cryptoBasketTokens", cryptoBasketTokens);
  console.log("singleBasket", singleBasket);
  console.log("tokenPercentArray", tokenPercentArray);
  console.log("tokenArray", tokenArray);

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
            {cryptoBasketTokens?.length > 0 && (
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                  Tokens %
                </label>
                <div className="">
                  {cryptoBasketTokens.map((cryptoBasketToken, index) => {
                    const token = allCoin.find(
                      (coin) => coin.tokenShortName === cryptoBasketToken.token
                    );
                    return (
                      <div key={index} className=" ">
                        {token && (
                          <div className="flex flex-row items-center my-3">
                            <img
                              src={token.tokenIcon}
                              alt={token.tokenShortName}
                              className="w-[30px]"
                            />
                            <p className="ml-3 mr-5 w-[60px]">
                              {token?.tokenShortName}
                            </p>
                            <input
                              type="number"
                              value={cryptoBasketToken.tokenPercent}
                              onChange={(e) => {
                                const updatedTokens = [...cryptoBasketTokens];
                                updatedTokens[index].tokenPercent =
                                  e.target.value;
                                setCryptoBasketTokens(updatedTokens);
                              }}
                              className="bg-gray-200 w-[100px] items-center"
                            />
                            <button
                              onClick={(event) =>
                                handleRemoveBasketToken(
                                  event,
                                  token?.tokenShortName
                                )
                              }
                              className="ml-5"
                            >
                              Remove
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mb-4">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="token"
              >
                Add More Token
              </label>
              <div className="flex gap-3 flex-wrap justify-between">
                <select
                  className="appearance-none rounded-xl border-2 border-purple-200 bg-white shadow-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="token"
                  value={JSON.stringify(token)}
                  onChange={(event) => setToken(JSON.parse(event.target.value))}
                >
                  <option value="">Select token</option>
                  {allCoin.map((coin) => (
                    <option
                      key={coin.tokenId}
                      value={JSON.stringify([
                        coin.tokenId,
                        coin.tokenShortName,
                      ])}
                    >
                      {coin.tokenShortName}
                    </option>
                  ))}
                </select>
                <input
                  className="w-[40%] appearance-none rounded-xl  border-2 border-purple-200 bg-white shadow-md py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline"
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

            <div className="flex justify-center ">
              <button
                className="bg-gradient-to-r from-purple-700 to-purple-900 rounded-full  text-white px-20  py-2 md:py-2  "
                type="submit"
                // onClick={handleSubmit}
              >
                Submit{" "}
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

export default EditBasketModal;
