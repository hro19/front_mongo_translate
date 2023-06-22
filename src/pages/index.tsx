import React from "react";
import { AiOutlineDownCircle } from "react-icons/ai";

const DaisyUI = () => {
  return (
    <div className="my-4 mx-2">
        <a href="/tasks/exam" className="btn mb-2 bg-primary text-white">
          英単語テスト
        </a>
        <a href="/tasks" className="btn mb-2 bg-secondary text-white">
          英単語登録
        </a>
        <a href="/translates" className="btn mb-2 bg-accent-focus text-white">
          英文暗記帳
        </a>
    </div>
  );
};

export default DaisyUI;
