import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "./Countdown.module.css";

function Countdown() {
  const countdownTime = 6;
  const [remainingTime, setRemainingTime] = useState(countdownTime);

  useEffect(() => {
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
  }, []);

    return (
    <div className={styles["countdown-container"]}>
        <CSSTransition
        in={remainingTime > 0}
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
        {remainingTime <= 0}
    </div>
    );
}

export default Countdown;
