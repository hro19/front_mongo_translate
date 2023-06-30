import React, { useEffect } from "react";
import confetti from "canvas-confetti";

const ConfettiBackground = () => {
  useEffect(() => {
    // 紙吹雪を生成する関数
    function createConfetti() {
      // 紙吹雪の設定
      const options = {
        particleCount: 100, // 紙吹雪の数
        spread: 160, // 紙吹雪が広がる範囲
        origin: { y: 0.6 }, // 紙吹雪が発生する位置（上から60%の位置）
      };

      // 紙吹雪を発生させる
      confetti(options);
    }

    // 紙吹雪を生成
    createConfetti();

    // 1秒後に紙吹雪を停止
    const stopConfettiTimeout = setTimeout(() => {
      confetti.reset(); // 紙吹雪をリセットして停止
    }, 1000);

    // コンポーネントがアンマウントされるときにタイムアウトをクリア
    return () => {
      clearTimeout(stopConfettiTimeout);
    };
  }, []);

  return <div id="confetti-container" />;
};

export default ConfettiBackground;
