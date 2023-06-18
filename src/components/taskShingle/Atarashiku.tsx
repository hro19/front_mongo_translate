import React from "react";
import axios from "axios";
import { Task } from "../../ts/Task";
// ●秒後に setIsSnake(false) を実行する
//第一引数 秒
//第二引数 ●秒後に行いたい処理

const SecCount = (
  second: number,
  setIsSnake: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setTimeout(() => {
    setIsSnake(false);
  }, second);
};


// PATCHメソッドのエンドポイントにアクセスして、値を更新する通信を行う
//第一引数 目的とする「_id」
//第二引数 更新するためのデータ{_id,name,completed}

const PatchSingleTask = (_id: string, updatedTask: Task) => {
  axios.patch(
    `https://back-mongo-task2.vercel.app/api/v1/tasks/${_id}`,
    updatedTask,
    { headers: { "Content-Type": "application/json" } }
  );
};


// 更新ハンドラー
//第一引数 e(event)
//第二引数 目的とする「_id」
//第三引数 更新するためのデータ{_id,name,completed}
//第四引数 秒
//第五引数 setIsSnake
//第六引数 setCurrentTask

const createHandler = async (
  e: React.FormEvent<HTMLFormElement>,
  _id: string,
  updatedTask: Task,
  second: number,
  setIsSnake: React.Dispatch<React.SetStateAction<boolean>>,
  setTask: React.Dispatch<React.SetStateAction<Task>>,
  setCheckEdit: React.Dispatch<React.SetStateAction<boolean>>
) => {
  e.preventDefault();
  try {
    // PATCHメソッドのエンドポイントにアクセスして、値を更新する通信を行う
    await PatchSingleTask(_id, updatedTask);

    // 更新成功の場合は、タスク一覧を再読み込みする等の処理を追加する
    setTask(updatedTask);

    // 更新成功の場合は、ポップオーバーで知らせる
    setIsSnake(true);

    // 「更新するボタン」を無効にする
    setCheckEdit(false);

    // ●秒後に setIsSnake(false) を実行し、ポップオーバーを消す
    SecCount(second, setIsSnake);
  } catch (err) {
    console.error(err);
    // エラーが発生した場合は、適切なエラーハンドリングを行う
  }
};


// 値に変化があれば「更新するボタン」が有効になる
//第一引数 入力されているname
//第二引数 入力されているjaName
//第三引数 入力されているspeech
//第四引数 入力されているcompleted
//第五引数 更新するためのデータ{_id,name,completed}
//第六引数 真偽するためのsetter

const CheckEditDisabled = (
  name: string,
  jaName: string,
  speech:string,
  completed: boolean,
  task: Task,
  setCheckEdit: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (
    name !== task.name ||
    jaName !== task.jaName ||
    speech !== task.speech ||
    completed !== task.completed
  ) {
    setCheckEdit(true);
  } else {
    setCheckEdit(false);
  }
};

export { SecCount, PatchSingleTask, createHandler, CheckEditDisabled };
