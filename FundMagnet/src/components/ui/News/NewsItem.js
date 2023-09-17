import React from "react";

const NewsItem = (props) => {
  const n = props.news;

  return (
    <div
      onClick={() => window.open(n.url)}
      className="group h-[330px] bg-slate-400  rounded-lg flex flex-col hover:-translate-y-2 transition-all ease-out duration-300 hover:shadow-xl cursor-pointer"
    >
      <div className={`h-[200px] rounded-t-lg `}>
        <img
          src={n.image ? n.image.thumbnail.contentUrl : ""}
          className="w-full h-[200px] rounded-t-lg"
          alt="Thumbnail"
        />
      </div>
      <div className="px-5 py-2 grid grow">
        <div className="  text-left">
          {n.name.length > 40 ? `${n.name.substring(0, 40)}...` : n.name}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex flex-row gap-3 max-w-[80%] overflow-hidden">
            {n.provider[0].image && (
              <img
                width={25}
                src={n.provider[0].image.thumbnail.contentUrl}
                alt="P"
              />
            )}
            <div className="">{n.provider[0].name}</div>
          </div>
          <div className="text-right text-base">
            {new Date(n.datePublished).toLocaleDateString("en-IN", {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
