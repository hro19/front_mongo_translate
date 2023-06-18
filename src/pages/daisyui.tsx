import React from "react";
import { AiOutlineDownCircle } from "react-icons/ai";

const DaisyUI = () => {
  return (
    <div className="my-4 mx-2">
      <button className="btn mb-2">Hello daisyUI</button>
      <div className="collapse bg-base-200 mb-2 text-white">
        <input type="checkbox" className="peer" />
        <div className="collapse-title bg-lime-600 [input:checked~&]:bg-lime-500 border border-b-0 border-gray-100">
          Click me to show/hide content
          <span className="absolute right-4 transform transition-transform">
            <AiOutlineDownCircle
              className="icon text-white inline-block"
              size="1.7rem"
            />
          </span>
        </div>
        <div className="collapse-content  bg-orange-500 border border-t-0 border-gray-300">
          <p className="pt-2">hello</p>
        </div>
      </div>
    </div>
  );
};

export default DaisyUI;
