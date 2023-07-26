import React, { useEffect } from "react";
import { Task } from "../../ts/Task";

const TaskAllSounds = ({ tasks }: { tasks: Task[] }) => {

    const speakEnJa = (name: string,jaName: string) => {
      const utteranceEn = new SpeechSynthesisUtterance(name);
      const utteranceJa = new SpeechSynthesisUtterance(jaName);
      utteranceEn.lang = "en-US";
      utteranceJa.lang = "ja-JP";

      speechSynthesis.speak(utteranceEn);
      speechSynthesis.speak(utteranceJa);
    };

  //音声出力中に音声ストップ
  const stopSpeaking = () => {
    if ("speechSynthesis" in window && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
  };

  const speakAllTasks = () => {
    tasks.map((task, index) => {
        speakEnJa(task.name, task.jaName);
    });
  };

  return (
    <div>
      <button onClick={() => speakAllTasks()} className="btn btn-secondary">
        全サウンド再生
      </button>
      <button onClick={() => stopSpeaking()} className="btn btn-error">
        サウンド停止
      </button>
    </div>
  );
};

export default TaskAllSounds;
