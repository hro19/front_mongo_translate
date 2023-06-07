import React, { useState } from "react";
import { Translate } from "../../ts/Translate";

const TopFilter = ({ data }: any) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);
  const toggleOpenIndex = (index: number) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  return (
    <>
      {data.map((post: Translate, index: number) => (
        <div key={post._id}>
          <div className="card">
            <div
              className="flex items-center justify-between"
              onClick={() => toggleOpenIndex(index)}
            >
              <div
                className={`w-full bg-gray-200 px-4 py-2 mb-1 font-bold cursor-pointer ${
                  openIndexes.includes(index) ? "bg-indigo-800 text-white" : ""
                }`}
              >
                {post.enContent}
              </div>
              <span
                className={`transform transition-transform ${
                  openIndexes.includes(index) ? "rotate-180" : ""
                }`}
              >
                &#9660;
              </span>
            </div>
            {openIndexes.includes(index) && (
              <p className="px-4 py-2">{post.jaContent}</p>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default TopFilter;
