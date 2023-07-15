import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Transition } from "react-transition-group";
import styles from "./densya.module.css";

const EncorageMsg: string[] = [
  "成功の反対は失敗ではなく「やらないこと」だ",
  "君が弱ェワケはねェんだよ……この問題が難しすぎるんだ!!!",
  "小さなことを積み重ねることが、とんでもないところへ行くただ一つの道",
  "自信は持てど、過信はするな",
];

const Densya = () => {
  const [count, setCount] = useState(0);
  const [isJadge, setIsJadge] = useState<boolean | null>(false);
  const [onOff, setOnOff] = useState<boolean>(false);
  const [randomText, setRandomText] = useState<string>("");
  const [stepSize, setStepSize] = useState<number>(0);
  const totalStep = 5;

  const handleCount = () => {
    if (count < totalStep) {
      setCount(count + 1);
      appearMsg();
    }
  };

  const appearMsg = () => {
    setRandomText(EncorageMsg[Math.floor(Math.random() * EncorageMsg.length)]);
    setOnOff(true);
    setTimeout(() => {
      setOnOff(false);
    }, 3500);
  };

  const densyaVariants = {
    initial: { x: "-20%" },
    animate: { x: `calc(${count} * ${stepSize}% - 100%)` },
  };

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setStepSize(screenWidth / totalStep);
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
          className="bg-no-repeat bg-contain w-[100px] h-[100px] absolute bottom-[44px] left-[-80px] z-20"
          style={{ backgroundImage: "url(/densya.png)" }}
          variants={densyaVariants}
          initial="initial"
          animate="animate"
        >
          <Transition in={onOff} timeout={500} mountOnEnter unmountOnExit>
            {(state) => (
              <div
                style={{
                  position: "absolute",
                  top: "-10px",
                  right: "calc(100% + 10px)",
                  minWidth: "160px",
                  maxWidth: "200px",
                  overflowWrap: "break-word",
                  color: "#ffffff",
                  padding: "10px 20px",
                  borderRadius: "14px",
                  backgroundColor: "#CA8A04",
                  transition: "opacity 0.3s ease-in",
                  opacity: state === "entered" ? 1 : 0,
                }}
              >
                {randomText}
                <i className="absolute bottom-5 right-[-4px] w-4 h-4 bg-yellow-600 transform rotate-45"></i>
              </div>
            )}
          </Transition>
        </motion.div>
      </div>
      <button onClick={handleCount} className="btn mb-2 btn-accent text-white ml-2">
        カウント
      </button>
    </div>
  );
};

export default Densya;
