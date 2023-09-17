import React, { useState } from "react";
import { Link } from "react-scroll";

const Footer = () => {
  const [email, setEmail] = useState("");
  return (
    <div className="bg-[#1A2B6D] text-white ">
      <p className="text-3xl font-bold text-center pt-20 pb-10">
        Stay Ahead in a Rapidly Changing World
      </p>
      <p className="text-xl font-semibold text-center pb-10">
        Sign up for our newsletter
      </p>
      <div className="w-[50%] mx-auto bg-[#203481] p-10 rounded-3xl ">
        <p className="font-semibold ml-[8%] mb-2">Enter your email address</p>
        <div className="flex flex-row justify-center items-center gap-5">
          <div className="w-[70%] ">
            <input
              className=" w-[100%] px-3 py-3  rounded-full bg-white	text-black placeholder-indigo-500	  shadow-sm focus:outline-none "
              placeholder="e.g, name@example.com"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-[20%]">
            <button
              type="submit"
              className="rounded-full  px-10  py-3   transition duration-150 ease-in-out bg-white text-blue-700 font-semibold hover:text-white hover:bg-[#5272f5] "
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div>
        <p className="text-3xl text-center font-semibold pt-14 ">Contact Us</p>
      </div>

      <div className="flex flex-row gap-3 justify-center py-10">
        <a href="https://discord.com/invite/7GaSxew48h" target="_blank">
          <img src="/images/discord.jpg" alt="" />
        </a>
        <a href="https://www.facebook.com/onnftverse">
          <img src="/images/fb.jpg" alt="" />
        </a>
        <a href="https://www.instagram.com/_nftverse/">
          <img src="/images/insta.jpg" alt="" />
        </a>
        <a href="https://twitter.com/onnftverse?s=20&t=d9xAcEQONstJWodcG-8sUA">
          <img src="/images/twitter.jpg" alt="" />
        </a>
        <a href="https://in.linkedin.com/company/nexttales">
          <img src="/images/linkedin.jpg" alt="" />
        </a>
        <a href="">
          <img src="/images/studio.jpg" alt="" />
        </a>
      </div>
      <p className="text-center pb-20">Copyright © 2023, NFTVERSE</p>
    </div>
  );
};

export default Footer;
