import { Dispatch, SetStateAction } from "react";
import { detectJapLang } from "./Honyaku";


//文字テキストを音声出力
interface SpeakTextArgs {
  content: string;
  setIsSpeaking?: Dispatch<SetStateAction<boolean>>;
}

const speakText = ({ content, setIsSpeaking }: SpeakTextArgs) => {
  const utterance = new SpeechSynthesisUtterance(content);
  const isJap = detectJapLang(content);
  if (isJap) {
    utterance.lang = "ja-JP";
  } else {
    utterance.lang = "en-US";
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
};

export { speakText, stopSpeaking };
