import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

const ConfettiBackground = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      // 紙吹雪の設定
      const options = {
        particleCount: 100, // 紙吹雪の数
        spread: 160, // 紙吹雪が広がる範囲
        origin: { y: 0.6 }, // 紙吹雪が発生する位置（上から60%の位置）
      };

      // 紙吹雪を発生させる
      confetti(options);
    }, 200);

    return () => {
      // コンポーネントがアンマウントされた時にクリア
      clearInterval(interval);
    };
  }, []);

  return <div id="confetti-container" />;
};

export default ConfettiBackground;