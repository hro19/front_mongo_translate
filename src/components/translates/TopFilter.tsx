import React, { useState } from "react";
import { Translate } from "../../ts/Translate";
import { useAtom } from "jotai";
import {
  sortOrderAtom,
  pageSizeAtom,
  filterOptionAtom,
} from "../../jotai/translatesAtoms";
import TopFilterItem from "./TopFilterItem";

const TopFilter = ({ data }: any) => {
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom);
  const [pageSize, setPageSize] = useAtom(pageSizeAtom);
  const [filterOption, setFilterOption] = useAtom(filterOptionAtom);



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

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFilterOption = event.target.value as
      | "default"
      | "long"
      | "medium"
      | "short";
    setFilterOption(selectedFilterOption);
  };

  const sortedData = data.sort((a: Translate, b: Translate) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
  });

  let filteredData: Translate[] = sortedData;
  if (filterOption === "long") {
    filteredData = sortedData.filter(
      (post: Translate) => post.enContent.split(" ").length >= 8
    );
  } else if (filterOption === "medium") {
    filteredData = sortedData.filter((post: Translate) => {
      const wordCount = post.enContent.split(" ").length;
      return wordCount >= 4 && wordCount <= 7;
    });
  } else if (filterOption === "short") {
    filteredData = sortedData.filter(
      (post: Translate) => post.enContent.split(" ").length <= 3
    );
  }

  const slicedData = filteredData.slice(0, pageSize);

  return (
    <>
      <div className="mb-4">
        <label htmlFor="sortOrder" className="mr-2">
          ソート:
        </label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={handleSortChange}
          className="select select-accent mr-2 bg-white"
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
          className="select select-accent mr-2 bg-white"
        >
          <option value={10}>10件</option>
          <option value={20}>20件</option>
          <option value={30}>30件</option>
          <option value={data.length}>全件</option>
        </select>
        <label htmlFor="filterOption" className="mr-2">
          フィルターオプション:
        </label>
        <select
          id="filterOption"
          value={filterOption}
          onChange={handleFilterChange}
          className="select select-accent mr-2 bg-white"
        >
          <option value="default">全て</option>
          <option value="long">長文</option>
          <option value="medium">中文</option>
          <option value="short">短文</option>
        </select>
      </div>
      {slicedData.map((post: Translate) => (
        <TopFilterItem key={post._id} post={post} />
      ))}
    </>
  );
};
export default TopFilter;