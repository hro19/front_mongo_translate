import React from 'react';
import { Task } from "../../ts/Task";
import { speakText } from "../translates/Onsei";

const TaskAllSounds = ({ tasks }: { tasks: Task[] }) => {
  return (
    <div>
      <button onClick={() => speakText(tasks[0].jaName,"ja")} className="btn btn-secondary">
        全サウンド再生{tasks[0].name}
      </button>
    </div>
  );
};

export default TaskAllSounds
