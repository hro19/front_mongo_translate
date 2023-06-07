import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import TopFilter from "./TopFilter";

const TopLatest = () => {

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

  return (
    <div className="mx-4 pt-24">
        <TopFilter data={data} />
    </div>
  );
};

export default TopLatest;
