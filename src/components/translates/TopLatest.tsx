import React, { useState } from "react";
import axios from "axios";
import { Skeleton } from "@mui/material";
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

  //ローディング時にスケルトンにて対応
  if (isLoading) {
    const skeletonItems = [];

    for (let i = 0; i < 16; i++) {
      skeletonItems.push(<Skeleton key={i} animation="wave" height={40} />);
    }

    return <div>{skeletonItems}</div>;
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
