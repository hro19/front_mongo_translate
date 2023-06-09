import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Densya = () => {
const [count, setCount] = useState(0);
  const [stepSize, setStepSize] = useState(0);
  const tatalStep = 5;

  const handleCount = () => {
    if (count < tatalStep) {
      setCount(count + 1);
    }
  };

  const densyaVariants = {
    initial: { x: "-20%" },
    animate: { x: `calc(${count} * ${stepSize}% - 100%)` },
  };

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setStepSize(screenWidth / tatalStep);
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
        className="bg-no-repeat bg-contain w-[100px] h-[100px] absolute top-[73px] right-[20px] z-10"
      ></div>
      <div
        style={{ backgroundImage: "url(/senro.png)" }}
        className="h-[100px] relative bg-repeat-x"
      >
        <motion.div
          style={{ backgroundImage: "url(/densya.png)" }}
          className="bg-no-repeat bg-contain w-[100px] h-[100px] absolute bottom-[44px] left-[-80px] z-20"
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
