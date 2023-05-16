import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Pagination } from "@mui/material";
import ScaleLoader from "react-spinners/ScaleLoader";

import TranslateItelete from "../../components/translates/TranslateItelete";
import TranslateTitle from "../../components/translates/TranslateTitle";

const All = () => {
  const fetchTranslates = async () => {
    const response = await axios.get(
      "https://back-mongo-translate.vercel.app/api/v1/translates"
    );
    return response.data;
  };

  const { data, isLoading, isError, error } = useQuery<any, Error>(
    "translates",
    fetchTranslates
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const handlePageChange = (event: any, page: any) => {
    setCurrentPage(page);
  };

  const renderPaginationItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return data
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

  const speakText = (enContent: string) => {
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

  return (
    <div className="mx-4 pt-2">
      <div className="container max-w-[1040px] mx-auto">
        <TranslateTitle />

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
                count={Math.ceil(data.length / itemsPerPage)}
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