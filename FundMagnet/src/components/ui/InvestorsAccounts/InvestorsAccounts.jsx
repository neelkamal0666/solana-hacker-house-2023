import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import axios from "axios";
import { usehandleBuyTaleCoin } from "../../../hooks/handleBuyTaleCoin";
import { useNavigate } from "react-router-dom";

const InvestorsAccounts = () => {
  const [searchText, setSearchText] = useState("");
  const [accounts, setAccounts] = useState("");
  const [accountsAddresses, setAccountsAddresses] = useState("");
  const [combinedData, setCombinedData] = useState("");
  const navigate = useNavigate();

  const appCtx = useSelector((state) => state.app);

  const { handleBuyAlgos } = usehandleBuyTaleCoin(appCtx);

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    let config = {
      method: "get",
      url: `${process.env.REACT_APP_NFTVERSE_DEV_API}/fundMagnet/wm/${appCtx.wealthManager.wmId}/client/list`,
      headers: {
        "X-Auth-Token": appCtx.authToken,
        "Content-Type": "application/json",
      },
    };

    axios
      .request(config)
      .then((response) => {
        setAccounts(response.data?.content);
        const userIdArray = response.data?.content?.map(
          (item) => item?.clientId
        );

        let data = JSON.stringify(userIdArray);

        let config2 = {
          method: "post",
          url: `${process.env.REACT_APP_URL_BLOCKCHAIN_SERVICE}/user/address/list`,
          headers: {
            "X-Auth-Token": appCtx.authToken,
            "Content-Type": "application/json",
          },
          data: data,
        };

        axios
          .request(config2)
          .then((response) => {
            setAccountsAddresses(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (accounts && accountsAddresses) {
      const data = accounts.map((account) => {
        const matchingAddress = accountsAddresses.find(
          (address) => address.userId === account.clientId
        );
        const address = matchingAddress ? matchingAddress.address : "";
        const truncatedAddress =
          address?.length > 11
            ? address.substring(0, 5) + "..." + address.slice(-5)
            : address;
        return {
          clientId: account.clientId,
          firstName: account.firstName,
          lastName: account.lastName,
          email: account.email,
          mobile: account.mobile,
          aadhar: account.aadhar,
          pan: account.pan,
          address: matchingAddress ? matchingAddress.address : "",
          truncatedAddress,
        };
      });

      setCombinedData(data);
    }
  }, [accounts, accountsAddresses]);

  console.log("combineddata", combinedData);
  console.log("accountsAddresses", accountsAddresses);
  console.log("accounts", accounts);

  return (
    <div className="p-4">
      <div className="relative py-10">
        <input
          type="text"
          placeholder="Search"
          className="w-[40%] pl-8 pr-4 py-2 rounded-lg bg-gray-400 text-white"
          value={searchText}
          onChange={handleSearchChange}
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <SearchIcon className="text-white" />
        </div>
      </div>
      {accounts && (
        <>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border-t border-b border-gray-500 p-2 text-center">
                  User Id
                </th>
                <th className="border-t border-b border-gray-500 p-2 text-center">
                  firstName
                </th>
                <th className="border-t border-b border-gray-500 p-2 text-center">
                  lastName
                </th>
                <th className="border-t border-b border-gray-500 p-2 text-center">
                  email
                </th>
                <th className="border-t border-b border-gray-500 p-2 text-center">
                  mobile
                </th>
                <th className="border-t border-b border-gray-500 p-2 text-center">
                  aadhar
                </th>
                <th className="border-t border-b border-gray-500 p-2 text-center">
                  pan
                </th>
                <th className="border-t border-b border-gray-500 p-2 text-center">
                  wallet address
                </th>
                <th className="border-t border-b border-gray-500 p-2 text-center"></th>
                <th className="border-t border-b border-gray-500 p-2 text-center"></th>
              </tr>
            </thead>
            <tbody>
              {combinedData &&
                combinedData.map((data, index) => (
                  <tr key={index} className="">
                    <td className="border-t border-b border-gray-500 p-2 text-center">
                      {data.clientId}
                    </td>
                    <td className="border-t border-b border-gray-500 p-2 text-center">
                      {data.firstName}
                    </td>
                    <td className="border-t border-b border-gray-500 p-2 text-center">
                      {data.lastName}
                    </td>
                    <td className="border-t border-b border-gray-500 p-2 text-center">
                      {data.email}
                    </td>
                    <td className="border-t border-b border-gray-500 p-2 text-center">
                      {data.mobile}
                    </td>
                    <td className="border-t border-b border-gray-500 p-2 text-center">
                      {data.aadhar}
                    </td>
                    <td className="border-t border-b border-gray-500 p-2 text-center">
                      {data.pan}
                    </td>
                    <td className="border-t border-b border-gray-500 p-2 text-center">
                      {data.truncatedAddress}
                    </td>
                    <td className="border-t border-b border-gray-500 p-2 text-center">
                      <button
                        onClick={() => {
                          handleBuyAlgos(data?.address);
                        }}
                        className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Add Fund
                      </button>
                    </td>
                    <td className="border-t border-b border-gray-500 p-2 text-center">
                      <button
                        onClick={() => {
                          navigate(`/wallet?address=${data?.address}`);
                        }}
                        className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                      >
                        View More
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default InvestorsAccounts;
