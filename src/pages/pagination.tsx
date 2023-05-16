import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Pagination } from "@mui/material";
import { formatDate } from "../components/translates/Honyaku";

const fetchTranslates = async () => {
  const response = await axios.get(
    "https://back-mongo-translate.vercel.app/api/v1/translates"
  );
  return response.data;
};

const MuiTable = () => {
  const { data, isLoading, isError, error } = useQuery<any, Error>(
    "translates",
    fetchTranslates
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  // ページネーション用のデータを取得
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // ページ変更時の処理
  const handleChangePage = (event:any, page:any) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {currentItems.map((translate: any, index: number) => (
        <div key={translate._id} className="border-b border-bp mb-2 pb-2 b-4">
          <h2 className="text-sm font-bold text-green-700">
            作成日【{formatDate(translate.created_at)}】
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="border rounded-lg p-2 bg-blue-100 text-left">
                {translate.jaContent}
              </p>
            </div>
            <div>
              <p className="border rounded-lg p-2 bg-pink-100 text-left">
                {translate.enContent}
              </p>
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-center">
        <Pagination
          count={Math.ceil(data.length / itemsPerPage)}
          page={currentPage}
          onChange={handleChangePage}
          sx={{
            "& .MuiPaginationItem-root": {
              backgroundColor: "lightblue",
              color: "white",
              "&:hover": {
                backgroundColor: "#2C5AFF",
              },
              "&.Mui-selected": {
                backgroundColor: "#2C5AFF",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default MuiTable;
