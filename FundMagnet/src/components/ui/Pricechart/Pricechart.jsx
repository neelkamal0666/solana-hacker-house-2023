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
import axios from "axios";

const cardinal = curveCardinal.tension(0.2);

const Pricechart = ({ id }) => {
  const [prices, setPrices] = useState([]);
  const [minMax, setMinMax] = useState([]);
  const [chartLoading, setChartLoading] = useState(false);
  const appCtx = useSelector((state) => state.app);

  const [aspectRatio, setAspectRatio] = useState(1);

  useEffect(() => {
    setChartLoading(true);

    let config = {
      method: "get",
      url: `${process.env.REACT_APP_URL_BLOCKCHAIN_SERVICE}/crypto/basket/${id}/price/history`,
      headers: {
        ...(appCtx.authToken
          ? { "X-Auth-Token": appCtx.authToken }
          : { "X-App-Token": process.env.REACT_APP_X_APP_TOKEN }),
      },
    };

    axios
      .request(config)
      .then((response) => {
        setPrices(response.data);
        setChartLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    let min = prices?.length > 0 ? prices[0]["price"] : 0;
    let max = prices?.length > 0 ? prices[0]["price"] : 0;

    for (let i = 1; i < prices?.length; i++) {
      const price = prices[i]["price"];
      if (price < min) {
        min = price;
      }
      if (price > max) {
        max = price;
      }
    }
    setMinMax([min, max]);
  }, [prices]);

  console.log("minmax", minMax);

  const data = prices?.map((price) => ({
    date: moment(price["date"]).format("M/D/YYYY"),
    price: price["price"],
  }));

  const tickFormatter = (date) => moment(date).format("M/D/YYYY");

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
              left: 25,
              bottom: 50,
            }}
          >
            <CartesianGrid horizontal="true" vertical="" />
            <XAxis
              dataKey={"date"}
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
              stroke="#28B463"
              fill="#28B463"
              fillOpacity={0.6}
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

export default Pricechart;
