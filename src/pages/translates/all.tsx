import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";

import TranslateDelete from "../../components/translates/TranslateDelete";
import TranslateTitle from "../../components/translates/TranslateTitle";
import {
    formatDate,
} from "../../components/translates/Honyaku";

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <div className="mx-4 pt-2">
      <div className="container max-w-[1040px] mx-auto">
        <TranslateTitle />

        {data.map((translate: any, index: number) => (
          <div key={translate._id} className="border-b border-bp mb-2 pb-2 b-4">
            <h2 className="text-sm font-bold text-green-700">
                    作成日【{formatDate(translate.created_at)}】
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="border rounded-lg p-2 bg-blue-100 text-left">
                  {translate.jaContent}
                </p>
                <TranslateDelete translate={translate} />
              </div>
              <div>
                <p className="border rounded-lg p-2 bg-pink-100 text-left">
                  {translate.enContent}
                </p>
                {isSpeaking ? (
                  <button
                    className="mt-2 bg-teal-500 text-white py-1 px-2 rounded-md hover:bg-teal-700 text-sm"
                    onClick={stopSpeaking}
                  >
                    再生ストップ
                  </button>
                ) : (
                  <button
                    className="mt-2 bg-cyan-500 text-white py-1 px-2 rounded-md hover:bg-cyan-700 text-sm"
                    onClick={() => speakText(translate.enContent)}
                  >
                    音声データ
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default All;