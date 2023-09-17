import React from "react";
import DoneIcon from "@mui/icons-material/Done";
import { Tooltip } from "@mui/material";
import { useState } from "react";
import { Skeleton, Stack } from "@mui/material";
export const AccountAddressBar = ({ address }) => {
  const [copyId, setCopyId] = useState(false);
  const copyToClipboard = () => {
    setCopyId(true);
    navigator.clipboard.writeText(address);
  };
  return (
    <>
      <div
        className={
          "text-lg font-bold flex justify-around items-center px-10 py-2 gap-5  shadow-xl rounded-l-full rounded-r-full text-white"
        }
        style={{
          background: "rgba(103, 71, 156, 0.44)",
          border: "0.96001px solid #5B339A",
        }}
      >
        {address === undefined ? (
          <Stack className="w-[150px]">
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          </Stack>
        ) : (
          <>
            {" "}
            <div className="">{address && `${address?.substr(0, 12)}...`}</div>
            <div className="flex items-center h-[100%] cursor-pointer">
              <div
                className="mb-[6px] transition-all ease-out duration-500"
                onClick={() => {
                  copyToClipboard();
                }}
              >
                {!copyId ? (
                  <Tooltip title="Copy Id">
                    <img
                      src="/images/Copy.svg"
                      alt="logo"
                      className="w-[25px]"
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Copied">
                    <DoneIcon />
                  </Tooltip>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
