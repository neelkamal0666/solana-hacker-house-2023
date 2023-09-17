import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const Piechart = ({ tokenPercentArray, tokenArray }) => {
  const [chartData, setChartData] = useState({
    series: tokenPercentArray,
    options: {
      chart: {
        type: "pie",
      },
      labels: tokenArray,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: "100%",
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  return (
    <div id="chart">
      <ReactApexChart
        options={chartData.options}
        series={chartData.series}
        type="pie"
        width={400} // set a default width for large devices
      />
    </div>
  );
};

export default Piechart;
