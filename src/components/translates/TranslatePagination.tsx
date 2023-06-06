import React from 'react';
import { Pagination } from "@mui/material";
import { useAtom } from "jotai";
import {
  showPostsAtom,
  currentPageAtom,
  itemsPerPageAtom,
} from "../../jotai/translatesAtoms";

const TranslatePagination = () => {

  const [showPosts, setShowPosts] = useAtom(showPostsAtom);
  //ページング設定
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [itemsPerPage, setTtemsPerPage] = useAtom(itemsPerPageAtom);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex justify-center mt-4">
      <Pagination
        count={Math.ceil(showPosts.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        sx={{
          "& .MuiPaginationItem-root": {
            backgroundColor: "#aaaaaa",
            color: "white",
            "&:hover": {
              backgroundColor: "#444444",
            },
            "&.Mui-selected": {
              backgroundColor: "#444444",
            },
          },
        }}
      />
    </div>
  );
};

export default TranslatePagination
