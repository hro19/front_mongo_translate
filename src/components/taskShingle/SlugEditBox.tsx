import React, { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import axios from "axios";
import SnakeMessage from "../../components/taskShingle/SnakeMessage";
import SlugForm from "./SlugForm";
import { Task, TaskObj } from "../../ts/Task";
import {
  SecCount,
  PatchSingleTask,
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

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    // PATCHメソッドのエンドポイントにアクセスして、値を更新する通信を行う
    await PatchSingleTask(task._id, updatedTask);

    // 更新成功の場合は、タスク一覧を再読み込みする等の処理を追加する
    setCurrentTask(updatedTask);

    // 更新成功の場合は、ポップオーバーで知らせる
    setIsSnake(true);

    // ●秒後に setIsSnake(false) を実行し、ポップオーバーを消す
    SecCount(snakeDuration, setIsSnake);
  } catch (err) {
    console.error(err);
    // エラーが発生した場合は、適切なエラーハンドリングを行う
  }
};

  return (
    <div className="bg-slate-500">
      <div
        className="flex h-full w-full justify-center items-center bg-slate-200 p-4"
      >
        <SlugForm
          task={task}
          handleSubmit={handleSubmit}
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
