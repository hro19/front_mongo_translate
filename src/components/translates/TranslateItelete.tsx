import React, { Dispatch, SetStateAction } from "react";
import TranslateDelete from "../../components/translates/TranslateDelete";
import { formatDate } from "../../components/translates/Honyaku";
import { speakText, stopSpeaking } from "../../components/translates/Onsei";

interface Translate {
  _id: string;
  enContent: string;
  jaContent: string;
  created_at: string;
}

interface TranslateIteleteProps {
  translate: Translate;
  isSpeaking: boolean;
  setIsSpeaking: Dispatch<SetStateAction<boolean>>;
}

const TranslateItelete = ({
  translate,
  isSpeaking,
  setIsSpeaking,
}: TranslateIteleteProps) => {
  return (
    <>
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
                onClick={() => stopSpeaking(setIsSpeaking)}
              >
                再生ストップ
              </button>
            ) : (
              <button
                className="mt-2 bg-cyan-500 text-white py-1 px-2 rounded-md hover:bg-cyan-700 text-sm"
                onClick={() =>
                  speakText({ content: translate.enContent, setIsSpeaking })
                }
              >
                音声データ
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TranslateItelete;
