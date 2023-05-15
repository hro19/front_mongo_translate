import React from "react";
import axios from "axios";
import { useQuery } from "react-query";

const All = () => {
  const fetchTranslates = async () => {
    const response = await axios.get(
      "https://back-mongo-translate.vercel.app/api/v1/translates"
    );
    return response.data;
  };

  const { data, isLoading, isError, error } = useQuery<
    any, // データの型
    Error // エラーの型
  >("translates", fetchTranslates);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <div>
      {data.map((translate: any) => (
        <div key={translate._id}>
          <p>日本語: {translate.ja_content}</p>
          <p>英語: {translate.en_content}</p>
          <p>作成日時: {translate.created_at}</p>
        </div>
      ))}
    </div>
  );
};

export default All;
