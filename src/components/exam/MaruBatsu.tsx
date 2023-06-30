import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Head from "next/head";

const MaruBatsu = ({ isJadge }: { isJadge: boolean | null }) => {
  const circleRef = useRef(null);
  const crossRef = useRef(null);

  useEffect(() => {
    const circle = circleRef.current;
    const cross = crossRef.current;

    const circleAnimation = gsap.to(circle, {
      scale: 1.2,
      repeat: -1,
      yoyo: true,
      duration: 1,
      ease: "bounce.out",
    });

    const crossAnimation = gsap.to(cross, {
      rotation: 90,
      repeat: -1,
      yoyo: true,
      duration: 0.5,
      ease: "power2.out",
    });

    return () => {
      circleAnimation.kill();
      crossAnimation.kill();
    };
  }, []);

  return (
    <div>
      <Head>{/* gsapのCDNリンクは不要 */}</Head>
      <style jsx>{`
        .double-circle {
          position: relative;
          width: 140px;
          height: 140px;
          border: 8px solid #10b981;
          border-radius: 50%;
          overflow: hidden;
        }

        .double-circle:before {
          content: "";
          position: absolute;
          width: calc(72% + 16px);
          height: calc(72% + 16px);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 8px solid #10b981; /* エメラルドのカラーコード (#10B981) を指定 */
          border-radius: 50%;
        }

        .cross {
          background-color: initial;
        }

        .cross:before,
        .cross:after {
          content: "";
          width: 160px;
          height: 20px;
          background-color: red;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
        }

        .cross:before {
          transform: translate(-50%, -50%) rotate(45deg);
        }

        .cross:after {
          transform: translate(-50%, -50%) rotate(-45deg);
        }
      `}</style>
      <div className="flex justify-center my-8">
        {isJadge ? (
          <div ref={circleRef} className="double-circle w-36 h-36 relative"></div>
        ) : (
          <div ref={crossRef} className="cross w-24 h-24 bg-blue-500 relative"></div>
        )}
      </div>
    </div>
  );
};

export default MaruBatsu;
