import React, { useEffect } from "react";
import { Skeleton } from "@mui/material";
import { Link } from "react-router-dom";
import { useCryptolens } from "../../hooks/useCryptolens";

const Update = () => {
  const { content, postloading, fetchPostContent } = useCryptolens();
  useEffect(() => {
    fetchPostContent();
  }, []);
  return (
    <div className="">
      <h2 className="font-medium pt-10 w-[90%]"> </h2>
      <div>
        <p className="text-2xl  mb-5"> Crypto Lens Updates</p>
      </div>

      <div className="w-[100%] mx-auto flex flex-row gap-5 flex-wrap  py-10">
        {postloading
          ? Array.from({ length: 3 }, (_, index) => (
              <div key={index} className="flex flex-col w-[30%]">
                <Skeleton variant="rectangular" height={150} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              </div>
            ))
          : content &&
            content.map((item) => (
              <Link
                to={`/cryptolens_updates/${item.postId}`}
                className="w-[90%] md:w-[30%] mx-auto md:mx-0  no-underline rounded-2xl overflow-hidden shadow-lg bg-slate-400 text-black"
              >
                <img
                  className="w-full"
                  src={item.coverImage}
                  alt="Cover Image"
                />
                <div className="px-6 py-4">
                  <p className=" text-base">{item.title}</p>
                </div>
                <div className="px-6 pt-3 pb-2">
                  <span className="inline-block   rounded-full px-3 py-1 text-sm font-semibold mr-2 pb-2">
                    #{item?.category}
                  </span>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default Update;
