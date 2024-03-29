import { Dispatch, SetStateAction } from "react";

//文字テキストを音声出力
//第一引数　出力させたい文字
type SpeakTextType = (content: string, lang?: "ja" | "en") => SpeechSynthesisUtterance;

const speakText: SpeakTextType = (content,lang) => {
  const utterance = new SpeechSynthesisUtterance(content);
  if (lang === "ja") {
    utterance.lang = "ja-JP";
  } else {
    utterance.lang = "en-US";
  }
  speechSynthesis.speak(utterance);
  return utterance;
};

//文字テキストを音声出力と、音声再生/停止ボタンの表示toggle
//第一引数　出力させたい文字
//第二引数　speaking中なのかをジャッジする値のセッター
type SpeakTextArgs = {
  content: string;
  setIsSpeaking?: Dispatch<SetStateAction<boolean>>;
};

const speakTextAndBtn = ({ content, setIsSpeaking }: SpeakTextArgs) => {
  const utterance = speakText(content);

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
