import React from "react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Fade from "@mui/material/Fade";
import Zoom from "@mui/material/Zoom";

const Tooltips = () => {
  return (
    <div className="mt-6">
      <h2 className="mb-3 border-b-2 border-yellow-500 text-yellow-600 text-xl font-bold">
        使い方
      </h2>
      <Tooltip title="英語/日本語どちらも翻訳可能です、目的とする文章を「コチラに日本語もしくは英語を～」に入力もしくはペーストして翻訳をしてください">
        <Button className="px-4 py-2 mr-1 rounded-full border border-navy text-white bg-cyan-900 text-navy hover:bg-cyan-700">
          英語/日本語どちらも翻訳可能
        </Button>
      </Tooltip>
      <Tooltip
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 600 }}
        title="「登録」から翻訳データを保存することが出来ます、過去の履歴を振り返れます"
      >
        <Button className="px-4 py-2 mr-1 rounded-full border border-navy text-white bg-cyan-900 text-navy hover:bg-cyan-700">
          翻訳テキストの保存機能
        </Button>
      </Tooltip>
      <Tooltip
        TransitionComponent={Zoom}
        title="翻訳されたデータの英語文をリスニング出来ます"
      >
        <Button className="px-4 py-2 mr-1 rounded-full border border-navy text-white bg-cyan-900 text-navy hover:bg-cyan-700">
          リスニング機能
        </Button>
      </Tooltip>
    </div>
  );
};

export default Tooltips;
