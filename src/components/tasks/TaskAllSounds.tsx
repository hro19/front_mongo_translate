import React, { useEffect } from "react";
import { Task } from "../../ts/Task";
import { useAtom } from "jotai";
import {filteredTasksAtom} from "../../jotai/atoms";

const TaskAllSounds = () => {
  const [filteredTasks] = useAtom(filteredTasksAtom);

  const speakAllTasks = async (filteredTasks: Task[]) => {
    for (const task of filteredTasks) {
      const utteranceEn = new SpeechSynthesisUtterance(task.name);
      const utteranceJa = new SpeechSynthesisUtterance(task.jaName);
      utteranceEn.lang = "en-US";
      utteranceJa.lang = "ja-JP";

      speechSynthesis.speak(utteranceEn);
      speechSynthesis.speak(utteranceJa);
    }
  };
  

  //音声出力中に音声ストップ
  const stopSpeaking = () => {
    if ("speechSynthesis" in window && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <div>
      <button onClick={() => speakAllTasks(filteredTasks)} className="btn btn-secondary mr-2">
        全サウンド再生
      </button>
      <button onClick={() => stopSpeaking()} className="btn btn-error">
        サウンド停止
      </button>
    </div>
  );
};

export default TaskAllSounds;
