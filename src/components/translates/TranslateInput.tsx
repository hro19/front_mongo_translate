import React, { useState } from "react";
import { searchFunc } from "../../components/translates/Kensaku";
import { TranslateIterateObj } from "../../ts/Translate";
import { useAtom } from "jotai";
import {
  showPostsAtom,
  currentPageAtom
} from "../../jotai/translatesAtoms";

const TranslateInput = ({ data }: TranslateIterateObj) => {
  const [showPosts, setShowPosts] = useAtom(showPostsAtom);
  //ページング設定
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);

  const [inputValue, setInputValue] = useState("");

  //検索インプット
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setCurrentPage(1); // ページを1ページ目に設定
    searchFunc({ value: e.target.value, posts: data, setShowPosts }); // 検索を実行
  };

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search..."
        className="border border-gray-300 rounded-md py-2 px-4 mb-4 block w-[400px] placeholder-gray-400"
      />
    </>
  );
};

export default TranslateInput;
