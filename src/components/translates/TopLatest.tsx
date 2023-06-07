import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Translate } from "../../ts/Translate";

const TopLatest = () => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const fetchTranslates = async () => {
    const response = await axios.get(
      "https://back-mongo-translate.vercel.app/api/v1/translates"
    );
    return response.data;
  };

  const { data, isLoading, isError, error } = useQuery<any, Error>(
    "translates",
    fetchTranslates,
    {
      onSuccess: (data) => {
        // setShowPosts(data);
      },
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const toggleOpenIndex = (index: number) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  return (
    <div className="mx-4 pt-24">
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
    </div>
  );
};

export default TopLatest;
