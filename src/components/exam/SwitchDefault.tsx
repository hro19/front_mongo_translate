import React from "react";
import { useAtom } from "jotai";
import { gamenAtom } from "../../jotai/examsAtoms";

const SwitchDefault = () => {
  const [gamen, setGamen] = useAtom(gamenAtom);

  const handleButtonClick = () => {
    setGamen("question");
  };

  return (
    <div className="my-8">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">ルール説明</h2>
        <ul className="list-disc ml-6">
          <li>答えが分からないときは【Enter】キーで次の問題に移動します</li>
          <li>最後に間違えた一覧を表示しますので、復習ができます</li>
          <li>...</li>
        </ul>
      </div>
      <button onClick={handleButtonClick} className="btn btn-info">
        英単語テストをスタート
      </button>
    </div>
  );
};

export default SwitchDefault;
