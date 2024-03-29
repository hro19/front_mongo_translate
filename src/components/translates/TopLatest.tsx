import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import TopFilter from "./TopFilter";
import TopSkeleton from "./TopSkeleton";
import { Translate } from "@/ts/Translate";

const TopLatest = () => {

  const fetchTranslates = async () => {
    const response = await axios.get(
      "https://back-mongo-translate.vercel.app/api/v1/translates"
    );
    return response.data;
  };

  const { data, isLoading, isError, error } = useQuery<Translate[],Error>("translates",fetchTranslates);

  //ローディング時にスケルトンにて対応
  if (isLoading) {
    return (
      <TopSkeleton />
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mx-4 pt-24">
        <TopFilter data={data} />
    </div>
  );
};

export default TopLatest;
