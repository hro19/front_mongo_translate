import React, { useState } from "react";
import { Transition } from "react-transition-group";

const Tran = () => {
  const [onOff, setOnOff] = useState(false);

  const toggleHandler = () => {
    setOnOff((prevOnOff) => !prevOnOff);
  };

  return (
    <div className="container">
      <h1>アニメーション</h1>
      <div className="btn-container">
        <div className="btn btn-primary mr-1" onClick={toggleHandler}>
          {onOff ? "スイッチオフ" : "スイッチオン"}
        </div>
      </div>
      <Transition in={onOff} timeout={500} mountOnEnter unmountOnExit>
        {(state) => (
          <div
            style={{
              width: "100px",
              height: "100px",
              margin: "auto",
              backgroundColor: "#f1c70e",
              transition: "opacity 0.3s ease-in",
              opacity: state === "entered" ? 1 : 0,
            }}
          ></div>
        )}
      </Transition>
    </div>
  );
};

export default Tran;
