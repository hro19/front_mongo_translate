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

  const { data, isLoading, isError, error } = useQuery<any, Error>(
    "translates",
    fetchTranslates
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
      <div>
          <h1 className="text-center text-3xl text-cyan-500">全ての翻訳データ</h1>
      {data.map((translate: any, index: number) => (
        <div key={translate._id} className="border-b border-bp mb-2 pb-2 b-4">
          <h2 className="text-sm font-bold text-green-700">
            作成日時: {translate.created_at}
          </h2>
        <div className="grid grid-cols-2 gap-4">
            <p className="border rounded-lg p-2 bg-blue-100 text-left">
              {translate.ja_content}
            </p>
            <p className="border rounded-lg p-2 bg-pink-100 text-left">
              {translate.en_content}
            </p>
          </div>
        </div>
      ))}
        </div>
  );
};

export default All;
