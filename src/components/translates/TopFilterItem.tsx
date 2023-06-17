import React from "react";
import { useAtom } from "jotai";
import {openIndexesAtom} from "../../jotai/translatesAtoms";
import { AiOutlineDownCircle } from "react-icons/ai";

const TopFilterItem = ({ post, index }: any) => {
    const [openIndexes, setOpenIndexes] = useAtom(openIndexesAtom);
    
    const toggleOpenIndex = (index: number) => {
        if (openIndexes.includes(index)) {
            setOpenIndexes(openIndexes.filter((i) => i !== index));
        } else {
            setOpenIndexes([...openIndexes, index]);
        }
    };

  return (
    <div key={post._id}>
      <div className="card">
        <div
          className="relative flex items-center justify-between"
          onClick={() => toggleOpenIndex(index)}
        >
          <div
            className={`w-full bg-green-300 border border-gray-200 rounded-xl px-4 py-2 mt-1 font-bold cursor-pointer`}
          >
            {post.enContent}
          </div>
          <span
            className={`absolute right-4 transform transition-transform ${
              openIndexes.includes(index) ? "-rotate-90" : ""
            }`}
          >
            <AiOutlineDownCircle
              className="icon text-white inline-block"
              size="1.7rem"
            />
          </span>
        </div>
        {openIndexes.includes(index) && (
          <p className="px-4 py-2 mb-1  border border-gray-200 bg-gray-200 rounded-xl">
            {post.jaContent}
          </p>
        )}
      </div>
    </div>
  );
};

export default TopFilterItem;
