import React, { useState } from "react";
import { Translate } from "../../ts/Translate";

const TopFilter = ({ data }: any) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [pageSize, setPageSize] = useState<number>(10);

  const toggleOpenIndex = (index: number) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSortOrder = event.target.value as "asc" | "desc";
    setSortOrder(selectedSortOrder);
  };

  const handlePageSizeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedPageSize = Number(event.target.value);
    setPageSize(selectedPageSize);
  };

  const sortedData = data.sort((a: Translate, b: Translate) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
  });

  const slicedData = sortedData.slice(0, pageSize);

  return (
    <>
      <div className="mb-4">
        <label htmlFor="sortOrder" className="mr-2">
          Sort Order:
        </label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={handleSortChange}
          className="border border-gray-300 px-2 py-1 mr-4"
        >
          <option value="desc">降順</option>
          <option value="asc">昇順</option>
        </select>
        <label htmlFor="pageSize" className="mr-2">
          表示件数:
        </label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={handlePageSizeChange}
          className="border border-gray-300 px-2 py-1"
        >
          <option value={10}>10件</option>
          <option value={20}>20件</option>
          <option value={30}>30件</option>
        </select>
      </div>
      {slicedData.map((post: Translate, index: number) => (
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
