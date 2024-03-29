import { format } from "date-fns";

const API_KEY = "68fddf2a-cbfe-a9a0-87bf-0269b2ebbf29:fx";
const API_URL = "https://api-free.deepl.com/v2/translate";
const API_LIMIT_URL = "https://api-free.deepl.com/v2/usage";

//翻訳ハンドラー
//第一引数　入力した文字（英語でも日本語も可能）
//第二引数　入力された文字を翻訳したデータのセッター
type HandleTranslateType = (inputText: string) => Promise<string>;

const handleTranslate: HandleTranslateType = async (inputText) => {
  let deeplInput = inputText;
  let isJap = false;

  for (var i = 0; i < deeplInput.length; i++) {
    // 言語判別
    isJap = detectJapLang(deeplInput);
  }
  let sourceLang = getSpeechHash(isJap);

  let content = encodeURI("auth_key=" + API_KEY + "&text=" + deeplInput + sourceLang);
  let url = API_URL + "?" + content;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Could not reach the API: " + response.statusText);
    }
    const data = await response.json();
    //翻訳データをリターンする
    return data.translations[0].text;
  } catch (error) {
    alert("翻訳失敗");
    throw error;
  }
};

//一カ月のご利用文字数を表示
//第一引数　今月利用した文字数を取得し、セッターに入れる
type GetApiLimit = (params: {
  setApiLimit: React.Dispatch<React.SetStateAction<number>>;
}) => void;

const getApiLimit: GetApiLimit = ({ setApiLimit }) => {
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

//日付フォーマット
type FormatDateType = (date: string) => string;

const formatDate: FormatDateType = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = format(date, "yyyy年MM月dd日 HH時mm分");
  return formattedDate;
};

//言語判別
//第一引数　インプットデータ英語か日本語
type DetectJapLangType = (text: string) => boolean;

const detectJapLang: DetectJapLangType = (text) => {
  const japaneseRegex =
    /[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}ーａ-ｚＡ-Ｚ０-９々〆〤]/u;
  const englishRegex = /[a-zA-Z]/;

  if (japaneseRegex.test(text)) {
    return true; // 日本語ならばtrueを返す
  } else if (englishRegex.test(text)) {
    return false; // 英語ならばfalseを返す
  } else {
    return false; // 上記のいずれにも当てはまらない場合は英語として扱う（falseを返す）
  }
};

//音声データ用のURLフラグメントを取得
//第一引数　isJap
type GetSpeechHashType = (isJap: boolean) => string;

const getSpeechHash: GetSpeechHashType = (isJap) => {
  let sourceLang = "&source_lang=JA&target_lang=EN";

  switch (isJap) {
    case true:
      break;
    case false:
      sourceLang = "&source_lang=EN&target_lang=JA";
      break;
    default:
      break;
  }

  return sourceLang;
};

export {
  handleTranslate,
  getApiLimit,
  formatDate,
  detectJapLang,
  getSpeechHash,
  // 他の関数も追加する
};
