import React, { useEffect } from "react";
import confetti from "canvas-confetti";

// 紙吹雪を生成する関数
function createConfetti() {
  // 紙吹雪の設定
  const options = {
    particleCount: 900, // 紙吹雪の数
    angle: 90, // 紙吹雪の放射方向の角度
    spread: 260, // 紙吹雪が広がる範囲
    origin: { y: 0.75 }, // 紙吹雪が発生する位置（上から60%の位置）
  };

  // 紙吹雪を発生させる
  confetti(options);
}

const ConfettiBackground = () => {
  useEffect(() => {
    // 紙吹雪を生成
    createConfetti();

    // 1秒後に紙吹雪を停止
    const stopConfettiTimeout = setTimeout(() => {
      confetti.reset(); // 紙吹雪をリセットして停止
    }, 5000);

    // コンポーネントがアンマウントされるときにタイムアウトをクリア
    return () => {
      clearTimeout(stopConfettiTimeout);
    };
  }, []);

  return <div id="confetti-container" />;
};

export default ConfettiBackground;
