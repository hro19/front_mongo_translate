import { Dispatch, SetStateAction } from "react";
import { detectJapLang } from "./Honyaku";

//文字テキストを音声出力


const speakText = (content:string) => {
  const utterance = new SpeechSynthesisUtterance(content);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);
};

type SpeakTextArgs = {
  content: string;
  setIsSpeaking?: Dispatch<SetStateAction<boolean>>;
};

const speakTextAndBtn = ({ content, setIsSpeaking }: SpeakTextArgs) => {
  const utterance = new SpeechSynthesisUtterance(content);
  utterance.lang = "en-US";
  speechSynthesis.speak(utterance);

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

export { speakText, speakTextAndBtn, stopSpeaking };
