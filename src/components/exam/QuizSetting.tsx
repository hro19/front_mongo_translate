import React, { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { gamenAtom } from "../../jotai/examsAtoms";

const QuizSetting = () => {
  const [gamen, setGamen] = useAtom(gamenAtom);
  const isLoggedRef = useRef(false);

  useEffect(() => {
    if (!isLoggedRef.current) {
      console.log("クイズセッティング");
      console.log(gamen);
      isLoggedRef.current = true;
    }
  }, []);

  return <></>;
};

export default QuizSetting;
