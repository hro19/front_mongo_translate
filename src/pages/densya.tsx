import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Densya = () => {
const [count, setCount] = useState(1);
  const [stepSize, setStepSize] = useState(0);

  const handleCount = () => {
    if (count < 10) {
      setCount(count + 1);
    }
  };

  const densyaVariants = {
    initial: { x: "0%" },
    animate: { x: `calc(${count} * ${stepSize}% - 100%)` },
  };

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setStepSize(screenWidth / 10);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="mt-24">
      <div
        style={{ backgroundImage: "url(/station.png)" }}
        className="bg-no-repeat bg-contain w-[100px] h-[100px] absolute top-[31px] right-[0px] z-10"
      ></div>
      <div
        style={{ backgroundImage: "url(/senro.png)" }}
        className="h-[100px] relative bg-repeat-x"
      >
        <motion.div
          style={{ backgroundImage: "url(/densya.png)" }}
          className="bg-no-repeat bg-contain w-[100px] h-[100px] absolute bottom-[44px] z-20"
          variants={densyaVariants}
          initial="initial"
          animate="animate"
        ></motion.div>
      </div>
      <button onClick={handleCount} className="btn mb-2 btn-accent text-white ml-2">
        カウント
      </button>
    </div>
  );
};

export default Densya;
