import React, { Dispatch, SetStateAction, useEffect } from "react";
import SlugFormInput from "../../components/taskShingle/SlugFormInput";
import { createHandler } from "../../components/taskShingle/Atarashiku";
import { useAtom } from "jotai";
import {
  isSnakeAtom,
  snakeDurationAtom,
  checkEditAtom,
  nameAtom,
  completedAtom,
  taskAtom
} from "../../jotai/atoms";

const SlugForm = () => {
  const [task, setTask] = useAtom(taskAtom);

  const [isSnake, setIsSnake] = useAtom(isSnakeAtom);
  const [snakeDuration, setSnakeDuration] = useAtom(snakeDurationAtom);

  const [name, setName] = useAtom(nameAtom);
  const [completed, setCompleted] = useAtom(completedAtom);

  useEffect(() => {
    setName(task.name);
    setCompleted(task.completed);
  }, [task]);

  //checkEdit関数　元データと現データが同じならば送信ボタンがDisableになる
  const [checkEdit, setCheckEdit] = useAtom(checkEditAtom);

  const updatedTask = {
    _id: task._id,
    name,
    completed,
  };

  //カリー化を使用してhandleSubmit関数を部分適用することで、必要な引数を渡した新しい関数を作成
  const createHandlerCurried = (e: React.FormEvent<HTMLFormElement>) => {
    createHandler(
      e,
      task._id,
      updatedTask,
      snakeDuration,
      setIsSnake,
      setTask,
      setCheckEdit
    );
  };

  return (
    <div className="bg-slate-500">
      <div className="flex h-full w-full justify-center items-center bg-slate-200 p-4">
        <form
          className="w-full sm:w-4/5 lg:w-3/4 max-w-md"
          onSubmit={createHandlerCurried}
        >
          <SlugFormInput task={task} />
        </form>
      </div>
    </div>
  );
};

export default SlugForm;
