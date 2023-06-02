import React from 'react';
import { Pagination } from "@mui/material";

const TranslatePagination = ({
  setCurrentPage,
  showPosts,
  currentPage,
  itemsPerPage
}: any) => {
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
