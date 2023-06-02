import React, { useState } from "react";
import TranslateItelete from "../../components/translates/TranslateItelete";
import { Translate } from "../../ts/Translate";

const RenderPaginationItems = ({
  itemsPerPage,
  currentPage,
  isSpeaking,
  setIsSpeaking,
  showPosts,
}: any) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return showPosts
    .slice(startIndex, endIndex)
    .map((translate: Translate) => (
      <TranslateItelete
        key={translate._id}
        translate={translate}
        isSpeaking={isSpeaking}
        setIsSpeaking={setIsSpeaking}
      />
    ));
};

export default RenderPaginationItems;
