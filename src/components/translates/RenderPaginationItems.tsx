import React, { useState } from "react";
import TranslateItelete from "../../components/translates/TranslateItelete";
import { Translate } from "../../ts/Translate";
import { useAtom } from "jotai";
import {
  showPostsAtom,
  currentPageAtom,
  itemsPerPageAtom,
  isSpeakingAtom,
} from "../../jotai/translatesAtoms";

const RenderPaginationItems = () => {
  const [showPosts, setShowPosts] = useAtom(showPostsAtom);

  //ページング設定
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [itemsPerPage, setTtemsPerPage] = useAtom(itemsPerPageAtom);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  //現在音声再生中かを判断
  const [isSpeaking, setIsSpeaking] = useAtom(isSpeakingAtom);

  return (
    <>
      {showPosts.slice(startIndex, endIndex).map((translate: Translate) => (
        <TranslateItelete
          key={translate._id}
          translate={translate}
        />
      ))}
    </>
  );
};

export default RenderPaginationItems;
