import React, { useState } from "react";
import { PopUpComponent } from "@/components/PopUpComponent";

const Popup = () => {
      const [popupFlag, setPopupFlag] = useState<boolean>(false);
  return (
    <>
      <section className="">
        <button
          onClick={() => setPopupFlag(true)}
          className="border-spacing-2.5"
        >
          ポップアップ表示
        </button>
        <PopUpComponent viewFlag={popupFlag} setViewFlag={setPopupFlag} />
      </section>
    </>
  );
}

export default Popup
