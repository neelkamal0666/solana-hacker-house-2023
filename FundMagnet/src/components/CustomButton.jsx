import React from "react";

function CustomButton({ onClick, child, type, className, primary, ...props }) {
  return (
    <button
      {...props}
      onClick={onClick}
      type={type}
      className={`rounded-full h-[40px] flex justify-center items-center py-2 px-4 ease-in-out duration-300 ${className} ${
        primary
          ? "bg-black text-lime-500 hover:bg-lime-500 hover:text-black border border-lime-500"
          : " bg-white text-black border border-yellow-400 hover:bg-black hover:text-white"
      }`}
    >
      {child}
      {props.children}
    </button>
  );
}

export default CustomButton;
