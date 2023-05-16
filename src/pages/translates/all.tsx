import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
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

  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakText = (enContent: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(enContent);
      utterance.lang = "en-US"; // 読み上げモードを米国英語に設定
      window.speechSynthesis.speak(utterance);
      utterance.onend = () => {
        setIsSpeaking(false); // 読み上げ完了時にisSpeakingをfalseに設定
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
          data.map((translate: any, index: number) => (
            <TranslateItelete key={translate._id} translate={translate} isSpeaking={isSpeaking} stopSpeaking={stopSpeaking} speakText={speakText} />
          ))
        )}
      </div>
    </div>
  );
};

export default All;