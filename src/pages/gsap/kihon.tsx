import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Head from "next/head";

const Home = () => {
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
      rotation: 45,
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
        .cross {
          background-color: initial;
        }

        .cross:before,
        .cross:after {
          content: "";
          width: 100px;
          height: 10px;
          background-color: red;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .cross:before {
          transform: translate(-50%, -50%) rotate(45deg);
        }

        .cross:after {
          transform: translate(-50%, -50%) rotate(-45deg);
        }
      `}</style>
      <div ref={circleRef} className="w-24 h-24 border-8 border-emerald-600 rounded-full relative"></div>
      <div
        ref={crossRef}
        className="cross w-24 h-24 bg-blue-500 relative"
      ></div>
    </div>
  );
};

export default Home;
