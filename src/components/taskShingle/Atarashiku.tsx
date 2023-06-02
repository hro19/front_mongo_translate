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
//第二引数 更新するためのデータ{_id,name,completed}

const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  _id: string,
  updatedTask: Task,
  second: number,
  setIsSnake: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentTask: React.Dispatch<React.SetStateAction<any>>
) => {
e.preventDefault();
try {
    // PATCHメソッドのエンドポイントにアクセスして、値を更新する通信を行う
    await PatchSingleTask(_id, updatedTask);

    // 更新成功の場合は、タスク一覧を再読み込みする等の処理を追加する
    setCurrentTask(updatedTask);

    // 更新成功の場合は、ポップオーバーで知らせる
    setIsSnake(true);

    // ●秒後に setIsSnake(false) を実行し、ポップオーバーを消す
    SecCount(second, setIsSnake);
} catch (err) {
    console.error(err);
    // エラーが発生した場合は、適切なエラーハンドリングを行う
}
};



export { SecCount, PatchSingleTask, handleSubmit };