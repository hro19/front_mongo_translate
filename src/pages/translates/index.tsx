import React, { useState, useEffect, ChangeEvent } from "react";
import TranslateCreate from "../../components/translates/TranslateCreate";
import TranslateTitle from "../../components/translates/TranslateTitle";
import { handleTranslate, getApiLimit } from "../../components/translates/Honyaku";
import Tooltips from "../../components/translates/Tooltips";
import TopLatest from "../../components/translates/TopLatest";

import { useAtom } from "jotai";
import {
  inputTextAtom,
  translatedTextAtom,
  enContentAtom,
} from "../../jotai/translatesAtoms";
import { speakText } from "../../components/translates/Onsei";

const Home = () => {
  const [inputText, setInputText] = useAtom(inputTextAtom); // inputText ステートを宣言する
  const [translatedText, setTranslatedText] = useAtom(translatedTextAtom); // translatedText ステートを宣言する
  const [enContent, setEnContent] = useAtom(enContentAtom);
  const maxApiNum = 500000;
  const [apiLimit, setApiLimit] = useState<number>(maxApiNum); // apiLimit ステートを宣言する

  //インプットした文字をinputTextにセットし、数秒後に自動で翻訳
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>(undefined);
  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);

    clearTimeout(timer);

    const newTimer = setTimeout(async () => {
      try {
        const handleTranslateTxt = await handleTranslate(inputText);
        setTranslatedText(handleTranslateTxt);
      } catch (error) {
        // エラーハンドリング
      }
    }, 1000);

    setTimer(newTimer);
  };

  const handlePaste = async(event: React.ClipboardEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    // onPasteイベントの処理
    const pastedText = event.clipboardData.getData("text");
    setInputText(pastedText);
    const handlepastedTxt = await handleTranslate(pastedText);
    setTranslatedText(handlepastedTxt);
  };

  //翻訳された文字をinputTextにセットする
  const handleInputChange2 = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTranslatedText(event.target.value);
  };

  //一月のご利用文字数を表示
  useEffect(() => {
    getApiLimit({
      setApiLimit,
    });
  }, [translatedText]);

  return (
    <div className="mx-4 pt-2">
      <div className="container max-w-[1040px] mx-auto">
        <TranslateTitle />
        <Tooltips />
        <p className="mb-3">
          {/* {!isNaN(apiLimit) && (apiLimit === maxApiNum || `${apiLimit}文字`)} */}
          今月使用できる文字数は残り
          <span className="font-bold text-lg">{maxApiNum - apiLimit}文字</span>
          まで
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <textarea
              id="deepl-input"
              placeholder="こちらに日本語もしくは英語を入力ください"
              value={inputText}
              onChange={handleInputChange}
              onPaste={handlePaste}
              className="p-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full h-36"
            />
            {/* <button
              onClick={() =>handleTranslate({inputText,setTranslatedText,})}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-4"
            >Translate</button> */}
            <button
              onClick={() => {
                setInputText("");
                setTranslatedText("");
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-4"
            >
              Clear
            </button>
          </div>
          <div>
            <textarea
              id="deepl-input2"
              placeholder="こちらに入力しても翻訳はされません"
              value={translatedText}
              onChange={handleInputChange2}
              className="p-2 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 w-full h-36"
            />
            <button
              onClick={() => speakText(enContent)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md mt-4"
            >
              Speak
            </button>
            {translatedText && inputText && <TranslateCreate />}
          </div>
        </div>
        <TopLatest />
      </div>
    </div>
  );
};

export default Home;
