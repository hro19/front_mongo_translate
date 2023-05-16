import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Pagination } from "@mui/material";
import ScaleLoader from "react-spinners/ScaleLoader";

import TranslateItelete from "../../components/translates/TranslateItelete";
import TranslateTitle from "../../components/translates/TranslateTitle";
import { searchFunc } from "../../components/translates/Kensaku";

const All = () => {
  const [showPosts, setShowPosts] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const fetchTranslates = async () => {
    const response = await axios.get(
      "https://back-mongo-translate.vercel.app/api/v1/translates"
    );
    return response.data;
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

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const handlePageChange = (event: any, page: any) => {
    setCurrentPage(page);
  };

  const renderPaginationItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return showPosts
      .slice(startIndex, endIndex)
      .map((translate: any) => (
        <TranslateItelete
          key={translate._id}
          translate={translate}
          isSpeaking={isSpeaking}
          stopSpeaking={stopSpeaking}
          speakText={speakText}
        />
      ));
  };

  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakText = (enContent: any) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(enContent);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      setIsSpeaking(true);
    }
  };

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setInputValue(e.target.value);
  setCurrentPage(1); // ページを1ページ目に設定
  searchFunc({ value: e.target.value, posts: data, setShowPosts }); // 検索を実行
};

  return (
    <div className="mx-4 pt-2">
      <div className="container max-w-[1040px] mx-auto">
        <TranslateTitle />
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Search..."
          className="border border-gray-300 rounded-md py-2 px-4 mb-4 block w-[400px] placeholder-gray-400"
        />

        {isLoading ? (
          <div className="flex justify-center my-36">
            <ScaleLoader height={80} width={10} radius={5} color="#BFF7FA" />
          </div>
        ) : isError ? (
          <div>Error: {(error as Error).message}</div>
        ) : (
          <>
            {renderPaginationItems()}
            <div className="flex justify-center mt-4">
              <Pagination
                count={Math.ceil(showPosts.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                sx={{
                  "& .MuiPaginationItem-root": {
                    backgroundColor: "#aaaaaa",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#444444",
                    },
                    "&.Mui-selected": {
                      backgroundColor: "#444444",
                    },
                  },
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default All;