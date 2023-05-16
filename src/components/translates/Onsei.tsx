//音声読み上げハンドラー
const handleSpeak = ({ translatedText, isJapanese }: any) => {
  const utterance = new SpeechSynthesisUtterance(translatedText);
  if (isJapanese) {
    utterance.lang = "en-US";
  } else {
    utterance.lang = "ja-JP";
  }
  speechSynthesis.speak(utterance);
};

export { handleSpeak };
