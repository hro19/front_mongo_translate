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


// PATCHメソッドのエンドポイントにアクセスして、値を更新する通信
//第一引数 目的とする「_id」
//第二引数 更新するためのデータ{_id,name,completed}

const PatchSingleTask = (_id: string, updatedTask: Task) => {
  axios.patch(
    `https://back-mongo-task2.vercel.app/api/v1/tasks/${_id}`,
    updatedTask,
    { headers: { "Content-Type": "application/json" } }
  );
};





export { SecCount, PatchSingleTask };
