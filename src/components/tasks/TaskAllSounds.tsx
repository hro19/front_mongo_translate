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

const TaskAllSounds = ({ tasks }: { tasks: Task[] }) => {
  return (
    <div>
      <button
        onClick={() => tasks.map(task=>speakEnJa(task))}
        className="btn btn-secondary"
      >
        全サウンド再生
      </button>
    </div>
  );
};

export default TaskAllSounds
