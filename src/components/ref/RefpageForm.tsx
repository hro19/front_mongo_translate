import React, { useRef } from "react";

const RefpageForm = ({ refElement }:any) => {

  return (
    <>
      <div className="bg-green-400">
        子コンポーネントのです。
        <br />
        子コンポーネントのです。
        <br />
        子コンポーネントのです。
        <br />
      </div>
      <div className="bg-purple-400" ref={refElement}>
        ここの幅を知りたい
        <br />
        ここの幅を知りたい
        <br />
        ここの幅を知りたい
        <br />
        ここの幅を知りたい
      </div>
    </>
  );
};

export default RefpageForm;
