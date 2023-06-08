import React, { useState, useEffect } from "react";
import axios from "axios";
import { CreateTranslate } from "../../ts/Translate";
import { useAtom } from "jotai";
import { detectJapLang } from "../../components/translates/Honyaku";
import { useMutation, useQueryClient } from "react-query";
import {
  inputTextAtom,
  translatedTextAtom,
  jaContentAtom,
  enContentAtom,
} from "../../jotai/translatesAtoms";

const TranslateCreate = () => {
  const [inputText, setInputText] = useAtom(inputTextAtom);
  const [translatedText, setTranslatedText] = useAtom(translatedTextAtom);
  const [jaContent, setJaContent] = useAtom(jaContentAtom);
  const [enContent, setEnContent] = useAtom(enContentAtom);

  const queryClient = useQueryClient();

  //テキストエリアを初期化
  const handleCreateSuccess = () => {
    setInputText("");
    setTranslatedText("");
  };

  useEffect(() => {
    let isJap = detectJapLang(inputText);

    if (isJap) {
      setJaContent(inputText);
      setEnContent(translatedText);
    } else {
      setJaContent(translatedText);
      setEnContent(inputText);
    }
  }, [inputText, translatedText, setJaContent, setEnContent]);

  const CreateData = { jaContent, enContent };
  const createTranslation = async (CreateData: CreateTranslate) => {
    try {
      const response = await axios.post(
        "https://back-mongo-translate.vercel.app/api/v1/translates",
        CreateData
      );
      return response.data;
    } catch (error) {
      throw new Error(`Error creating data: ${error}`);
    }
  };

  const mutation = useMutation(createTranslation, {
    onSuccess: () => {
      queryClient.invalidateQueries("translates");
      handleCreateSuccess();
    },
  });

  const handleCreate = async () => {
    mutation.mutate(CreateData);
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
