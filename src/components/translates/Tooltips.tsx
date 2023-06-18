import React from "react";

const Tooltips = () => {
  const tooltipData = [
    {
      btnText: "英語/日本語どちらも翻訳可能",
      explain:
        "英語/日本語どちらも翻訳可能です、目的とする文章を「コチラに日本語もしくは英語を～」に入力もしくはペーストして翻訳をしてください",
    },
    {
      btnText: "翻訳テキストの保存機能",
      explain:
        "「登録」から翻訳データを保存することが出来ます、過去の履歴を振り返れます",
    },
    {
      btnText: "リスニング機能",
      explain: "翻訳されたデータの英語文をリスニング出来ます",
    },
  ];

  return (
    <div className="mb-4">
      {tooltipData.map((data, index) => (
        <div
          key={index}
          className="tooltip tooltip-bottom tooltip-accent mr-2"
          data-tip={data.explain}
        >
          <button className="btn btn-info">{data.btnText}</button>
        </div>
      ))}
    </div>
  );
};

export default Tooltips;
