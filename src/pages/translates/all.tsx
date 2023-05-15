import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { format } from "date-fns";

const All = () => {
  const fetchTranslates = async () => {
    const response = await axios.get(
      "https://back-mongo-translate.vercel.app/api/v1/translates"
    );
    return response.data;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = format(date, "yyyy年MM月dd日 HH時mm分");
    return formattedDate;
  };

  const { data, isLoading, isError, error } = useQuery<any, Error>(
    "translates",
    fetchTranslates
  );

  const [isSpeaking, setIsSpeaking] = useState(false);

const speakText = (text: string) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
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
    <div className="mx-4">
      <div className="container max-w-[1040px] mx-auto">
        <h1 className="text-center text-3xl text-cyan-500">全ての翻訳データ</h1>
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
              </div>
              <div>
                <p className="border rounded-lg p-2 bg-pink-100 text-left">
                  {translate.enContent}
                </p>
                {isSpeaking ? (
                  <button
                    className="mt-2 bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-700 text-sm"
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
