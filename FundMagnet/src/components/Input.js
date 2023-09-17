import React from "react"

const Input = ({className,...props}) => {
    return (
        <div className=" flex flex-col gap-1">
            <label className="text-lg font-semibold  text-gray-700">{props.header}</label>
            <label className="text-base  font-bold">{props.description}</label>
            {props.type === 'textarea' ? (
                <textarea
                   {...props}
                    className={`disabled:text-gray-500 border-gray-300 border rounded-lg  bg-white hover:bg-slate-100 disabled:cursor-not-allowed disabled:hover:bg-slate-100  transition-all ease-out duration-300 p-3 py-2  focus:border-secPurple outline-none ${className}`}
                    placeholder={props.placeholder}
                />
            ) : (
                <input
                   {...props}
                    className={`disabled:text-gray-500  border border-gray-300 rounded-lg  bg-slate-white hover:bg-slate-100 disabled:cursor-not-allowed disabled:hover:bg-slate-100  transition-all ease-out duration-300 p-3 py-2 focus:border-secPurple outline-none ${className}`}
                />
            )}
        </div>
    );
};

export default Input;
