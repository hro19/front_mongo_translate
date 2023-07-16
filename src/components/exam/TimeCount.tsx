import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./TimeCount.module.css";
import { useAtom } from "jotai";
import { gamenAtom, isTimeZeroAtom, remainingTimeAtom } from "../../jotai/examsAtoms";

function TimeCount() {
  const [gamen, setGamen] = useAtom(gamenAtom);
  const [isTimeZero, setIsTimeZero] = useAtom(isTimeZeroAtom);

  const [remainingTime, setRemainingTime] = useAtom(remainingTimeAtom);

useEffect(() => {
  if (gamen === "question") {
    let Timer = remainingTime;

    const countdownInterval = setInterval(() => {
      if (Timer > 0) {
        Timer -= 1;
        setRemainingTime((prevTime) => prevTime - 1);
      } else if (Timer === 0) {
        setIsTimeZero(true);
        setGamen("answer");
        clearInterval(countdownInterval);
      }
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }
}, [gamen]);

  return (
    <div className={styles["countdown-container"]}>
      <CSSTransition
        in={remainingTime > 0 && gamen === "question"}
        timeout={500}
        classNames={{
          enter: styles["countdown-animation-enter"],
          enterActive: styles["countdown-animation-enter-active"],
          exit: styles["countdown-animation-exit"],
          exitActive: styles["countdown-animation-exit-active"],
        }}
        unmountOnExit
      >
        <p className={styles.countdown}>
          <span>残り時間: </span>
          <span className={styles["countdown-number"]}>{remainingTime}</span>
          <span>秒</span>
        </p>
      </CSSTransition>
    </div>
  );
}

export default TimeCount;
