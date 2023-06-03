import React, { useEffect } from "react";
import { TaskObj } from "../../ts/Task";
import { useAtom } from "jotai";
import {CheckEditDisabled} from "../../components/taskShingle/Atarashiku";
import { checkEditAtom, nameAtom, completedAtom } from "../../jotai/atoms";
//formの要素であるinputのhtml構造を書く
//react-hook-formのバリデーションを書く

const SlugFormInput = ({ task }: TaskObj) => {
  const [name, setName] = useAtom(nameAtom);
  const [completed, setCompleted] = useAtom(completedAtom);
  const [checkEdit, setCheckEdit] = useAtom(checkEditAtom);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompleted(e.target.value === "completed");
  };

  //checkEdit関数　元データと現データが同じならば送信ボタンがDisableになる
  useEffect(() => {
    CheckEditDisabled(name, completed, task, setCheckEdit);
  }, [name, completed]);

  return (
    <>
      <h3 className="text-lg font-bold text-center mb-4">【ID】{task._id}</h3>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
          名前
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-2xl text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="お名前を入力してください"
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
        <button
          type="submit"
          className={`bg-blue-500 text-white py-2 px-4 rounded ${
            checkEdit ? "" : "disabled bg-gray-300"
          }`}
          disabled={!checkEdit}
        >
          更新する
        </button>
      </div>
    </>
  );
};

export default SlugFormInput
