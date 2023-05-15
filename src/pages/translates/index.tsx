import React, { useState, useEffect } from "react";
import Link from "next/link";
import TranslateCreate from "../../components/translates/TranslateCreate";

const API_KEY = "68fddf2a-cbfe-a9a0-87bf-0269b2ebbf29:fx";
const API_URL = "https://api-free.deepl.com/v2/translate";
const API_LIMIT_URL = "https://api-free.deepl.com/v2/usage";

const Home = () => {
  const [inputText, setInputText] = useState(""); // inputText ステートを宣言する
  const [translatedText, setTranslatedText] = useState(""); // translatedText ステートを宣言する
  const [apiLimit, setApiLimit] = useState(500000); // apiLimit ステートを宣言する
  const [isJapanese, setIsJapanese] = useState(false); // isJapanese ステートを宣言する
  const [jaContent, setJaContent] = useState<string | null>(null);
  const [enContent, setEnContent] = useState<string | null>(null);

  //インプットを初期化
  const handleCreateSuccess = () => {
    setInputText("");
    setTranslatedText("");
    setIsJapanese(false);
    setJaContent(null);
    setEnContent(null);
  };

  //インプットした文字をinputTextにセットする
  const handleInputChange = (event: any) => {
    setInputText(event.target.value);
  };

  //翻訳ハンドラー
  const handleTranslate = () => {
    let deeplInput = inputText;
    let isJap = false;
    let sourceLang = "";

    for (var i = 0; i < deeplInput.length; i++) {
      //言語判別
      if (deeplInput.charCodeAt(i) >= 256) {
        isJap = true;
        break;
      }
    }

    switch (isJap) {
      case true:
        sourceLang = "&source_lang=JA&target_lang=EN";
        setIsJapanese(true);
        break;
      case false:
        sourceLang = "&source_lang=EN&target_lang=JA";
        setIsJapanese(false);
        break;
      default:
        alert("言語の判別に失敗しました");
    }

    let content = encodeURI(
      "auth_key=" + API_KEY + "&text=" + deeplInput + sourceLang
    );
    let url = API_URL + "?" + content;

    fetch(url)
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Could not reach the API: " + response.statusText);
        }
      })
      .then((data) => {
        setTranslatedText(data.translations[0].text);
        setApiLimit(apiLimit - data.character_count); // 翻訳に使った文字数を引いて、apiLimit を更新する
        // 判定とステートの設定
        if (isJap) {
          setJaContent(inputText);
          setEnContent(data.translations[0].text);
        } else {
          setJaContent(data.translations[0].text);
          setEnContent(inputText);
        }
      })
      .catch((error) => {
        alert("翻訳失敗");
      });
  };

  //一月のご利用文字数を表示
  useEffect(() => {
    const getApiLimit = () => {
      const content = encodeURI("auth_key=" + API_KEY);
      const url = API_LIMIT_URL + "?" + content;

      fetch(url)
        .then(function (response) {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Could not reach the API: " + response.statusText);
          }
        })
        .then((data) => {
          setApiLimit(data.character_count);
        })
        .catch((error) => {
          alert("API制限の取得に失敗しました");
        });
    };

    getApiLimit();
  }, [translatedText]);

  //音声読み上げハンドラー
  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(translatedText);
    if (isJapanese) {
      utterance.lang = "en-US";
    } else {
      utterance.lang = "ja-JP";
    }
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center inline-block mr-6">
        翻訳ページ
      </h1>
      <span className="border border-yellow-500 text-2xl inline-block">
        <Link href="/translates/all" className="text-yellow-500">
          翻訳データALL
        </Link>
      </span>

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
            onClick={handleTranslate}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-4"
          >
            Translate
          </button>
        </div>
        <div>
          <div
            id="deepl-output"
            className="p-2 rounded-md border border-gray-300 shadow-sm h-36"
          >
            {translatedText}
          </div>
          <button
            onClick={handleSpeak}
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
  );
};

export default Home;
