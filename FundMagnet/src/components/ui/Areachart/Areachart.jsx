import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { curveCardinal } from "d3-shape";
import { useSelector } from "react-redux";
import { Skeleton, Stack } from "@mui/material";
import moment from "moment";

const cardinal = curveCardinal.tension(0.2);

const Areachart = ({ selecteddate = "w", tokoenname = "USDT" }) => {
  const [prices, setPrices] = useState([]);
  const [minMax, setMinMax] = useState([]);
  const [chartLoading, setChartLoading] = useState(false);
  const appCtx = useSelector((state) => state.app);

  const [aspectRatio, setAspectRatio] = useState(1);

  useEffect(() => {
    const axios = require("axios");
    setChartLoading(true);

    let config = {
      method: "get",
      url: `${process.env.REACT_APP_URL_BLOCKCHAIN_SERVICE}/token/price/history?token=${tokoenname}&range=${selecteddate}`,
      headers: {
        ...(appCtx.authToken
          ? { "X-Auth-Token": appCtx.authToken }
          : { "X-App-Token": process.env.REACT_APP_X_APP_TOKEN }),
      },
    };

    axios
      .request(config)
      .then((response) => {
        setPrices(response.data.prices);
        setChartLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    let min = prices?.length > 0 ? prices[0][1] : 0;
    let max = prices?.length > 0 ? prices[0][1] : 0;

    for (let i = 1; i < prices?.length; i++) {
      const price = prices[i][1];
      if (price < min) {
        min = price;
      }
      if (price > max) {
        max = price;
      }
    }
    setMinMax([min, max]);
  }, [prices]);

  const data = prices?.map((price) => ({
    date: moment.unix(price[0]).toISOString(),
    price: price[1],
  }));

  const tickFormatter = (date) =>
    selecteddate === "h" || selecteddate === "d"
      ? moment(date).format("h:mm A")
      : moment(date).format("M/D/YYYY");

  useLayoutEffect(() => {
    const width = window.innerWidth;
    const newAspectRatio = width < 600 ? 2 : 2;
    setAspectRatio(newAspectRatio);
  }, []);

  return (
    <>
      {!chartLoading ? (
        <ResponsiveContainer width="100%" aspect={aspectRatio}>
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 0,
              left: 15,
              bottom: 50,
            }}
          >
            <CartesianGrid horizontal="true" vertical="" />
            <XAxis
              dataKey={
                selecteddate === "h" || selecteddate === "d" ? "date" : "date"
              }
              tickCount={25}
              tickFormatter={tickFormatter}
              angle={-30}
              textAnchor="middle"
              label={{
                position: "middle",
                offset: 0,
                style: { paddingRight: "50px" },
              }}
            />
            <YAxis
              domain={minMax}
              tickCount={7}
              tickFormatter={(value) => `$${value.toFixed(5)}`}
            />
            <Tooltip formatter={(value) => `$${value}`} />

            <Area
              type={cardinal}
              dataKey="price"
              stroke="#82ca9d"
              fill="#82ca9d"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <Stack className="w-[90%] mx-auto">
          {/* For variant="text", adjust the height via font-size */}
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        </Stack>
      )}
    </>
  );
};

export default Areachart;
