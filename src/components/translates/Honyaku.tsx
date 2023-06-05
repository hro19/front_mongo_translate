import { format } from "date-fns";

//翻訳ハンドラー
const handleTranslate = ({
  API_KEY,
  API_URL,
  inputText,
  setTranslatedText,
  setApiLimit,
  apiLimit,
  setJaContent,
  setEnContent,
}: any) => {
  let deeplInput = inputText;
  let isJap = false;
  let sourceLang = "";

  for (var i = 0; i < deeplInput.length; i++) {
    //言語判別
    isJap = detectLanguage(deeplInput);
  }

  switch (isJap) {
    case true:
      sourceLang = "&source_lang=JA&target_lang=EN";
      break;
    case false:
      sourceLang = "&source_lang=EN&target_lang=JA";
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
const getApiLimit = ({ API_KEY, API_LIMIT_URL, setApiLimit }: any) => {
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
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDate = format(date, "yyyy年MM月dd日 HH時mm分");
  return formattedDate;
};

//言語判別
//第一引数　インプットデータ英語か日本語
//第二引数　インプットデータが英語か日本語をジャッジした結果、初期値はfalse
function detectLanguage(deeplInput:string, isJap = false) {
  for (let i = 0; i < deeplInput.length; i++) {
    if (deeplInput.charCodeAt(i) >= 256) {
      isJap = true;
      break;
    }
  }
  return isJap;
}


export {
  handleTranslate,
  getApiLimit,
  formatDate,
  // 他の関数も追加する
};
