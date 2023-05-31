import React, { useRef, useEffect } from "react";

const RefPage = () => {
  const mezirushiRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (mezirushiRef.current) {
      const text = mezirushiRef.current.textContent;
      console.log(text); // テキスト情報をコンソールに表示
    }
  }, []);

  return (
    <div>
      <h1 className="text-4xl text-center border-b-2">ref勉強ページ</h1>
      <p id="mezirushi" ref={mezirushiRef}>
        このテキストをrefで取りたい
      </p>
      <div className="border border-green-500">
        <h4 className="text-2xl">【目的とする文字を下に】</h4>
        <p>{mezirushiRef.current && mezirushiRef.current.textContent}</p>
      </div>
    </div>
  );
};

export default RefPage;
