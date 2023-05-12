import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";

const ModalContent = ({ task, closeModal }: any) => {
  const [name, setName] = useState(task.name);
  const [completed, setCompleted] = useState(task.completed);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompleted(e.target.value === "completed");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const updatedTask = {
        name,
        completed,
      };

      await axios.patch(
        `https://back-mongo-task.vercel.app/api/v1/tasks/${task._id}`,
        updatedTask,
        { headers: { "Content-Type": "application/json" } }
      );

      // 更新成功の場合は、タスク一覧を再読み込みする等の処理を追加する
      window.location.reload();
    } catch (err) {
      console.error(err);
      // エラーが発生した場合は、適切なエラーハンドリングを行う
    }
  };

  return (
    <div className="bg-slate-500">
      <div
        id="pop"
        className="flex h-full w-full justify-center items-center bg-white p-4"
      >
        <form
          className="w-full sm:w-4/5 lg:w-3/4 max-w-md"
          onSubmit={handleSubmit}
        >
          <h3 className="text-lg font-bold text-center mb-4">
            【ID】{task._id}
          </h3>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              名前
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-2xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="名前を入力してください"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <span className="block text-gray-700 font-bold mb-2">進捗</span>
            <div className="flex items-center">
              <input
                className="mr-2"
                type="radio"
                id="inprogress"
                name="progress"
                value="inprogress"
                checked={!completed}
                onChange={handleChange}
              />
              <label htmlFor="inprogress">進行中</label>
            </div>
            <div className="flex items-center">
              <input
                className="mr-2"
                type="radio"
                id="completed"
                name="progress"
                value="completed"
                checked={completed}
                onChange={handleChange}
              />
              <label htmlFor="completed">完了</label>
            </div>
          </div>
          <button
            type="button"
            className="bg-gray-500 text-white py-2 px-4 rounded mr-3"
            onClick={() => closeModal()}
          >
            キャンセル
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            更新する
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalContent;
