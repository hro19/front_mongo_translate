import React, { useEffect } from "react";
import { Task } from "../../ts/Task";
import { useAtom } from "jotai";
import { filteredTasksAtom } from "../../jotai/atoms";

const TaskAllSounds = () => {
  const [filteredTasks] = useAtom(filteredTasksAtom);

  const speakAllTasks = async (filteredTasks: Task[]) => {
    let firstFlag = true;
    for (const task of filteredTasks) {
      const utteranceEn = new SpeechSynthesisUtterance(task.name);
      const utteranceJa = new SpeechSynthesisUtterance(task.jaName);
      utteranceEn.lang = "en-US";
      utteranceJa.lang = "ja-JP";

      if (firstFlag) {
        await speakAsync(utteranceEn);
        firstFlag = false;
      } else {
        await speakAsyncWithDelay(utteranceEn, 4000);
      }
      await speakAsyncWithDelay(utteranceJa, 800);
    }
  };

  const speakAsync = (utterance: SpeechSynthesisUtterance) => {
    return new Promise((resolve, reject) => {
      utterance.onend = resolve;
      utterance.onerror = reject;
      speechSynthesis.speak(utterance);
    });
  };

  const speakAsyncWithDelay = (utterance: SpeechSynthesisUtterance, delay: number) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(speakAsync(utterance));
      }, delay);
    });
  };

  //音声出力中に音声ストップ
  const stopSpeaking = () => {
    if (
      ("speechSynthesis" in window && window.speechSynthesis.speaking) ||
      window.speechSynthesis.pending
    ) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <div>
      <button
        onClick={() => speakAllTasks(filteredTasks)}
        className="btn btn-secondary mr-2"
      >
        全サウンド再生
      </button>
      <button onClick={() => stopSpeaking()} className="btn btn-error">
        サウンド停止
      </button>
    </div>
  );
};

export default TaskAllSounds;
