import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Skeleton } from "@mui/material";

const CryptoLensArticleDetails = () => {
  const [content, setContent] = useState({});
  const [postloading, setPostLoading] = useState(false);

  const appCtx = useSelector((state) => state.app);

  const { id } = useParams();

  useEffect(() => {
    // fetching post content
    setPostLoading(true);
    const config = {
      method: "get",
      url: `${process.env.REACT_APP_URL_MARKETPLACE_SERVICE}/crypto/lens/post/list`,
      headers: {
        "X-Auth-Token": appCtx.authToken,
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then((response) => {
        const post = response.data.content.find((item) => item?.postId == id);
        console.log("logging post", post);
        setContent(post);
        setPostLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setPostLoading(false);
      });
  }, []);

  return (
    <div className="w-[100%] text-white">
      {postloading ? (
        <div className="pt-[5%] w-[80%] mx-auto">
          <Skeleton
            variant="text"
            sx={{ fontSize: "2rem" }}
            className="w-[80%] mx-auto"
          />
          <Skeleton
            variant="text"
            sx={{ fontSize: "2rem" }}
            className="w-[80%] mx-auto"
          />

          <Skeleton
            variant="text"
            sx={{ fontSize: "1rem" }}
            className="w-[60%] mx-auto mt-3"
          />

          <Skeleton
            variant="rectangular"
            height={300}
            className="w-[70%] mx-auto mt-5"
          />
          <Skeleton
            variant="text"
            sx={{ fontSize: "1rem" }}
            className="w-[60%] mx-auto mt-3"
          />
          <Skeleton
            variant="text"
            sx={{ fontSize: "1rem" }}
            className="w-[60%] mx-auto "
          />
          <Skeleton
            variant="text"
            sx={{ fontSize: "1rem" }}
            className="w-[60%] mx-auto "
          />
          <Skeleton
            variant="text"
            sx={{ fontSize: "1rem" }}
            className="w-[60%] mx-auto "
          />
          <Skeleton
            variant="text"
            sx={{ fontSize: "1rem" }}
            className="w-[60%] mx-auto "
          />
          <Skeleton
            variant="text"
            sx={{ fontSize: "1rem" }}
            className="w-[60%] mx-auto "
          />
          <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
        </div>
      ) : (
        <div className="text-white mt-[-3%] pt-[5%] pb-[5%] w-[90%] md:w-[80%] mx-auto">
          <h1 className=" text-5xl text-left md:text-center font-bold my-10">
            {content?.title}
          </h1>
          <div
            dangerouslySetInnerHTML={{ __html: content?.summary }}
            className="text-left md:text-center"
          />

          <img
            src={content?.coverImage}
            alt="Cover image"
            className="w-[90%] md:w-[60%] my-8 mx-auto"
          />

          <div
            dangerouslySetInnerHTML={{ __html: content?.description }}
            className="w-[90%] md:w-[60%] mx-auto"
          />

          <p className="w-[90%] md:w-[60%] mx-auto">
            {" "}
            category: {content?.category}
          </p>
        </div>
      )}
    </div>
  );
};

export default CryptoLensArticleDetails;
