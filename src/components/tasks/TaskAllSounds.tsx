import React from 'react';
import { Task } from "../../ts/Task";
import { speakText } from "../translates/Onsei";

const speakEnJa = (task: Task) => {
  const utterance = new SpeechSynthesisUtterance(task.name);
  utterance.lang = "en-US";

  speechSynthesis.speak(utterance);

  // onendイベントにコールバック関数を登録する
  utterance.onend = () => {
    speakText(task.jaName,"ja");
    // console.log("音声再生が終了しました！"); // 音声再生が終了した後に実行されます
  };

  return utterance;
};

//音声出力中に音声ストップ
const stopSpeaking = () => {
  if ("speechSynthesis" in window && window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }
};

const TaskAllSounds = ({ tasks }: { tasks: Task[] }) => {
  return (
    <div>
      <button
        onClick={() => tasks.map((task) => speakEnJa(task))}
        className="btn btn-secondary"
      >
        全サウンド再生
      </button>
      <button onClick={() => stopSpeaking()} className="btn btn-error">
        サウンド停止
      </button>
    </div>
  );
};

export default TaskAllSounds
