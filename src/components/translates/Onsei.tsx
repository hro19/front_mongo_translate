//入力文字が日本語か英語かを判断
const checkEnglish = (content: string) => {
  for (var i = 0; i < content.length; i++) {
    //言語判別
    if (content.charCodeAt(i) >= 256) {
      return false; // 日本語が含まれる場合はtrueを返す
    }
  }
  return true; // 日本語が含まれない場合はfalseを返す
};

//文字テキストを音声出力
const speakText = ({ content, setIsSpeaking }: any) => {
  const utterance = new SpeechSynthesisUtterance(content);
  const isEng = checkEnglish(content);
  if (isEng) {
    utterance.lang = "en-US";
  } else {
    utterance.lang = "ja-JP";
  }
  speechSynthesis.speak(utterance);

  // setIsSpeakingが引数としてある場合はfalseを音声終了後にセットする。
  if (setIsSpeaking) {
    setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
    };
  }
};

//音声出力中に音声ストップ
const stopSpeaking = (
  setIsSpeaking: React.Dispatch<React.SetStateAction<boolean>>
) => {
if ("speechSynthesis" in window && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }


export { checkEnglish, speakText, stopSpeaking };