import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import NewsItem from "./NewsItem";
import React from "react";
import useHttp from "../../../hooks/use-http";
import AssetPulse from "./AssetPulse";

const NewsDisplay = (props) => {
  const [news, setNews] = useState([]);
  const makeRequest = useHttp();

  useEffect(() => {
    makeRequest(
      {
        url: `https://bing-news-search1.p.rapidapi.com/news/search?q=Cryptocurrency&safeSearch=Off&textFormat=Raw&freshness=Day&count=9`,
        headers: {
          "X-RapidAPI-Key":
            "3281daaa4dmsh25e95de531eee53p151389jsn13bf426b2653",
          "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
          "X-BingApis-SDK": true,
        },
      },
      (data) => {
        setNews(data.value);
      },
      (data) => {
        toast.error("something went wrong");
      },
      () => {}
    );
  }, [makeRequest]);

  return (
    <div
      className={`${props.className}  text-gray-800 grid grid-cols-1 gap-y-10 my-5 `}
    >
      <div>
        <p className="text-2xl  mb-5">Trending news</p>
        <p className="text-base   ">Catch the latest news in the market</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-5">
        {news.length === 0 && (
          <div className="grid grid-cols-3 lg:col-span-3 md:col-span-2 col-span-1 gap-10">
            <AssetPulse />
            <AssetPulse />
            <AssetPulse />
            <AssetPulse />
            <AssetPulse />
          </div>
        )}
        {news.length !== 0 &&
          news.map((news) => <NewsItem key={news.uuid} news={news} />)}
      </div>
    </div>
  );
};

export default NewsDisplay;
