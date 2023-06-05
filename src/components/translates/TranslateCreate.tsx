import React, { useState,useEffect } from "react";
import axios from "axios";
import { useAtom } from "jotai";
import { detectLanguage } from "../../components/translates/Honyaku";
import {
  inputTextAtom,
  translatedTextAtom,
} from "../../jotai/translatesAtoms";

const TranslateCreate = () => {
  const [inputText, setInputText] = useAtom(inputTextAtom); // inputText ステートを宣言する
  const [translatedText, setTranslatedText] = useAtom(translatedTextAtom); // translatedText ステートを宣言する
  const [jaContent, setJaContent] = useState<string>("");
  const [enContent, setEnContent] = useState<string>("");

  //インプットを初期化
  const handleCreateSuccess = () => {
    setInputText("");
    setTranslatedText("");
  };

  useEffect(() => {
    let isJap = detectLanguage(inputText);

    if (isJap) {
      setJaContent(inputText);
      setEnContent(translatedText);
    } else {
      setJaContent(translatedText);
      setEnContent(inputText);
    }
  }, [inputText, translatedText]);

  const handleCreate = async () => {
    try {
      const response = await axios.post(
        "https://back-mongo-translate.vercel.app/api/v1/translates",
        { jaContent, enContent }
      );
      //console.log("Data created:", response.data);
      handleCreateSuccess();
    } catch (error) {
      console.error("Error creating data:", error);
    }
  };

  return (
    <button
      className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-md mt-4 ml-2"
      onClick={handleCreate}
    >
      データ登録
    </button>
  );
};

export default TranslateCreate;
