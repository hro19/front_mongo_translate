import React from "react";
import BounceLoader from "react-spinners/BounceLoader";

const Loading = () => {
  return (
    <>
      <div className="flex justify-center my-4">
        <BounceLoader color="#43B916" />
      </div>
    </>
  );
};

export default Loading;
