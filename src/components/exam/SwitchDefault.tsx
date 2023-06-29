import React from "react";
import { useAtom } from "jotai";
import { gamenAtom } from "../../jotai/atoms";

const SwitchDefault = () => {
  const [gamen, setGamen] = useAtom(gamenAtom);

  const handleButtonClick = () => {
    setGamen("question");
  };

  return (
    <div className="my-8">
      <button onClick={handleButtonClick} className="btn btn-info">英単語テストをスタート</button>
      <div>デフォルト画面</div>
    </div>
  );
};

export default SwitchDefault;
