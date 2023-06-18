import React from "react";
import { AiOutlineDownCircle } from "react-icons/ai";

const TopFilterItem = ({ post}: any) => {
  return (
    <div key={post._id}>
      <div className="card">
        <div className="collapse bg-base-200 mb-2 text-white">
          <input type="checkbox" className="peer" />
          <div className="collapse-title text-2xl text-gray-950 rounded-2xl border border-lime-500 [input:checked~&]:bg-lime-500 [input:checked~&]:text-white [input:checked~&]:border-gray-100 [input:checked~&]:border-b-0 [input:checked~&]:rounded-none">
            {post.enContent}
            <span className="absolute right-4 transform transition-transform">
              <AiOutlineDownCircle
                className="icon inline-block"
                size="1.7rem"
              />
            </span>
          </div>
          <div className="collapse-content bg-orange-500 border border-gray-300 border-t-0">
            <p className="pt-2">{post.jaContent}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopFilterItem;
