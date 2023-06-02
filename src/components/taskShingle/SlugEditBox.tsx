import React, { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import SnakeMessage from "../../components/taskShingle/SnakeMessage";
import SlugForm from "./SlugForm";
import { Task, TaskObj } from "../../ts/Task";
import {
  SecCount,
  PatchSingleTask,
  handleSubmit,
} from "../../components/taskShingle/Atarashiku";

export type EditBoxProps = TaskObj & {
  setCurrentTask: Dispatch<SetStateAction<Task>>;
};

const SlugEditBox = ({ task, setCurrentTask }: EditBoxProps) => {
  const [name, setName] = useState(task.name);
  const [completed, setCompleted] = useState(task.completed);
  const [isSnake, setIsSnake] = useState(false);
  const snakeDuration = 2500;

  const updatedTask = {
    _id: task._id,
    name,
    completed,
  };

  //カリー化を使用してhandleSubmit関数を部分適用することで、必要な引数を渡した新しい関数を作成
  const handleSubmitCurried = (e: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(
      e,
      task._id,
      updatedTask,
      snakeDuration,
      setIsSnake,
      setCurrentTask
    );
  };

  return (
    <div className="bg-slate-500">
      <div className="flex h-full w-full justify-center items-center bg-slate-200 p-4">
        <SlugForm
          task={task}
          handleSubmit={handleSubmitCurried}
          name={name}
          setName={setName}
          completed={completed}
          setCompleted={setCompleted}
        />
      </div>
      {isSnake && <SnakeMessage snakeDuration={snakeDuration} />}
    </div>
  );
};

export default SlugEditBox;
