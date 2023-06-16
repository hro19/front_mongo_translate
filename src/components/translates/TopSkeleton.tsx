import React from 'react';
import { Skeleton } from "@mui/material";


const TopSkeleton = () => {
  const skeletonItems = [];

  for (let i = 0; i < 16; i++) {
    skeletonItems.push(
      <p className="pb-1">
        <Skeleton
          key={i}
          animation="wave"
          variant="rectangular"
          height={40}
        />
      </p>
    );
  }

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
      {skeletonItems}
    </div>
  );
}

export default TopSkeleton
