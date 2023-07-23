import React from "react";
import { Skeleton } from "@mui/material";

const TopSkeleton = () => {
  return (
    <div className="mt-24">
      <p className="flex pb-4">
        <span className="pr-2">
          <Skeleton variant="circular" width={40} height={40} />
        </span>
        <span className="pr-2">
          <Skeleton variant="rectangular" width={110} height={40} />
        </span>
        <span className="pr-2">
          <Skeleton variant="circular" width={40} height={40} />
        </span>
        <span className="pr-2">
          <Skeleton variant="rectangular" width={110} height={40} />
        </span>
        <span className="pr-2">
          <Skeleton variant="circular" width={40} height={40} />
        </span>
        <span className="pr-2">
          <Skeleton variant="rectangular" width={110} height={40} />
        </span>
      </p>
      {[...Array(16)].map((_, i) => (
        <p className="pb-1" key={i}>
          <Skeleton animation="wave" variant="rectangular" height={40} />
        </p>
      ))}
    </div>
  );
};

export default TopSkeleton;
