import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./TimeCount.module.css";
import { useAtom } from "jotai";
import {
  gamenAtom,
  isTimeZeroAtom,
  remainingTimeAtom,
} from "../../jotai/atoms";

function TimeCount() {
  const [gamen, setGamen] = useAtom(gamenAtom);
  const [isTimeZero, setIsTimeZero] = useAtom(isTimeZeroAtom);

  const [remainingTime, setRemainingTime] = useAtom(remainingTimeAtom);

  useEffect(() => {
    if (gamen === "question") {
      const countdownInterval = setInterval(() => {
        if (remainingTime > 0) {
          setRemainingTime((prevTime) => prevTime - 1);
        } else {
          clearInterval(countdownInterval);
        }
      }, 1000);

      return () => {
        clearInterval(countdownInterval);
      };
    }
  }, [gamen]);

  useEffect(() => {
    if (remainingTime === 0) {
      setIsTimeZero(true);
      setTimeout(() => {
        setGamen("answer");
      }, 500);
    }
  }, [remainingTime]);

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
