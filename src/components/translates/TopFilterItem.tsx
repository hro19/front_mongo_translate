import React from "react";
import { useAtom } from "jotai";
import {
  openIndexesAtom,
} from "../../jotai/translatesAtoms";

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
            className={`w-full bg-green-300 px-4 py-2 mt-1 font-bold cursor-pointer`}
          >
            {post.enContent}
          </div>
          <span
            className={`absolute right-4 transform transition-transform ${
              openIndexes.includes(index) ? "rotate-180" : ""
            }`}
          >
            &#9660;
          </span>
        </div>
        {openIndexes.includes(index) && (
          <p className="px-4 py-2 mb-1 bg-gray-200">{post.jaContent}</p>
        )}
      </div>
    </div>
  );
};

export default TopFilterItem;
