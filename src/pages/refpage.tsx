import React, { useEffect, useRef } from "react";
import RefpageForm from "../components/ref/RefpageForm";

const Refpage = () => {
  const refElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (refElement.current) {
      console.log("要素の幅:", refElement.current.clientWidth);
    }
  }, []);

  return (
    <div>
      <h1>ref実験</h1>
      <p>親コンポーネントです</p>
      <p>親コンポーネントです</p>
      <p>親コンポーネントです</p>
      <RefpageForm refElement={refElement} />
    </div>
  );
};

export default Refpage;
