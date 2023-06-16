import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import SlugFormInput from "../../components/taskShingle/SlugFormInput";
import { createHandler } from "../../components/taskShingle/Atarashiku";
import { useAtom } from "jotai";
import {
  isSnakeAtom,
  snakeDurationAtom,
  checkEditAtom,
  nameAtom,
  jaNameAtom,
  completedAtom,
  taskAtom
} from "../../jotai/atoms";

const SlugForm = () => {
  const [task, setTask] = useAtom(taskAtom);

  const [isSnake, setIsSnake] = useAtom(isSnakeAtom);
  const [snakeDuration, setSnakeDuration] = useAtom(snakeDurationAtom);

  const [name, setName] = useAtom(nameAtom);
  const [jaName, setJaName] = useAtom(jaNameAtom);
  const [completed, setCompleted] = useAtom(completedAtom);

  useEffect(() => {
    setName(task.name);
    setJaName(task.jaName);
    setCompleted(task.completed);
    setValue("name", task.name);
    setValue("jaName", task.jaName);
    setValue("completed", task.completed);
  }, [task]);

  //checkEdit関数　元データと現データが同じならば送信ボタンがDisableになる
  const [checkEdit, setCheckEdit] = useAtom(checkEditAtom);

  const updatedTask = {
    _id: task._id,
    name,
    jaName,
    completed,
  };

  //カリー化を使用してcreateHandler関数を部分適用することで、必要な引数を渡した新しい関数を作成
  const createHandlerCurried = (event: any) => {
    createHandler(
      event,
      task._id,
      updatedTask,
      snakeDuration,
      setIsSnake,
      setTask,
      setCheckEdit
    );
  };

const {
  register,
  handleSubmit,
  formState: { errors },
  reset,
  setValue,
} = useForm();

  return (
    <div className="bg-slate-500">
      <div className="flex h-full w-full justify-center items-center bg-slate-200 p-4">
        <form
          className="w-full sm:w-4/5 lg:w-3/4 max-w-md"
          onSubmit={handleSubmit(() => createHandlerCurried(event))}
        >
          <SlugFormInput
            task={task}
            register={register}
            errors={errors}
            reset={reset}
          />
        </form>
      </div>
    </div>
  );
};

export default SlugForm;
