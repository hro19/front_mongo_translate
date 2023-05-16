//文字テキストを音声出力
  const speakText = (content: string) => {
    const utterance = new SpeechSynthesisUtterance(content);
    const isEng = checkEnglish(content);
  if (isEng) {
    utterance.lang = "en-US";
  } else {
    utterance.lang = "ja-JP";
  }
  speechSynthesis.speak(utterance);
  };


//入力文字が日本語か英語かを判断
const checkEnglish = (text:string) => {
  for (var i = 0; i < text.length; i++) {
    //言語判別
    if (text.charCodeAt(i) >= 256) {
      return false; // 日本語が含まれる場合はtrueを返す
    }
  }
  return true; // 日本語が含まれない場合はfalseを返す
};

export { speakText, checkEnglish };