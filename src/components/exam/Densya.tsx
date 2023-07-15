import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Transition } from "react-transition-group";
import { useAtom } from "jotai";
import { HOWManyLesson,quizListCountAtom, gamenAtom } from "../../jotai/examsAtoms";

const EncorageMsg: string[] = [
  "成功の反対は失敗ではなく「やらないこと」だ",
  "君が弱ェワケはねェんだよ……この問題が難しすぎるんだ!!!",
  "小さなことを積み重ねることが、とんでもないところへ行くただ一つの道",
  "自信は持てど、過信はするな",
];

const Densya = () => {
  const [quizListCount, setQuizListCount] = useAtom(quizListCountAtom);
  const [gamen, setGamen] = useAtom(gamenAtom);
  const [onOff, setOnOff] = useState<boolean>(false);
  const [randomText, setRandomText] = useState<string>("");
  const [stepSize, setStepSize] = useState<number>(0);

  const appearMsg = () => {
    setRandomText(EncorageMsg[Math.floor(Math.random() * EncorageMsg.length)]);
    setOnOff(true);
    setTimeout(() => {
      setOnOff(false);
    }, 3500);
  };

  const densyaVariants = {
    initial: { x: "-20%" },
    animate: { x: `calc(${quizListCount} * ${stepSize}% - 100%)` },
  };

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setStepSize(screenWidth / HOWManyLesson);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (quizListCount !== 0 && gamen === "answer") {
      appearMsg();
    }
  }, [gamen]);

  return (
    <div className="mt-24">
      <div
        style={{ backgroundImage: "url(/senro.png)" }}
        className="h-[100px] relative bg-repeat-x"
      >
        <div
          style={{ backgroundImage: "url(/station.png)" }}
          className="bg-no-repeat bg-contain w-[100px] h-[100px] absolute bottom-[73px] right-[20px] z-10"
        ></div>

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
                  ...(quizListCount <= 2
                    ? { left: "calc(100% + 10px)" }
                    : { right: "calc(100% + 10px)" }),
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
                <i
                  className={`absolute bottom-5 ${
                    quizListCount <= 2 ? "left-[-4px]" : "right-[-4px]"
                  } w-4 h-4 bg-yellow-600 transform rotate-45`}
                ></i>
              </div>
            )}
          </Transition>
        </motion.div>
      </div>
    </div>
  );
};

export default Densya;
