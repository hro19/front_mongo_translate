import React, { useState, useEffect, ChangeEvent } from "react";
import TranslateCreate from "../../components/translates/TranslateCreate";
import TranslateTitle from "../../components/translates/TranslateTitle";
import {
  handleTranslate,
  getApiLimit,
} from "../../components/translates/Honyaku";

import { speakText } from "../../components/translates/Onsei";

const API_KEY = "68fddf2a-cbfe-a9a0-87bf-0269b2ebbf29:fx";
const API_URL = "https://api-free.deepl.com/v2/translate";
const API_LIMIT_URL = "https://api-free.deepl.com/v2/usage";

const Home = () => {
  const [inputText, setInputText] = useState<string>(""); // inputText ステートを宣言する
  const [translatedText, setTranslatedText] = useState<string>(""); // translatedText ステートを宣言する
  const [apiLimit, setApiLimit] = useState<number>(500000); // apiLimit ステートを宣言する
  const [jaContent, setJaContent] = useState<string>("");
  const [enContent, setEnContent] = useState<string>("");

  //インプットを初期化
  const handleCreateSuccess = () => {
    setInputText("");
    setTranslatedText("");
    setJaContent("");
    setEnContent("");
  };

  //インプットした文字をinputTextにセットする
  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  };

  //翻訳された文字をinputTextにセットする
  const handleInputChange2 = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTranslatedText(event.target.value);
  };

  //一月のご利用文字数を表示
  useEffect(() => {
    getApiLimit({
      API_KEY,
      API_LIMIT_URL,
      setApiLimit,
    });
  }, [translatedText]);

  return (
    <div className="mx-4 pt-2">
      <div className="container max-w-[1040px] mx-auto">
        <TranslateTitle />
        <p className="mb-3">
          {!isNaN(apiLimit) && `${apiLimit}文字`}（500000文字まで）
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <textarea
              id="deepl-input"
              value={inputText}
              onChange={handleInputChange}
              className="p-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full h-36"
            />
            <button
              onClick={() =>
                handleTranslate({
                  API_KEY,
                  API_URL,
                  inputText,
                  setTranslatedText,
                  setApiLimit,
                  apiLimit,
                  setJaContent,
                  setEnContent,
                })
              }
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-4"
            >
              Translate
            </button>
          </div>
          <div>
            <textarea
              id="deepl-input"
              value={translatedText}
              onChange={handleInputChange2}
              className="p-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full h-36"
            />
            <button
              onClick={() => speakText({ content: translatedText })}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md mt-4"
            >
              Speak
            </button>
            {translatedText && (
              <TranslateCreate
                jaContent={jaContent}
                enContent={enContent}
                handleCreateSuccess={handleCreateSuccess}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
