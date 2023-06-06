import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import ScaleLoader from "react-spinners/ScaleLoader";

import TranslateTitle from "../../components/translates/TranslateTitle";
import TranslateInput from "../../components/translates/TranslateInput";
import RenderPaginationItems from "../../components/translates/RenderPaginationItems";
import TranslatePagination from "@/components/translates/TranslatePagination";
import { Translate } from "../../ts/Translate";
import { useAtom } from "jotai";
import {
  showPostsAtom,
  currentPageAtom,
  itemsPerPageAtom,
} from "../../jotai/translatesAtoms";

const All = () => {
  const [showPosts, setShowPosts] = useAtom(showPostsAtom);

  //ページング設定
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [itemsPerPage, setTtemsPerPage] = useAtom(itemsPerPageAtom);

  const fetchTranslates = async () => {
    const response = await axios.get(
      "https://back-mongo-translate.vercel.app/api/v1/translates"
    );
    const data = response.data;
    const sortedData = data.sort((a: Translate, b: Translate) => {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });
    return sortedData;
  };

  const { data, isLoading, isError, error } = useQuery<any, Error>(
    "translates",
    fetchTranslates,
    {
      onSuccess: (data) => {
        setShowPosts(data);
      },
    }
  );

  return (
    <div className="mx-4 pt-2">
      <div className="container max-w-[1040px] mx-auto">
        <TranslateTitle />
        <TranslateInput
          data={data}
          setCurrentPage={setCurrentPage}
          setShowPosts={setShowPosts}
        />

        {isLoading ? (
          <div className="flex justify-center my-36">
            <ScaleLoader height={80} width={10} radius={5} color="#BFF7FA" />
          </div>
        ) : isError ? (
          <div>Error: {(error as Error).message}</div>
        ) : (
          <>
            <RenderPaginationItems
              showPosts={showPosts}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
            />
            <TranslatePagination/>
          </>
        )}
      </div>
    </div>
  );
};

export default All;
